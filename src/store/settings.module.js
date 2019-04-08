import { ProjectsService, CommentsService } from "@/common/api.service";
import { FETCH_PROJECT, FETCH_COMMENTS } from "./actions.type";
import { SET_PROJECT, SET_COMMENTS } from "./mutations.type";

export const state = {
  project: {},
  comments: []
};

export const actions = {
  [FETCH_PROJECT](context, projectSlug) {
    return ProjectsService.get(projectSlug)
      .then(({ data }) => {
        context.commit(SET_PROJECT, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_COMMENTS](context, projectSlug) {
    return CommentsService.get(projectSlug)
      .then(({ data }) => {
        context.commit(SET_COMMENTS, data.comments);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PROJECT](state, project) {
    state.project = project;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  }
};

export default {
  state,
  actions,
  mutations
};
