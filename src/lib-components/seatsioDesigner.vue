<script lang="ts">
import type { ChartDesignerConfigOptions, Seatsio,  } from '@seatsio/seatsio-types'
import type { SeatsioChartDesignerProps } from '../types'
import SeatsioEmbeddable from './seatsioEmbeddable.vue'
import { defineComponent } from 'vue'

export default defineComponent<SeatsioChartDesignerProps>({
  extends: SeatsioEmbeddable,
  name: 'SeatsioDesigner',
  methods: {
     createChart: function (seatsio: Seatsio, config: ChartDesignerConfigOptions) {
      return new seatsio.SeatingChartDesigner(config)
    }
  }
})
</script>