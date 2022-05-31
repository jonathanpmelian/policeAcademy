<template>
  <v-container class="bC">
    <v-row class="justify-center fH">
      <v-col align-self="center" align="center">
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
.bC {
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  width: 100vw;
  height: 100vh;
}
.fH {
  height: 100%;
}
</style>
