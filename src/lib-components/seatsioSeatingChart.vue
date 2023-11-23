<script lang="ts">
import type { ChartRendererConfigOptions, Seatsio } from '@seatsio/seatsio-types'
import type { SeatsioSeatingChartProps } from '../types'
import SeatsioEmbeddable from './seatsioEmbeddable.vue'
import { defineComponent } from 'vue'

export default defineComponent<SeatsioSeatingChartProps>({
  extends: SeatsioEmbeddable,
  components: { SeatsioEmbeddable },
  name: 'SeatsioSeatingChart',
  methods: {
    createChart: function (seatsio: Seatsio, config: ChartRendererConfigOptions) {
      return new seatsio.SeatingChart(config)
    }
  }
})
</script>

<template>
  <div :id="id"></div>
</template>