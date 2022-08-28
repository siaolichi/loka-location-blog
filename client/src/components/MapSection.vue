<template>
  <div class="map-section">
    <div class="map-section__location-list">
      <LocationList :list="state.placeDetail"/>
    </div>
    <div class="map-section__view">
      <div class="map-section__view-bk">
        <div class="map-section__view-map" ref="mapRef" />
      </div>
      <div v-if="post?.locations.length > 0" class="map-section__view-library"
        :class="!state.showLibrary && 'hide-library'">
        <div class="map-section__view-left" @click="toggleLibrary">
          <ArrowRight class="map-section__view-icon" id="map-section__close-library" v-if="state.showLibrary" />
          <ArrowLeft class="map-section__view-icon" v-else />
        </div>
        <div class="map-section__view-right">
          <MapLibrary />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";
import { initMap, addMarkers } from '@/helper/map';
import { getDetailByPlaceIds } from '@/helper/map';
import { usePostStore } from '@/stores/post.js';

import LocationList from "@/components/LocationList.vue";
import MapLibrary from "@/components/MapLibrary.vue";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg"


const store = usePostStore();
const {id} = defineProps({
  id: String,
});
const mapRef = ref(null);
const state = reactive({
  placeDetail: [],
  showLibrary: true,
  initialized: false
})

let service, map;
const post = computed(() => store.posts.find((post) => post._id === id))
onMounted(async () => {
  console.log("init map from map section")
  const init = initMap(mapRef);
  service = init.service;
  map = init.map;
  store.addMarkers([]);

  if (post.value) {
    state.initialized = true;
    setupMapDetails(post.value)
  }
});

const setupMapDetails = async (value) => {
  const request = {
    query: value.country,
    fields: [ "name", "formatted_address", "place_id", "geometry", "photo" ],
  };
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
      map.setCenter(results[ 0 ].geometry.location);
      map.setZoom(6.5);
    }
  });

  state.placeDetail = await getDetailByPlaceIds(service, post.value.locations);
  const markers = await addMarkers(map, state.placeDetail);
  store.addMarkers(markers);
}

const toggleLibrary = () => {
  state.showLibrary = !state.showLibrary
}

const closeLibrary = () => {
  state.showLibrary = false;
}

watch(post, async (value) => {
  if (state.initialized) return;
  if (value) {
    setupMapDetails(value);
  }
})

window.initMap = initMap;
</script>

<style lang="scss" scoped>
.map-section {
  margin: 10%;
  margin: auto;
  width: 100%;
  &__location-list {
    margin: auto;
    width: 80%;
    max-width: 1270px;
  }
}

.map-section__view {
    width: 100%;
    height: 80vh;
    // border: solid 5px gray;
    // border-radius: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &-right {
      width: 300px;
      height: 100%;
      
      @media (max-width: 720px) {
        width: 90%;
      }
    }

    &-left {
      display: flex;
      justify-content: center;
      justify-items: center;
    }

    &-icon {
      margin-top: 50px;
      height: 48px;
      fill: white;
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0));
      color: white;
    }
    &-bk {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }

    &-library {
      width: 100%;
      max-height: 100%;
      transition: all 1s ease;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      pointer-events: none;
    }

    &-left, &-right {
      pointer-events: all;
    }

    &-map {
      height: 100%;
      width: 100%;
    }

    .hide-library{
      transform: translateX(250px);
      @media (max-width: 720px) {
          transform: translateX(85%);
        }
    }
}
</style>
