<template>
  <v-app>
    <v-main class="mx-auto align-center">
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
  background-color: var(--v-background-base, #123859) !important;
}
</style>
