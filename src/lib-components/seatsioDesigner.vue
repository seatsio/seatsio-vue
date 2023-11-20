<script lang="ts">
import type { ChartDesignerConfigOptions, Seatsio, SeatsioChartDesignerProps } from "./types";
import SeatsioEmbeddable from './seatsioEmbeddable.vue'
import { defineComponent } from "vue";

export default defineComponent<SeatsioChartDesignerProps>({
  mixins: [SeatsioEmbeddable],
  name: 'SeatsioDesigner',
  methods: {
     createChart: function (seatsio: Seatsio, config: ChartDesignerConfigOptions) {
      return new seatsio.SeatingChartDesigner(config)
    }
  }
})
</script>

<template>
  <div :id="id"></div>
</template>