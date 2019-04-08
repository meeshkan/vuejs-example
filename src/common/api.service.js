import Vue from "vue";
import axios from "axios";
import mock, { proxy } from "xhr-mock";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";
import projects from "./behance.projects";
import project from "./behance.project";
import comments from "./behance.comment";

mock.setup();

mock.get(
  new RegExp("^https://www.behance.net/v2/projects/[0-9]+/comments(/?)$"),
  (_, res) => {
    return res.status(200).body(comments);
  }
);
mock.get(
  new RegExp("^https://www.behance.net/v2/projects/[0-9]+(/?)$"),
  (_, res) => {
    return res.status(200).body(project);
  }
);
mock.get(new RegExp("^https://www.behance.net/v2/projects(/?)$"), (_, res) => {
  return res.status(200).body(projects);
});
// necessary to let all other requests pass through
mock.use(proxy);

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const ProjectsService = {
  query(type, params) {
    return ApiService.query("projects" + (type === "feed" ? "/feed" : ""), {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("projects", slug);
  }
};

export const CommentsService = {
  get(slug) {
    return ApiService.get("projects", `${slug}/comments`);
  }
};
