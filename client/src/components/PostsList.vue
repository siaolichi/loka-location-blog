<template>
  <div class="posts-list">
    <div class="posts-list__column">
      <RouterLink :to="`/post/${post._id}`" class="posts-list__card" v-for="post in firstLine" :key="post._id">
        <img class="posts-list__card-top" :src="`/imgs/${post.thumbnail ? post.thumbnail : post.image}`" />
        <div class=" posts-list__card-title">{{post.title}}</div>
        <div class=" posts-list__card-text" v-html="post.intro" />
      </RouterLink>
    </div>
    <div class="posts-list__column">
      <RouterLink :to="`/post/${post._id}`" class="posts-list__card" v-for="post in secondLine" :key="post._id">
        <img class="posts-list__card-top" :src="`/imgs/${post.thumbnail ? post.thumbnail : post.image}`" />
        <div class=" posts-list__card-title">{{post.title}}</div>
        <div class=" posts-list__card-text" v-html="post.intro" />
      </RouterLink>
    </div>
    <div class="posts-list__column">
      <RouterLink :to="`/post/${post._id}`" class="posts-list__card" v-for="post in thirdLine" :key="post._id">
        <img class="posts-list__card-top" :src="`/imgs/${post.thumbnail ? post.thumbnail : post.image}`" />
        <div class=" posts-list__card-title">{{post.title}}</div>
        <div class=" posts-list__card-text" v-html="post.intro" />
      </RouterLink>
    </div>
    <div class="posts-list__fullscreen">
      <RouterLink :to="`/post/${post._id}`" class="posts-list__card" v-for="post in posts" :key="post._id">
        <img class="posts-list__card-top" :src="`/imgs/${post.thumbnail ? post.thumbnail : post.image}`" />
        <div class=" posts-list__card-title">{{post.title}}</div>
        <div class=" posts-list__card-text" v-html="post.intro" />
      </RouterLink>
    </div>

  </div>
</template>

<script setup>
import { usePostStore } from '@/stores/post.js';
import { computed, reactive, watch } from "vue";
import { RouterLink } from "vue-router";

const store = usePostStore();

const posts = computed(() => store.posts);

const firstLine = computed(() => store.posts.filter((post, index) => index % 3 === 0));
const secondLine = computed(() => store.posts.filter((post, index) => index % 3 === 1));
const thirdLine = computed(() => store.posts.filter((post, index) => index % 3 === 2));

</script>

<style lang="scss" scoped>

.posts-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 1270px;
  margin: 40px auto;
  @media (max-width: 480px) {
    margin: 20px 0;
  }

  p {
    margin-bottom: 2rem;
  }

  &__column {
    width: calc(32% - 20px);
    margin: 10px;

    @media (max-width: 480px) {
      display: none;
    }
  }
  &__fullscreen {
    display: none;
    width: 90%;
    @media (max-width: 480px) {
      display: block;
    }
  }

  &__card {
    width: 100%;
    margin: 10px 0;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @media (max-width: 480px) {
      width: 100%;
      margin: 10px 0;
    }

    &-top {
      object-fit: contain;
      width: 100%;
    }

    &-title {
      font-size: 24px;
      align-self: flex-end;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: rgb(255, 255, 255);
      padding: 20px;
      font-weight: 800;
      color: black;
      // background: linear-gradient(0deg, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0) 100%);

      @media (max-width: 480px) {
        font-size: 24px;
        padding: 20px 10px 5px 10px;
      }
    }

    &-text {
      background: rgb(255, 255, 255);
      padding: 20px;
      font-weight: 500;
      color:lightslategray;

      @media (max-width: 480px) {
        padding: 5px 10px 20px 10px;
      }
    }
  }



  
}

</style>