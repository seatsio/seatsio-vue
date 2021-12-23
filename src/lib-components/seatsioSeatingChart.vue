<script>

export default {
  name: 'seatsioSeatingChart',
  mounted() {
    this.createAndRenderChart()
  },
  props: {
    id: {type: String, default: 'chart'},
    region: {type: String, default: 'eu'},
    chartJsUrl: {type: String, default: 'https://cdn-{region}.seatsio.net/chart.js'}
  },
  methods: {
    createAndRenderChart: async function () {
      const seatsio = await this.getSeatsio()
      const config = {divId: this.id, ...this.$attrs}
      this.chart = this.createChart(seatsio, config).render()
      /* TODO
      if (this.props.onRenderStarted) {
        this.props.onRenderStarted(this.chart)
      }
       */
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
    createChart: function (seatsio, config) {
      // noinspection JSUnresolvedFunction
      return new seatsio.SeatingChart(config)
    }

  }
}
</script>

<template>
  <div v-bind:id="id"></div>
</template>
