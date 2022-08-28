<template>
  <div class="location-list-card" @click="openPopup">
    <img class="left" :src="item.photo" />
    <div class="right">
      <div class="title">{{ item.title ?? item.name }}</div>
      <div class="title-divider"></div>
      <div class="city">{{ item.city}}</div>
      <div class="desc" v-html="item.text"></div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { watch, computed, reactive } from "vue";
import { usePostStore } from '@/stores/post.js';
const store = usePostStore();
const props = defineProps({ item: Object, });
const state = reactive({ marker: {} });
const marker=computed(()=> store.markers[ props.item.id ]);

const openPopup = () => {
google.maps.event.trigger(marker.value, 'click');
window.scrollTo(0, document.body.scrollHeight);
}

watch(marker, async (value) => {
state.marker = value
})

</script>

<style lang="scss" scoped>
  .location-list-card {
    width: 100%;
    min-height: 300px;
    margin-bottom: 40px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    border-radius: 5px;
    display: flex;
    justify-content: stretch;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
        rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
        rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    @media (max-width: 720px) {
      flex-direction: column;
      min-height: 400px;
    }

    .left {
      width: 40%;
      border-radius: 5px 0 0 5px;
      object-fit: cover;

      @media (max-width: 720px) {
        width: 100%;
        height: 50%;
        border-radius: 5px 5px 0 0;
      }
    }

    .right {
      .title {
        font-weight: 700;
        font-size: 36px;
        margin: 20px 10px 0 10px;
        font-weight: 900;
      }

      .title-divider {
        margin-left: 20px;
        border-bottom: solid #f2f8ff 20px;
        transform: translateY(-20px);
        z-index: -1;
      }

      .city {
        font-weight: 900;
        font-size: 24px;
        margin: 10px 20px;
      }

      .desc {
        margin: 10px 24px 10px 20px;
        line-height: 130%;
      }
    }
  }
</style>
