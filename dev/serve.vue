<script>
import Vue from 'vue'
import ComponentRenderer from './componentRenderer.vue'
import SeatsioSeatingChart from '@/lib-components/seatsioSeatingChart.vue'
import SeatsioChartManager from '@/lib-components/seatsioChartManager.vue'
import SeatsioDesigner from '@/lib-components/seatsioDesigner.vue'
import SeatsioEventManager from '@/lib-components/seatsioEventManager.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ComponentRenderer,
    SeatsioChartManager,
    SeatsioDesigner,
    SeatsioEventManager,
    SeatsioSeatingChart,
  },
  data: () => ({
    messages: { clickToSelect: 'Click to pick'},
    objectColor: () => 'grey',
    tooltipInfo: () => 'My custom info',
    selectedComponent: 'seatingChart'
  }),
  methods: {
    onRenderStarted: chart => console.log('Render started', chart),
    onObjectClicked: clickedObject => console.log('Object clicked', clickedObject),
    // Dev purposes only
    selectChartType: function (selection) {
      this.selectedComponent = selection
    }
  },
});
</script>

<template>
  <div id="app">
    <ComponentRenderer @selectChartType="selectChartType" />
    <SeatsioSeatingChart
        v-if="selectedComponent === 'seatingChart'"
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
    <SeatsioDesigner
      v-if="selectedComponent === 'chartDesigner'"
      event="437fd038-ba0c-42aa-9ba9-e06bd5b790a3"
      id="myChartDesigner"
      workspaceKey="publicDemoKey"
      mode="readOnly"
      :messages="messages"
      :tooltipInfo="tooltipInfo"
      @onRenderStarted="onRenderStarted"
      @onObjectClicked="onObjectClicked"
      chartKey="0bcf8295-0063-486b-85fe-77b8d85008b5"
    />
    <SeatsioChartManager
        v-if="selectedComponent === 'chartManager'"
        id="myChartManager"
        mode="manageRulesets"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @onRenderStarted="onRenderStarted"
        @onObjectClicked="onObjectClicked"
        workspaceKey="[Your workspace key]"
        chartKey="[Your chart key]"
        secretKey="[Your secret key]"
    />
    <SeatsioEventManager
        v-if="selectedComponent === 'eventManager'"
        id="myEventManager"
        mode="manageRulesets"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @onRenderStarted="onRenderStarted"
        @onObjectClicked="onObjectClicked"
        workspaceKey="[Your workspace key]"
        chartKey="[Your chart key]"
        secretKey="[Your secret key]"
    />
  </div>
</template>

<style scoped>
#myChart, #myChartDesigner, #myChartManager, #myEventManager {
  height: 100vh
}
</style>
