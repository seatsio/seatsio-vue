<script lang="ts">
import { EventManagerConfigOptions, Seatsio } from "@seatsio/seatsio-types"
import { SeatsioEmbeddableProps } from './index'
import SeatsioEmbeddable from './seatsioEmbeddable.vue'

export default {
    mixins: [SeatsioEmbeddable],
    name: 'SeatsioEventManager',
    methods: {
        finaliseProps: function (props: EventManagerConfigOptions & SeatsioEmbeddableProps) {
            const { chartJsUrl, id, region, showFullScreenButton, chartKey, ...finalProps } = props
            return { chart: chartKey, ...finalProps }
        },
        createChart: (seatsio: Seatsio, config: EventManagerConfigOptions) => {
          return new seatsio.EventManager(config)
        }
    }
}
</script>

<template>
  <div :id="id"></div>
</template>