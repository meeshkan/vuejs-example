import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeGlobal")
        }
      ]
    },
    {
      name: "project",
      path: "/projects/:slug",
      component: () => import("@/views/Article"),
      props: route => ({
        ...route.params,
        slug: parseInt(route.params.slug, 10)
      })
    }
  ]
});
