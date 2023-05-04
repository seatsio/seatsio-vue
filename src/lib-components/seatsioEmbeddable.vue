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
      region: {type: String, required: true}
    },
    methods: {
      createAndRenderChart: async function () {
        if(!this.$props.region) {
          return
        }

        const seatsio = await this.getSeatsio()

        const config = {
          divId: this.$props.id,
          ...this.propsAndAttrs()
        }
        this.chart = this.createChart(seatsio, config).render()
        if(this.$attrs.onRenderStarted) {
          this.$attrs.onRenderStarted(this.chart)
        }
      },
      propsAndAttrs: function () {
        let allPropsAndAttrs = {...this.$props, ...this.$attrs};
        let { id, onRenderStarted, chartJsUrl, region, ...filteredPropsAndAttrs } = allPropsAndAttrs
        return filteredPropsAndAttrs
      },
      getSeatsio: async function () {
        if (typeof window.seatsio === 'undefined') {
          return this.loadSeatsio()
        } else if (window.seatsio.region !== this.getRegion()) {
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
            window.seatsio.region = this.getRegion()
            resolve(window.seatsio)
          }
          script.onerror = () => reject(`Could not load ${script.src}`)
          script.src = this.chartJsUrl.replace('{region}', this.getRegion())
          document.head.appendChild(script)
        })
      },
      destroyChart: function () {
        this.chart.destroy()
      },
      getRegion: function () {
        return this.$props.region
      }
    }
  }
</script>
