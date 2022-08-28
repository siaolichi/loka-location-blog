<template>
  <div class="map-library">
    <div class="map-library__card" v-for="marker in markers" :key="marker.title" @click="()=>openInfoWindow(marker)">
      <img class="map-library__card-icon" :src="marker.icon" />
      <div class="map-library__card-top">
        <div class="map-library__card-title">{{marker.title}}</div>
        <div class="map-library__card-city">{{marker.city}}</div>
      </div>
      <!-- <img class="map-library__card-photo" :src="marker.photo" /> -->

    </div>
  </div>
</template>

<script setup>
import { computed, watch, reactive } from "vue";
import { usePostStore } from '@/stores/post.js';
const store = usePostStore();

const state = reactive({
  markers: {}
})

const markers = computed(() => store.markers);

const openInfoWindow = (marker) => {
  google.maps.event.trigger(marker, 'click');
}

watch(markers, async (value) => {
  state.markers = value;
})


</script>

<style lang="scss" scoped>
.map-library {
  height: 100%;
  padding: 10px;
  padding-top: 50px;
  overflow-y: auto;
  &__card {
    background-color: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 5px;
    // min-height: 100px;
    padding: 10px;
    margin-top: 10px;
    // border-bottom: solid #BCCBDB 5px;
    display: flex;
    align-items: center;
    &-title {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 5px;
    }
    &-city {
      font-size: 14px;
      margin-bottom: 5px;
    }
    &-icon {
      flex-shrink: 0;
      margin-right: 5px;
    }
  }
}
</style>