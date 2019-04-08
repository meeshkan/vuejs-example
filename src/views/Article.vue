<template>
  <div class="project-page">
    <div class="banner">
      <div class="container">
        <h1>{{ project.name }}</h1>
        <RwvArticleMeta :project="project" :actions="true"></RwvArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row project-content">
        <div class="col-xs-12">
          <!-- <div v-html="parseMarkdown(project.description)"></div> -->
          <ul class="tag-list">
            <li v-for="(tag, index) of project.fields" :key="tag + index">
              <RwvTag
                :name="tag"
                className="tag-default tag-pill tag-outline"
              ></RwvTag>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="project-actions">
        <RwvArticleMeta :project="project" :actions="true"></RwvArticleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <RwvComment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          >
          </RwvComment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvArticleMeta from "@/components/ArticleMeta";
import RwvComment from "@/components/Comment";
import RwvTag from "@/components/VTag";
import { FETCH_PROJECT, FETCH_COMMENTS } from "@/store/actions.type";

export default {
  name: "rwv-project",
  props: {
    slug: {
      type: Number,
      required: true
    }
  },
  components: {
    RwvArticleMeta,
    RwvComment,
    RwvTag
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_PROJECT, to.params.slug),
      store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["project", "currentUser", "comments", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
