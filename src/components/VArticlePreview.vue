<template>
  <div class="project-preview">
    <RwvArticleMeta isPreview :project="project" />
    <router-link :to="projectLink" class="preview-link">
      <h1 v-text="project.name" />
      <span>Read more...</span>
    </router-link>
    <hr />
  </div>
</template>

<script>
import RwvArticleMeta from "./ArticleMeta";

export default {
  name: "RwvArticlePreview",
  components: {
    RwvArticleMeta
  },
  props: {
    project: { type: Object, required: true }
  },
  computed: {
    projectLink() {
      return {
        name: "project",
        params: {
          slug: this.project.id
        }
      };
    }
  }
};
</script>
