<script lang="ts">
import ComponentSelector from './componentSelector.vue'
import SeatsioSeatingChart from '../src/lib-components/seatsioSeatingChart.vue'
import SeatsioDesigner from '../src/lib-components/seatsioDesigner.vue'
import SeatsioEventManager from '../src/lib-components/seatsioEventManager.vue'

type Language = 'en' | 'de' | 'fr'
const languages: Language[] = [
  'en',
  'de',
  'fr'
]

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
      chartJsUrl: 'https://cdn-staging-eu.seatsio.net/chart.js',
      language: 'en' as Language,
      languages
    }),
    methods: {
      onRenderStarted: chart => console.log('Render started', chart),
      onObjectClicked: clickedObject => console.log('Object clicked', clickedObject),
      priceFormatter: price => '$' + price
    }
}
</script>

<template>
  <div style="height: 100vh">
    <ComponentSelector @selectChartType="component => selectedComponent = component" />
    <select v-model="language">
      <option v-for="option in languages" :value="option">{{option}}</option>
    </select>
    <SeatsioSeatingChart
      v-if="selectedComponent === 'seatingChart'"
      workspaceKey="publicDemoKey"
      event="smallTheatreEvent"
      region="eu"
      :language="language"
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
      workspaceKey="publicDemoKey"
      mode="readOnly"
      :language="language"
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
        mode="manageCategories"
        :language="language"
        :chartJsUrl="chartJsUrl"
        :messages="messages"
        :tooltipInfo="tooltipInfo"
        @renderStarted="onRenderStarted"
        @objectClicked="onObjectClicked"
        event="smallTheatreEvent"
        secretKey="demoKey"
    />
  </div>
</template>