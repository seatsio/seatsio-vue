import type { ChartDesignerConfigOptions, ChartRendererConfigOptions, EventManagerConfigOptions, Region } from "@seatsio/seatsio-types"

export * from '@seatsio/seatsio-types'

export type SeatsioConfig = ChartRendererConfigOptions | EventManagerConfigOptions | ChartDesignerConfigOptions
export type SeatsioEmbeddableProps = {
  chartJsUrl?: string
  id: string
  region: Region
  onRenderStarted?: (chart: any) => void
}

export type SeatsioSeatingChartProps = SeatsioEmbeddableProps & ChartRendererConfigOptions
export type SeatsioEventManagerProps = SeatsioEmbeddableProps & EventManagerConfigOptions
export type SeatsioChartDesignerProps = SeatsioEmbeddableProps & ChartDesignerConfigOptions