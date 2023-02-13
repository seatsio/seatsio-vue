# seatsio-vue, the official Seats.io Vue wrapper

Vue wrapper for rendering [Seats.io](https://www.seats.io) seating charts. Brought to you by the Seats.io team.

# Installation

```
Npm
npm install --save @seatsio/seatsio-vue

Yarn
yarn add -dev @seatsio/seatsio-vue
```

# Usage

## Regular charts

### Minimal example to render a seating chart:

```jsx
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

## Reacting to events

### onRenderStarted()

`onRenderStarted` is fired when the chart has started loading, but hasn't rendered yet. If you store the chart object that's passed to the `onRenderStarted` callback, you can access the properties defined on the  wrapped `seatsio.SeatingChart`:

```jsx
// Single File Component (SFC) using SeatsioSeatingChart
export default {
    ...
    data() {
        return {
            chart: null
        }
    },
    methods: {
        onRenderStarted: function (chart) {
            this.chart = chart
            console.log(chart.selectedObjects)
        } 
    }
}

<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    // Notice how the event handler is defined with @<eventListener>
    // For more information, see https://vuejs.org/guide/essentials/event-handling.html
    @onRenderStarted="onRenderStarted"
    region="eu"
/>
```

## onChartRendered()

`onChartRendered` is fired when the chart is rendered successfully:

```jsx
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
    @onChartRendered="onChartRendered"
    region="eu"
/>
```
## Supported properties

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/renderer/embed-a-floor-plan


Example: Passing in a custom object color:
```jsx
export default {
    ...
    data() {
        // Supports CSS color values
        objectColor: () => 'grey',
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

```jsx
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

## Chart manager

```jsx
import { SeatsioChartManager } from '@seatsio/seatsio-vue';

<div style="height: 500px">
    <SeatsioChartManager
        secretKey="<yourWorkspaceSecretKey>"
        chart="<yourChartKey>"
        mode="<manageRulesets or another mode>"
        region="eu"
    />
</div>
```
Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/chart-manager/configuring/

## Seating Chart Designer

To embed the seating chart designer for the purpose of creating a new chart, do this:

```jsx
import { SeatsioDesigner } from '@seatsio/seatsio-vue';

<div style="height: 500px">
    <SeatsioDesigner
        secretKey="<yourWorkspaceSecretKey>"
        region="eu"
    />
</div>
```

To be able to edit a chart from an embedded designer, you need to specify the chart to load:
 
```jsx
<SeatsioDesigner
    secretKey="<yourWorkspaceSecretKey>"    
    chartKey="<yourChartKey>"
    region="eu"
/>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/embedded-designer/introduction