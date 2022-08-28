import { defineStore } from "pinia";
import server from "@/server";

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    posts: [],
    markers: [],
  }),
  getters: {},
  actions: {
    addPost(newPost) {
      this.posts.push(newPost);
    },
    async getPosts() {
      const posts = (await server.get(`/api/post`)).data;
      this.posts = posts;
    },
    async updatePost(id, newData) {
      const post = (await server.post(`/api/post/${id}`, newData)).data;
      this.posts.push(post);
    },
    addMarkers(markers) {
      this.markers = markers;
    },
  },
});
