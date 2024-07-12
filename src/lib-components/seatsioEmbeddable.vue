<script lang="ts">
  import type { Language, Region } from '@seatsio/seatsio-types'
  import { PropType, defineComponent } from 'vue'

  export default defineComponent({
    mounted() {
      this.createAndRenderChart()
    },
    beforeUnmount() {
      this.destroyChart()
    },
    props: {
      chartJsUrl: {type: String, default: 'https://cdn-{region}.seatsio.net/chart.js'},
      id: {type: String, default: 'chart'},
      region: {type: String as PropType<Region>, required: true},
      language: {type: String as PropType<Language>, default: 'en'}
    },
    methods: {
      createAndRenderChart: async function () {
        if(!this.$props.region) {
          return
        }

        const seatsio = await this.getSeatsio()

        const config = {
          divId: this.$props.id,
          ...this.propsAndAttrs()
        }
        // @ts-ignore
        this.chart = this.createChart(seatsio, config).render()
        if(this.$attrs.onRenderStarted) {
          // @ts-ignore
          this.$attrs.onRenderStarted(this.chart)
        }
      },
      propsAndAttrs: function () {
        let allPropsAndAttrs = {...this.$props, ...this.$attrs};
        // @ts-ignore
        let { id, onRenderStarted, chartJsUrl, region, ...filteredPropsAndAttrs } = allPropsAndAttrs
        return filteredPropsAndAttrs
      },
      getSeatsio: async function () {
        if (typeof window.seatsio === 'undefined') {
          return this.loadSeatsio()
        } else if ((seatsio as any).region !== this.getRegion()) {
          // @ts-ignore
          window.seatsio = undefined
          return this.loadSeatsio()
        } else {
          return Promise.resolve(seatsio)
        }
      },
      loadSeatsio: async function () {
        return new Promise((resolve, reject) => {
          let script = document.createElement('script')
          script.onload = () => {
            (seatsio as any).region = this.getRegion()
            resolve(window.seatsio)
          }
          script.onerror = () => reject(`Could not load ${script.src}`)
          script.src = this.chartJsUrl.replace('{region}', this.getRegion())
          document.head.appendChild(script)
        })
      },
      destroyChart: function () {
        // @ts-ignore
        this.chart.destroy()
      },
      getRegion: function () {
        return this.$props.region
      }
    },
    watch: {
      $props: {
        handler: function() {
          const chart = (this as any).chart
          chart.config = {
            ...chart.config,
            ...this.propsAndAttrs()
          }
          chart.rerender()
        },
        deep: true,
      },
    }
  })
</script>
