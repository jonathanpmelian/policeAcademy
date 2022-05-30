<template>
  <v-container>
    <v-row>
      <v-col class=""
        ><h2>
          Welcome {{ this.$auth.user.name }} {{ this.$auth.user.surname }}!
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ this.$auth.user }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  layout: 'main',
  methods: {},
}
</script>

<style lang="scss" scoped></style>
