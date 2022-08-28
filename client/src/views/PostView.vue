<template>
  <div class="post-view">
    <img class="post-view__image" :src=" backgroundImage + post.image">
    <div class="post-view__title" v-html="post.title" />
    <div class="post-view__intro" v-html="post.intro" />
    <MapSection :id="route.params.id" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from "vue";

import MapSection from '../components/MapSection.vue';
import { usePostStore } from '@/stores/post.js';


const store = usePostStore();
const route = useRoute();
const post = computed(() => store.posts.find((post) => post._id === route.params.id))
const backgroundImage = '/imgs/'

</script>

<style lang="scss" scoped>
.post-view {
  width: 100%;

  &__image {
    width: 100%;
    max-height: 80vh;
    object-fit: cover;
  }
  &__title {
    margin: 40px auto;
    font-weight: 500;
    font-size: 48px;
    width: 70%;
    max-width: 1270px;
    font-weight: 900;
    @media (max-width: 960px) {
      width: 80%;
    }
  }

  &__intro {
    margin: 40px auto;
    font-weight: 500;
    font-size: 16px;
    width: 70%;
    max-width: 1270px;
    font-weight: 600;
    @media (max-width: 960px) {
      width: 80%;
    }
  }
}
</style>