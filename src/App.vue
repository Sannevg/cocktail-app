<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App"
};
</script>

<style scoped lang="scss">
#app {
  .container {
    font-family: "Gill Sans", sans-serif;
  font-size: 16px;
  width: 100%;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

.bg {
  background: red;
  height: 30vh;
}

.top-heading {
  text-align: center;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
}
</style>
