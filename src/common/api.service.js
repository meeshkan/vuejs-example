import Vue from "vue";
import axios from "axios";
import mock, { proxy } from "xhr-mock";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  },

  async query(resource, params) {
    try {
      const result = await Vue.axios.get(resource, params);
      return result;
    } catch (error) {
      throw new Error(`[RWV] ApiService ${error}`);
    }
  },

  async get(resource, slug = "") {
    try {
      mock.setup();
      mock.get("https://api.github.com/repos/atom/atom/license", (_, res) => {
        return res.status(200).body({
          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz"
          }
        });
      });
      mock.use(proxy);
      const test = await axios(
        "https://api.github.com/repos/atom/atom/license"
      );
      console.log(test);
      const result = await Vue.axios.get(`${resource}/${slug}`);
      return result;
    } catch (error) {
      throw new Error(`[RWV] ApiService ${error}`);
    }
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const TagsService = {
  get() {
    return ApiService.get("tags");
  }
};

export const ArticlesService = {
  query(type, params) {
    return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("articles", slug);
  },
  create(params) {
    return ApiService.post("articles", { article: params });
  },
  update(slug, params) {
    return ApiService.update("articles", slug, { article: params });
  },
  destroy(slug) {
    return ApiService.delete(`articles/${slug}`);
  }
};

export const CommentsService = {
  get(slug) {
    if (typeof slug !== "string") {
      throw new Error(
        "[RWV] CommentsService.get() article slug required to fetch comments"
      );
    }
    return ApiService.get("articles", `${slug}/comments`);
  },

  post(slug, payload) {
    return ApiService.post(`articles/${slug}/comments`, {
      comment: { body: payload }
    });
  },

  destroy(slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`);
  }
};

export const FavoriteService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/favorite`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/favorite`);
  }
};
