<script>
import SeatsioEmbeddable from './seatsioEmbeddable.vue'

export default {
    mixins: [SeatsioEmbeddable],
    name: 'seatsioEventManager',
    methods: {
        finaliseProps: function (props) {
            const { chartJsUrl, id, region, showFullscreenButton, chartKey, ...finalProps } = props
            return { chart: chartKey, ...finalProps }
        },
        createChart: (seatsio, config) => {
          return new seatsio.EventManager(config)
        }
    }
}
</script>

<template>
  <div :id="id"></div>
</template>