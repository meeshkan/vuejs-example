<template>
  <div>
    <div v-if="isLoading" class="project-preview">Loading projects...</div>
    <div v-else>
      <div v-if="projects.length === 0" class="project-preview">
        No projects are here... yet.
      </div>
      <RwvArticlePreview
        v-for="(project, index) in projects"
        :project="project"
        :key="project.name + index"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvArticlePreview from "./VArticlePreview";
import VPagination from "./VPagination";
import { FETCH_PROJECTS } from "../store/actions.type";

export default {
  name: "RwvArticleList",
  components: {
    RwvArticlePreview,
    VPagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    author: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    favorited: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const { type } = this;
      const filters = {};
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.isLoading || this.projectsCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.projectsCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["projectsCount", "isLoading", "projects"])
  },
  watch: {
    currentPage() {
      this.fetchArticles();
    },
    type() {
      this.resetPagination();
      this.fetchArticles();
    },
    author() {
      this.resetPagination();
      this.fetchArticles();
    },
    tag() {
      this.resetPagination();
      this.fetchArticles();
    },
    favorited() {
      this.resetPagination();
      this.fetchArticles();
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch(FETCH_PROJECTS, this.listConfig);
    },
    resetPagination() {
      this.currentPage = 1;
    }
  }
};
</script>
