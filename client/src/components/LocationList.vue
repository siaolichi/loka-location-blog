<template>
  <div id="location-list">
    <LocationListCard v-for="location in list" :key="location.id" :item="location"/>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import LocationListCard from "./LocationListCard.vue";
const props = defineProps({
  list: Object
});

</script>

<style lang="scss" scoped>
#location-list{
  width: 100%;
  height: 100%;
}</style>
