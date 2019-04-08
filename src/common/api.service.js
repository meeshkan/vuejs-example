import Vue from "vue";
import axios from "axios";
import { unmock } from "unmock";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
  async init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    await unmock({
      ignore: "story"
    });
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
