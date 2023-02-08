<script>
import SeatsioEmbeddable from './seatsioEmbeddable.vue'

export default {
  mixins: [SeatsioEmbeddable],
  name: 'seatsioDesigner',
  methods: {
     createChart: function (seatsio, config) {
      // noinspection JSUnresolvedFunction
      return new seatsio.SeatingChartDesigner(config)
    }
  }
}
</script>

<template>
  <div :id="id"></div>
</template>