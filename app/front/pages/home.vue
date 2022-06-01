<template>
  <v-container>
    <v-row>
      <v-col class=""
        ><h2>
          Welcome {{ this.$auth.user.name }} {{ this.$auth.user.surname }}! 👋
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
  middleware({ redirect, $auth }) {
    if ($auth.user.role === 'officer') {
      return redirect('/officer')
    }
  },
  data() {
    return {
      cases: [],
    }
  },
  async asyncData({ $axios }) {
    const info = await $axios.get(`/api/thefts`)
    return { cases: info.data }
  },
}
</script>

<style lang="scss" scoped></style>
