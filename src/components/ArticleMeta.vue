<template>
  <div class="article-meta">
    <img :src="project.owners[0].images[50]" />
    <div class="info">
      <b>{{ project.owners[0].first_name }}</b
      ><br />
      <span class="date">{{ project.modified_on | date }}</span>
    </div>
    <img
      class="pull-xs-right"
      style="height:auto;width:auto;border-radius:0px"
      :src="project.covers[115]"
    />
  </div>
</template>

<script>
export default {
  name: "RwvArticleMeta",
  props: {
    project: {
      type: Object,
      required: true
    }
  }
};
</script>
