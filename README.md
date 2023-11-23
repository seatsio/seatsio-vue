# seatsio-vue, the official Seats.io Vue wrapper

Vue wrapper for rendering [Seats.io](https://www.seats.io) seating charts. Brought to you by the Seats.io team.

# Recommended tools

This package uses TypeScript. In order to get the best possible developer experience, you may need some Vue plugins for your IDE. If you use Visual Studio Code, we recommend the following plugins (direct extension links):
- [Vue Language Features (Volar)](vscode:extension/Vue.volar)
- [TypeScript Vue Plugin](vscode:extension/Vue.vscode-typescript-vue-plugin)

If you use a different IDE, there may be similar plugins available.

# Installation

```
Npm
npm install --save @seatsio/seatsio-vue

Yarn
yarn add @seatsio/seatsio-vue
```

# Usage

## Regular charts

### Minimal example to render a seating chart:

```vue
import { SeatsioSeatingChart } from '@seatsio/seatsio-vue';

<div style="height: 500px">
    <SeatsioSeatingChart
        workspaceKey="<yourPublicWorkspaceKey>"
        event="<yourEventKey>"
        region="eu"
    />
</div>
```

The chart uses 100 % of the width and height of the DOM element (e.g. a div) in which you render it. Play with the size of that element to change the chart size.

### Pricing

```vue
import { SeatsioSeatingChart } from '@seatsio/seatsio-vue';

<div style="height: 500px">
    <SeatsioSeatingChart
        workspaceKey="<yourPublicWorkspaceKey>"
        event="<yourEventKey>"
        region="eu"
        :pricing="[
            {'category': 1, 'price': 30},
            {'category': 2, 'price': 40},
            {'category': 3, 'price': 50}
        ]"
    />
</div>
```

## Reacting to events

### onRenderStarted()

`onRenderStarted` is fired when the chart has started loading, but hasn't rendered yet. If you store the chart object that's passed to the `onRenderStarted` callback, you can access the properties defined on the  wrapped `seatsio.SeatingChart`:

```vue
// Single File Component (SFC) using SeatsioSeatingChart
export default {
    ...
    data() {
        return {
            chart: null
        }
    },
    methods: {
        onRenderStarted: (chart) => {
            this.chart = chart
            console.log(chart.selectedObjects)
        } 
    }
}

// Notice how the event handler is defined with @&lt;eventListener&gt;
// For more information, see https://vuejs.org/guide/essentials/event-handling.html
<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    @renderStarted="onRenderStarted"
    region="eu"
/>
```

## onChartRendered()

`onChartRendered` is fired when the chart is rendered successfully:

```vue
export default {
    ...
    data() {
        return {
            chart: null
        }
    },
    methods: {
        onChartRendered: function (chart) {
            this.chart = chart
            console.log(chart.selectedObjects)
        } 
    }
}

<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    @chartRendered="onChartRendered"
    region="eu"
/>
```
## Supported properties

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/renderer/embed-a-floor-plan

Example: Passing in a custom object color:
```vue
export default {
    ...
    data() {
        // Supports CSS color values
        objectColor: () => 'grey'
    },
}

<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    region="eu"
    :objectColor="objectColor"
/>
```

Whenever one of the properties passed on to `<SeatsioSeatingChart />` changes, the chart destroys itself and rerenders. To avoid such a 'full refresh', you can use `chart.changeConfig()` instead of updating the properties directly. Please check https://docs.seats.io/docs/renderer-chart-properties-chartchangeconfig. Note that `changeConfig()` only supports a subset of all available chart parameters.

## Event manager

```vue
import { SeatsioEventManager } from '@seatsio/seatsio-vue';

<div style="height: 500px">
    <SeatsioEventManager
        secretKey="<yourWorkspaceSecretKey>"
        event="<yourEventKey>"
        mode="<manageObjectStatuses or another mode>"
        region="eu"
    />
</div>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/event-manager/configuring

## Seating Chart Designer

To embed the seating chart designer for the purpose of creating a new chart, do this:

```vue
import { SeatsioDesigner } from '@seatsio/seatsio-vue';

<div style="height: 500px">
    <SeatsioDesigner
        secretKey="<yourWorkspaceSecretKey>"
        region="eu"
        @chartCreated="onChartCreated"
    />
</div>
```

To be able to edit a chart from an embedded designer, you need to specify the chart to load:
 
```vue
<SeatsioDesigner
    secretKey="<yourWorkspaceSecretKey>"    
    chartKey="<yourChartKey>"
    region="eu"
/>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/embedded-designer/introduction
