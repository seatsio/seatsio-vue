<script lang="ts">
import type { EventManagerConfigOptions, Seatsio } from '@seatsio/seatsio-types'
import type { SeatsioEventManagerProps } from '../types'
import SeatsioEmbeddable from './seatsioEmbeddable.vue'
import { defineComponent } from 'vue'

export default defineComponent<SeatsioEventManagerProps>({
    extends: SeatsioEmbeddable,
    name: 'SeatsioEventManager',
    methods: {
        finaliseProps: function (props: SeatsioEventManagerProps & { chartKey?: string }) {
            const { chartJsUrl, id, region, showFullScreenButton, chartKey, ...finalProps } = props
            return { chart: chartKey, ...finalProps }
        },
        createChart: (seatsio: Seatsio, config: EventManagerConfigOptions) => {
          return new seatsio.EventManager(config)
        }
    }
})
</script>

<template>
  <div :id="id"></div>
</template>