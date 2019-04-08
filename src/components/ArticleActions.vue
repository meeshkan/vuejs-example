<template>
  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link
      class="btn btn-sm btn-outline-secondary"
      :to="{ name: 'project-edit', params: { slug: this.project.slug } }"
    >
      <i class="ion-edit"></i><span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i><span>&nbsp;Delete Article</span>
    </button>
  </span>
  <!-- Used in ArticleView when not author -->
  <span v-else>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i> <span>&nbsp;</span>
      <span
        >{{ profile.following ? "Unfollow" : "Follow" }}
        {{ project.author.username }}</span
      >
    </button>
    <span>&nbsp;&nbsp;</span>
    <button
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="{
        'btn-primary': project.favorited,
        'btn-outline-primary': !project.favorited
      }"
    >
      <i class="ion-heart"></i><span>&nbsp;</span>
      <span>
        {{ project.favorited ? "Unfavorite Article" : "Favorite Article" }}
      </span>
      <span class="counter"> ({{ project.favoritesCount }}) </span>
    </button>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_DELETE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "@/store/actions.type";

export default {
  name: "RwvArticleActions",
  props: {
    project: { type: Object, required: true },
    canModify: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"])
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.project.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.project.slug);
    },
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.project.following
        ? FETCH_PROFILE_UNFOLLOW
        : FETCH_PROFILE_FOLLOW;
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    },
    async deleteArticle() {
      try {
        await this.$store.dispatch(ARTICLE_DELETE, this.project.slug);
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
