import type { ChartDesigner, ChartDesignerConfigOptions, ChartRendererConfigOptions, EventManager, EventManagerConfigOptions, Region, SeatingChart, Seatsio } from '@seatsio/seatsio-types'

export * from '@seatsio/seatsio-types'

export type SeatsioConfig = ChartRendererConfigOptions | EventManagerConfigOptions | ChartDesignerConfigOptions

export interface SeatsioEmbeddableProps {
  chartJsUrl?: string
  id?: string
  region: Region
  onRenderStarted?: (chart: SeatsioChartInstance) => void
}

export type SeatsioChartInstance = SeatingChart | EventManager | ChartDesigner
export type SeatsioSeatingChartProps = SeatsioEmbeddableProps & ChartRendererConfigOptions
export type SeatsioEventManagerProps = SeatsioEmbeddableProps & EventManagerConfigOptions
export type SeatsioChartDesignerProps = SeatsioEmbeddableProps & ChartDesignerConfigOptions