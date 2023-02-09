<script>
import ComponentSelector from './componentSelector.vue'
import SeatsioSeatingChart from '@/lib-components/seatsioSeatingChart.vue'
import SeatsioChartManager from '@/lib-components/seatsioChartManager.vue'
import SeatsioDesigner from '@/lib-components/seatsioDesigner.vue'
import SeatsioEventManager from '@/lib-components/seatsioEventManager.vue'

export default {
    name: 'ServeDev',
    components: {
      ComponentSelector,
      SeatsioSeatingChart,
      SeatsioChartManager,
      SeatsioDesigner,
      SeatsioEventManager,
      SeatsioSeatingChart,
    },
    data: () => ({
      messages: { clickToSelect: 'Click to pick'},
      objectColor: () => 'grey',
      tooltipInfo: () => 'My custom info',
      selectedComponent: 'seatingChart',
    }),
    methods: {
      onRenderStarted: chart => console.log('Render started', chart),
      onObjectClicked: clickedObject => console.log('Object clicked', clickedObject),
    },
}
</script>

<template>
  <ComponentSelector @selectChartType="component => selectedComponent = component" />
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
        workspaceKey="<yourWorkspaceKey>"
        chartKey="<yourChartKey>"
        secretKey="<yourWorkspaceSecretKey>"
    />
    <SeatsioEventManager
        v-if="selectedComponent === 'eventManager'"
        id="myEventManager"
        mode="manageCategories"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @onRenderStarted="onRenderStarted"
        @onObjectClicked="onObjectClicked"
        event="<yourEventKey"
        secretKey="<yourWorkspaceSecretKey>"
        workspaceKey="<yourWorkspaceKey>"
    />
</template>

<style scoped>
#myChart, #myChartDesigner, #myChartManager, #myEventManager {
  height: 100vh
}
</style>