import { Region } from "@seatsio/seatsio-types";

/* eslint-disable import/prefer-default-export */
export { default as SeatsioChartManager } from './seatsioChartManager.vue';
export { default as SeatsioDesigner } from './seatsioDesigner.vue';
export { default as SeatsioEventManager } from './seatsioEventManager.vue';
export { default as SeatsioSeatingChart } from './seatsioSeatingChart.vue';

export type SeatsioEmbeddableProps = {
    chartJsUrl: string
    chartKey: string
    id: string
    region: Region

}