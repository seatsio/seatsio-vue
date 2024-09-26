<script lang="ts">
import type { EventManagerConfigOptions, Seatsio } from '@seatsio/seatsio-types'
import type { SeatsioEventManagerProps } from '../types'
import SeatsioEmbeddable from './seatsioEmbeddable.vue'
import { defineComponent } from 'vue'

export default defineComponent<SeatsioEventManagerProps>({
    extends: SeatsioEmbeddable,
    name: 'SeatsioEventManager',
    methods: {
        finaliseProps: function (props: SeatsioEventManagerProps) {
            const { chartJsUrl, id, region, showFullScreenButton, ...finalProps } = props
            return { ...finalProps }
        },
        createChart: (seatsio: Seatsio, config: EventManagerConfigOptions) => {
          return new seatsio.EventManager(config)
        }
    }
})
</script>