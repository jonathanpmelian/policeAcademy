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
        <h4>This is the current status of your declarations</h4>
      </v-col>
    </v-row>
    <v-row v-for="(data, i) in cases" :key="i">
      <TheftCard :data="data" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  layout: 'mainUser',
  data() {
    return {
      cases: this.$auth.user.thefts,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
