<script lang="ts">
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
      <li><button @click="this.onClick('seatingChart')">Seating Chart</button></li>
      <li><button @click="this.onClick('chartDesigner')">Designer</button></li>
      <li><button @click="this.onClick('eventManager')">EventManager</button></li>
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