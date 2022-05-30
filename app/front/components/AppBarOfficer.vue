<template>
  <v-app-bar dense app class="secondary">
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar-title class="white--text"
            ><NuxtLink class="linkDeco" to="/home"
              >Police</NuxtLink
            ></v-toolbar-title
          >
        </v-col>
        <v-col class="white--text" align="end" align-self="center">
          <NuxtLink class="linkDeco" to="/search">
            Search<v-icon color="white" small class="ml-3"
              >mdi-magnify</v-icon
            ></NuxtLink
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
}
</script>

<style lang="scss" scoped>
.linkDeco {
  text-decoration: none;
  color: inherit;
}
</style>
