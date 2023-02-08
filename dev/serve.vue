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
    <SeatsioChartManager
        v-if="selectedComponent === 'chartManager'"
        workspaceKey="publicDemoKey"
        mode="manageRulesets"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @onRenderStarted="onRenderStarted"
        @onObjectClicked="onObjectClicked"
    />
    <SeatsioDesigner
        v-if="selectedComponent === 'chartDesigner'"
        event="[Your event key]"
        id="myChartDesigner"
        workspaceKey="publicDemoKey"
        mode="readOnly"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @onRenderStarted="onRenderStarted"
        @onObjectClicked="onObjectClicked"
        chartKey="[Your chart key]"
    />
    <SeatsioEventManager
        v-if="selectedComponent === 'eventManager'"
        id="myChartDesigner"
        workspaceKey="publicDemoKey"
        mode="manageRulesets"
        :messages="messages"
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
#myChartDesigner {
  height: 100vh
}
</style>
