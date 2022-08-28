<template>
  <div class="map-view">
      <PostsList/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";

import PostsList from "@/components/PostsList.vue"

</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-x: hidden;
}
</style>
