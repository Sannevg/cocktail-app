<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
$primary: #eabc2a;
$secondary: #000;
$lightGray: #f1f2f3;
$darkGray: #222222;

$gutter-x: 3rem;

body {
  margin: 0;
  background-color: $lightGray;
}

.bg-header {
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(241, 242, 243, 1) 100%
    ),
    no-repeat center url(./assets/pexels-karolina-grabowska.jpg);
  background-size: cover;
  height: 60vh;
}
.container {
  font-family: "Gill Sans", sans-serif;
  font-size: 16px;
  width: 100%;
  padding-right: calc(var(--gutter-x) * .5);
  padding-left: calc(var(--gutter-x) * .5);
  margin-right: auto;
  margin-left: auto;
  max-width: 1320px;

  // @media screen and (min-width: 1400px) {
  //   max-width: 1320px;
  // }
  // @media screen and (min-width: 992px) {
  //   max-width: 960px;
  // }
  // @media screen and (min-width: 576px) {
  //   max-width: 540px;
  // }
}

.ca-gutter {
  --gutter-x: 3rem;
}

</style>
