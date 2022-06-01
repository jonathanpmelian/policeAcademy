<template>
  <v-app>
    <v-main class="mx-auto align-center bC">
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss">
.theme--light.v-application {
  background-color: var(--v-background-base, #fbfcfd) !important;
}
.bC {
  width: 100vw;
  height: 100%;
}
</style>
