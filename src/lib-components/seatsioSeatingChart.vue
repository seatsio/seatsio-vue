<script lang="ts">
import { ChartRendererConfigOptions, Seatsio } from "@seatsio/seatsio-types";
import SeatsioEmbeddable from './seatsioEmbeddable.vue'

export default {
  mixins: [SeatsioEmbeddable],
  name: 'SeatsioSeatingChart',
  methods: {
    createChart: function (seatsio: Seatsio, config: ChartRendererConfigOptions) {
      return new seatsio.SeatingChart(config)
    }
  }
}
</script>

<template>
  <div :id="id"></div>
</template>