<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.comment }}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.user.images[50]" class="comment-author-img" />
      </a>
      <div class="comment-author">{{ comment.user.display_name }}</div>
      <span class="date-posted">{{ comment.createdOn | date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RwvComment",
  props: {
    slug: { type: Number, required: true },
    comment: { type: Object, required: true }
  }
};
</script>
