<script lang="ts">
import ComponentSelector from './componentSelector.vue'
import SeatsioSeatingChart from '../src/lib-components/seatsioSeatingChart.vue'
import SeatsioDesigner from '../src/lib-components/seatsioDesigner.vue'
import SeatsioEventManager from '../src/lib-components/seatsioEventManager.vue'

export default {
    name: 'ServeDev',
    components: {
      ComponentSelector,
      SeatsioSeatingChart,
      SeatsioDesigner,
      SeatsioEventManager
    },
    data: () => ({
      messages: {
        clickToSelect: 'Click to pick',
        STAGE: 'stage-translated'
      },
      selectedComponent: 'seatingChart',
      objectColor: () => 'purple',
      tooltipInfo: () => 'My custom info',
      chartJsUrl: 'https://cdn-staging-eu.seatsio.net/chart.js'
    }),
    methods: {
      onRenderStarted: chart => console.log('Render started', chart),
      onObjectClicked: clickedObject => console.log('Object clicked', clickedObject),
      priceFormatter: price => '$' + price
    }
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
        language="en"
        :chartJsUrl="chartJsUrl"
        :messages="messages"
        :objectColor="objectColor"
        :tooltipInfo="tooltipInfo"
        :priceFormatter="priceFormatter"
        @renderStarted="onRenderStarted"
        @objectClicked="onObjectClicked"
        :pricing="[
          { category: 1, price: 30 },
          { category: 2, price: 40 },
          { category: 3, price: 50 }
        ]"
    />
    <SeatsioDesigner
      v-if="selectedComponent === 'chartDesigner'"
      region="eu"
      id="myChartDesigner"
      workspaceKey="publicDemoKey"
      mode="readOnly"
      :chartJsUrl="chartJsUrl"
      :show-fullscreen-button="true"
      :messages="messages"
      :tooltipInfo="tooltipInfo"
      @renderStarted="onRenderStarted"
      @objectClicked="onObjectClicked"
      chartKey="0bcf8295-0063-486b-85fe-77b8d85008b5"
      secretKey="demoKey"
    />
    <SeatsioEventManager
        v-if="selectedComponent === 'eventManager'"
        region="eu"
        id="myEventManager"
        mode="manageCategories"
        :chartJsUrl="chartJsUrl"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @renderStarted="onRenderStarted"
        @objectClicked="onObjectClicked"
        event="smallTheatreEvent"
        secretKey="demoKey"
    />
</template>

<style scoped>
#myChart, #myChartDesigner, #myChartManager, #myEventManager {
  height: 100vh
}
</style>
