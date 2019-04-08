<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">xhr-mock example</h1>
        <p>Cuz rate limiting sucks.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-12"><router-view></router-view></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
