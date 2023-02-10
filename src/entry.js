import { 
  SeatsioChartManager,
  SeatsioDesigner,
  SeatsioEventManager,
  SeatsioSeatingChart
} from './lib-components';

const components = {
  SeatsioChartManager,
  SeatsioDesigner,
  SeatsioEventManager,
  SeatsioSeatingChart
}

export default {
  install (app, _options) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop]
        app.component(component.name, component)
      }
    }
  }
}

export { SeatsioChartManager, SeatsioDesigner, SeatsioEventManager, SeatsioSeatingChart }