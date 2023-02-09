<script>
export default {
  name: 'ComponentSelector',
  methods: {
    onClick: function(selection) {
        this.$emit('selectChartType', selection)
    }
  }
}
</script>

<template>
  <ul id="menu">
      <li><button @click="onClick('seatingChart')">Seating Chart</button></li>
      <li><button @click="onClick('chartDesigner')">Designer</button></li>
      <li><button @click="onClick('chartManager')">ChartManager</button></li>
      <li><button @click="onClick('eventManager')">EventManager</button></li>
    </ul>
</template>

<style scoped>
#menu {
  list-style-type: none;
  display: inline;
}

#menu > li {
  display: inline;
  margin-right: 4px;
}
</style>