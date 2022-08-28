<script setup>
import { RouterLink } from "vue-router";
import ThreeCanvas from "@/components/ThreeCanvas.vue";
import MapSection from "@/components/MapSection.vue";

import { usePostStore } from '@/stores/post.js';
import { computed } from "vue";

const store = usePostStore();

const id = '62b48769cfec579c6f17d93f'

const profilePost = computed(() => store.posts.find((post) => post._id === id))
</script>

<template>
  <main class="home-view">
    <section class="title-view">
      <div class="title">
        <div class="upper">LOKA-</div>
        <hr />
        <div class="bottom">Location</div>
      </div>
      <ThreeCanvas />
    </section>
    <section class="section-profile">
      <div class="aboutme">
        <div class="profile-photo"></div>
        <div class="profile-text">
          <div class="text-top">
            <h1>ABOUT ME</h1>
            <p>2022年，30歲，我給自己的生日禮物是一封辭職信，就此決定用自己喜歡的方式過生活。一個人、一台車，在歐洲各地流浪、找浪。</p>
            <p>這是我的旅行日誌，也是給未來想要到處闖蕩的人的一個足跡參考。我記錄了旅行前的資料搜集，以及旅行中經過的各個地點，希望未來不管是自己或是看到這幾篇日誌的人都能夠找到些靈感。</p>
          </div>
          <div class="text-bottom">
            <h2>FOLLOW ME ON</h2>
            <div class="social-media">
              <a class="instagram-icon" target="_blank" href="https://www.instagram.com/siao.lichi/"></a>
              <a class="youtube-icon" target="_blank"
                href="https://www.youtube.com/channel/UCaDexFYvLULF_CNz4diY3eQ"></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h1 class="latest-post">Latest post</h1>
      <div class="article-view">
        <svg class="wide-screen" viewBox="0 0 5 5" preserveAspectRatio="none">
          <polygon points="5 5 0 5 1 0 5 0 5 5" style="fill: #ffffff" />
        </svg>
        <svg class="mobile" viewBox="0 0 5 5" preserveAspectRatio="none">
          <polygon points="5 5 0 5 0 1 5 0 5 5" style="fill: #ffffff" />
        </svg>
        <div class="short-description" v-html="profilePost?.intro" />
        <RouterLink :to="`/post/${id}`" class="article-title">{{profilePost?.title}}</RouterLink>
      </div>
    </section>
    <section class="section-map">
      <MapSection :id="id" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.home-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .latest-post {
    position: relative;
    font-size: 24px;
    margin-bottom: 20px;
    position: relative;

    &::after {
      content: "";
      width: 120%;
      height: 10px;
      background-color: #e4e4e4;
      bottom: 2px;
      left: -10%;
      position: absolute;
      z-index: -2;
    }
  }

  .title-view {
        min-height: 100vh;

      .title {
          font-weight: bold;
          margin: 5%;
          font-size: 72px;
          width: 90%;
      
          hr {
            border-style: solid;
            border-width: 3px;
            border-radius: 3px;
            z-index: -3;
          }
      
          @media (max-width: 720px) {
            font-size: 64px;
          }
        }
  }

  

  .section-profile {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 130%;

    @media (max-width: 720px) {
      height: 110vh;
    }

    .aboutme {
      height: 400px;
      width: 80%;
      max-width: 960px;
      background-color: #f2f8ff;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 960px) {
        width: 90%;
      }

      @media (max-width: 720px) {
        flex-direction: column;
        height: auto;
      }

      .profile-photo {
        background-image: url("/imgs/profile-photo.jpg");
        background-size: cover;
        background-position: center;
        width: 300px;
        height: 300px;
        margin: 50px;
        flex-shrink: 0;

        @media (max-width: 960px) {
          margin: 20px;
        }

        @media (max-width: 720px) {
          margin: 0;
          width: 100%;
        }
      }
      .profile-text {
        height: calc(100% - 100px);
        margin: 60px;
        margin-left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 960px) {
          margin: 20px;
          margin-left: 0;
        }

        @media (max-width: 720px) {
          height: calc(100% - 60px);
          margin: 20px;
          margin-top: 40px;
        }

        h1 {
          @media only screen and (max-width: 960px) and (min-width: 720px) {
            margin-top: 20px;
          }
          font-size: 48px;
          margin-bottom: 20px;

          @media (max-width: 720px) {
            margin-bottom: 40px;
          }
        }
        .text-top {
          @media (max-width: 720px) {
            margin-bottom: 40px;
          }
          p {
              margin-bottom: 10px;
            }
        }
        
        .text-bottom {

          h2 {
            margin-top: 20px;
          }
          .social-media {
            display: flex;
          }
        
          .instagram-icon {
            background-image: url("@/assets/icons/instagram-logo.png");
            background-size: contain;
            background-position: center;
            width: 30px;
            height: 30px;
            margin: 10px;
            margin-bottom: 0;
          }
        
          .youtube-icon {
            background-image: url("@/assets/icons/youtube-logo.png");
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            width: 100px;
            height: 30px;
            margin: 10px;
            margin-bottom: 0;
          }
        }

      }

    }
  }
  .article-view {
    background-image: url("/imgs/home-surf-title.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 2.5%;
    min-height: 60vh;
    position: relative;
    margin-bottom: 100px;

    @media (max-width: 720px) {
      height: 80vh;
      flex-direction: column-reverse;
      justify-content: flex-start;
    }
    svg.wide-screen {
      position: absolute;
      right: 0;
      top: 0;
      width: 30%;
      height: 100%;
      @media (max-width: 960px) {
        width: 60%;
      }
      @media (max-width: 720px) {
        display: none;
      }
    }
    svg.mobile {
      display: none;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 50%;
      @media (max-width: 720px) {
        display: block;
      }
    }
    .article-title {
      font-size: 72px;
      text-align: end;
      color: black;
      font-weight: 900;

      &:hover{
        color:#BCCBDB;
      }

      @media (max-width: 480px) {
        font-size: 48px;
        margin-top: 30px;
      }
    }
    .short-description {
      width: 20%;
      text-align: end;
      margin: 2.5%;
      line-height: 120%;
      margin-bottom: 100px;

      @media (max-width: 960px) {
        width: 40%;
      }
      @media (max-width: 720px) {
        width: 90%;
        height: 30%;
        text-align: left;
        align-self: center;
        color: gray;
      }
    }
  }
  .section-map {
    margin: 5% auto;
  }
}
</style>
