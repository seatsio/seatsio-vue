<script>
import Vue from 'vue';
import SeatsioSeatingChart from "@/lib-components/seatsioSeatingChart";

export default Vue.extend({
  name: 'ServeDev',
  components: {SeatsioSeatingChart}
});
</script>

<template>
  <div id="app">
    <SeatsioSeatingChart
        id="myChart"
        publicKey="publicDemoKey"
        event="smallTheatreEvent"
        objectColor="() => 'blue'"
        region="eu"
    />
  </div>
</template>

<style scoped>
#myChart {
  height: 600px;
}
</style>
