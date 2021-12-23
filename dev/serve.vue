<script>
import Vue from 'vue';
import SeatsioSeatingChart from "@/lib-components/seatsioSeatingChart";

export default Vue.extend({
  name: 'ServeDev',
  components: {SeatsioSeatingChart},
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
