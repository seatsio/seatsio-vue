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
      event: {type: String},
      id: {type: String, default: 'chart'},
      extraConfig: {type: Object},
      fitTo: {type: String},
      language: {type: String},
      messages: {type: Object},
      mode: {type: String},
      objectColor: {type: Function},
      objectTooltip: {type: Object},
      workspaceKey: {type: String, required: true},
      region: {type: String, default: 'eu'},
      showFullscreenButton: {type: Boolean},
      tooltipInfo: {type: Function},
      chartKey: {type: String},
      secretKey: {type: String}
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
  
        const config = {divId: this.$props.id, ...this.finaliseProps(this.$props), ...callbacks}                 
        this.chart = this.createChart(seatsio, config).render()
        this.chart && this.$emit('onRenderStarted', this.chart)
      },
      finaliseProps: function (props) {
        return props;
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