<template>
  <v-container>
    <v-row>
      <v-col>
        <Login v-if="loginValue" />
        <SignUp v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'index',
  layout: 'default',
  data() {
    return {}
  },
  computed: {
    loginValue() {
      return this.$store.state.loginFormActive
    },
  },
}
</script>

<style lang="scss">
.logSize {
  width: 500px;
}
</style>
