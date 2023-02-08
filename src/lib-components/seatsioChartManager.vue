<script>
import SeatsioEmbeddable from './seatsioEmbeddable'

export default {
    mixins: [SeatsioEmbeddable],
    name: 'seatsioChartManager',
    methods: {
        finaliseProps: function (props) {
            const { chartJsUrl, id, region, showFullscreenButton, ...finalProps } = props
            return finalProps
        },
        createChart: (seatsio, config) => {
          // noinspection JSUnresolvedFunction
          return new seatsio.ChartManager(config)
        }
    }
}
</script>

<template>
  <div :id="id"></div>
</template>