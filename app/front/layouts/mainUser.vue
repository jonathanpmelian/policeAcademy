<template>
  <v-app>
    <AppBar />
    <v-main class="mx-auto align-center">
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'mainLayout',
}
</script>

<style lang="scss" scoped></style>
