import { ProjectsService } from "@/common/api.service";
import { FETCH_PROJECTS } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  UPDATE_PROJECT_IN_LIST
} from "./mutations.type";

const state = {
  projects: [],
  isLoading: true,
  projectsCount: 0
};

const getters = {
  projectsCount(state) {
    return state.projectsCount;
  },
  projects(state) {
    return state.projects;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

const actions = {
  [FETCH_PROJECTS]({ commit }, params) {
    commit(FETCH_START);
    return ProjectsService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, { projects, projectsCount }) {
    state.projects = projects;
    state.projectsCount = projectsCount;
    state.isLoading = false;
  },
  [UPDATE_PROJECT_IN_LIST](state, data) {
    state.projects = state.projects.map(project => {
      if (project.slug !== data.slug) {
        return project;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      project.favorited = data.favorited;
      project.favoritesCount = data.favoritesCount;
      return project;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
