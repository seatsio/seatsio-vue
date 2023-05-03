<script>
  export default {
    mounted() {
      this.createAndRenderChart()
    },
    beforeUnmount() {
      this.destroyChart()
    },
    props: {
      chartJsUrl: {type: String, default: 'https://cdn-{region}.seatsio.net/chart.js'},
      id: {type: String, default: 'chart'},
      region: {type: String, default: 'eu'},
    },
    methods: {
      createAndRenderChart: async function () {
        const seatsio = await this.getSeatsio()
        const callbacks = {
          onChartRendered: chart => this.$emit('onChartRendered', chart),
          onChartRenderingFailed: chart => this.$emit('onChartRenderingFailed', chart),
          onChartRerenderingStarted: chart => this.$emit('onChartRerenderingStarted', chart),
          onObjectSelected: selectedObject => this.$emit('onObjectSelected', selectedObject),
          onObjectDeselected: deselectedObject => this.$emit('onObjectDeselected', deselectedObject),
          onObjectClicked: clickedObject => this.$emit('onObjectClicked', clickedObject),
          onFullScreenOpened: () => this.$emit('onFullScreenOpened'),
          onFullScreenClosed: () => this.$emit('onFullScreenClosed'),
          onSubmitSucceeded: () => this.$emit('onSubmitSucceeded'),
          onSubmitFailed: () => this.$emit('onSubmitFailed'),
        }

        const config = {
          divId: this.$props.id,
          ...this.propsAndAttrs(),
          ...callbacks
        }
        this.chart = this.createChart(seatsio, config).render()
        this.chart && this.$emit('onRenderStarted', this.chart)
      },
      attrsWithOriginalKeys: function () {
        let attrs = {...this.$attrs};
        for (const [key, value] of Object.entries(attrs)) {
          if (key.startsWith('on')) {
            let newKey = key.substring(2)
            const lowerCaseNewKey = newKey.charAt(0).toLowerCase() + newKey.substring(1)
            attrs[lowerCaseNewKey] = value
            delete attrs[key]
          }
        }
        return attrs
      },
      propsAndAttrs: function () {
        return {...this.$props, ...this.attrsWithOriginalKeys()}
      },
      getSeatsio: async function () {
        if (typeof window.seatsio === 'undefined') {
          return this.loadSeatsio()
        } else if (window.seatsio.region !== this.region) {
          window.seatsio = undefined
          return this.loadSeatsio()
        } else {
          return Promise.resolve(seatsio)
        }
      },
      loadSeatsio: async function () {
        return new Promise((resolve, reject) => {
          let script = document.createElement('script')
          script.onload = () => {
            window.seatsio.region = this.region
            resolve(window.seatsio)
          }
          script.onerror = () => reject(`Could not load ${script.src}`)
          script.src = this.chartJsUrl.replace('{region}', this.region)
          document.head.appendChild(script)
        })
      },
      destroyChart: function () {
        this.chart.destroy()
      }
    }
  }
</script>
