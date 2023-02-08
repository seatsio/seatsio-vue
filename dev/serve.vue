<script>
import Vue from 'vue';
import SeatsioSeatingChart from "@/lib-components/seatsioSeatingChart";

export default Vue.extend({
  name: 'ServeDev',
  components: {SeatsioSeatingChart},
  data: () => ({
    messages: { clickToSelect: 'Click to pick'},
    objectColor: () => 'grey',
    tooltipInfo: () => 'My custom info'
  }),
  methods: {
    onRenderStarted: chart => console.log("Render started", chart),
    onObjectClicked: clickedObject => console.log("Object clicked", clickedObject)
  },
});
</script>

<template>
  <div id="app">
    <SeatsioSeatingChart
        id="myChart"
        workspaceKey="publicDemoKey"
        event="smallTheatreEvent"
        region="eu"
        :messages="messages"
        :objectColor="objectColor"
        :tooltipInfo="tooltipInfo"
        @onRenderStarted="onRenderStarted"
        @onObjectClicked="onObjectClicked"
    />
  </div>
</template>

<style scoped>
#myChart {
  height: 600px;
}
</style>
