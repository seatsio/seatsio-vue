<script>
import Vue from 'vue';
import SeatsioSeatingChart from "@/lib-components/seatsioSeatingChart";
// Uncomment import and local "components" registration if library is not registered globally.
// import { SeatsioVueSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {SeatsioSeatingChart},
  // components: {
  //  SeatsioVueSample,
  // }
});
</script>

<template>
  <div id="app">
    <SeatsioSeatingChart
        publicKey="publicDemoKey"
        event="theatreEvent"
        region="eu"
    />
  </div>
</template>
