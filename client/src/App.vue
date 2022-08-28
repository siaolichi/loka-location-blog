<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";

import { usePostStore } from '@/stores/post.js';

import AOS from "aos";
import "aos/dist/aos.css";

const store = usePostStore();

const header = ref(null);
let lastScroll = 0;

onMounted(() => {
  store.getPosts();
  window.addEventListener("scroll", throttle(validateHeader, 100));
  AOS.init();
});


const throttle = (func, time = 100) => {
  let lastTime = 0;
  return () => {
    const now = new Date();
    if (now - lastTime >= time) {
      func();
      time = now;
    }
  };
};
const validateHeader = () => {
  if(!header.value) return;
  
  const windowY = window.scrollY;
  const windowH = window.innerHeight;
  if (windowY > windowH / 2) {
    // We passed the first section, set a toggable class
    header.value.classList.add("is-fixed");
  } else if (windowY > lastScroll) {
    header.value.classList.remove("is-fixed", "can-animate");
  }

  // Determine is we ready to animate
  if (windowY > windowH / 2 + 5) {
    header.value.classList.add("can-animate");
  } else {
    header.value.classList.remove("scroll-up");
  }

  if (windowY < lastScroll) {
    header.value.classList.add("scroll-up");
  } else {
    header.value.classList.remove("scroll-up");
  }

  if(lastScroll < 3) {
    header.value.classList.remove("is-fixed");
  }

  lastScroll = windowY;
};
</script>

<template>
  <div>
    <header ref="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/map">Discover</RouterLink>
        <!-- <RouterLink to="/my-loka">My LOKAS</RouterLink>
        <RouterLink to="/setting">Setting</RouterLink> -->
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/base.css";
@import 'material-icons/iconfont/material-icons.css';

html {
    scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Libre Bodoni', 'Noto Serif TC', serif;

}
#app {
  margin: 0;
  padding: 0;

  font-weight: normal;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  position: relative;
}

header {
  line-height: 1.5;
  width: 100%;
  z-index: 2;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);

  &.is-fixed {
    position: fixed;
    transform: translate3d(0, -100%, 0);
  }

  &.can-animate {
    transition: transform 0.3s ease, visibility 0s 0.3s linear;
  }

  &.scroll-up {
    transform: translate3d(0, 0, 0);
  }
}

a {
  text-decoration: none;
  color: rgb(127, 127, 127);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    color: rgb(220, 220, 220);
  }
}

nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin: 0 2.5%;
}

nav a.router-link-exact-active {
  color: black;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 4px 1rem;
  border-radius: 4px;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
  header {
    display: flex;
    place-items: center;
  }

  nav {
    font-size: 1.1rem;
    padding: 5px 0;
  }
}
</style>
