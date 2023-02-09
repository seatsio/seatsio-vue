<script>
import SeatsioEmbeddable from './seatsioEmbeddable.vue'

export default {
    mixins: [SeatsioEmbeddable],
    name: 'seatsioChartManager',
    methods: {
        finaliseProps: function (props) {
            const { chartKey, chartJsUrl, id, region, showFullscreenButton, ...finalProps } = props
            return { chart: chartKey, ...finalProps }
        },
        createChart: (seatsio, config) => {
          return new seatsio.ChartManager(config)
        }
    }
}
</script>

<template>
  <div :id="id"></div>
</template>