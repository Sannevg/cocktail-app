<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import '../src/variables';

body {
  margin: 0;
  background-color: $lightGray;
}

html,body {
    overflow-x: hidden;
}

.bg-header {
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(241, 242, 243, 1) 100%
    ),
    no-repeat center url(./assets/pexels-karolina-grabowska.jpg);
  background-size: cover;
}
.container {
  font-family: "Gill Sans", sans-serif;
  font-size: 16px;

  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1320px;
}

</style>
