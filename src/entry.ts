import { 
  SeatsioChartManager,
  SeatsioDesigner,
  SeatsioEventManager,
  SeatsioSeatingChart
} from './lib-components';
import { createApp } from "vue";

const components = {
  SeatsioChartManager,
  SeatsioDesigner,
  SeatsioEventManager,
  SeatsioSeatingChart
}

/* export default {
  install (app, _options: any) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = (components as any)[prop]
        app.component(component.name, component)
      }
    }
  }
} */

export default {
  setup() {
    createApp(SeatsioDesigner).mount('#app')
  },
}

export { SeatsioChartManager, SeatsioDesigner, SeatsioEventManager, SeatsioSeatingChart }