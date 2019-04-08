import Vue from "vue";
import { ProjectsService, CommentsService } from "@/common/api.service";
import { FETCH_PROJECT, FETCH_COMMENTS } from "./actions.type";
import { RESET_STATE, SET_PROJECT, SET_COMMENTS } from "./mutations.type";

const initialState = {
  project: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_PROJECT](context, projectSlug) {
    const { data } = await ProjectsService.get(projectSlug);
    context.commit(SET_PROJECT, data);
    return data;
  },
  async [FETCH_COMMENTS](context, projectSlug) {
    const { data } = await CommentsService.get(projectSlug);
    context.commit(SET_COMMENTS, data.comments);
    return data.comments;
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PROJECT](state, project) {
    state.project = project;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  project(state) {
    return state.project;
  },
  comments(state) {
    return state.comments;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
