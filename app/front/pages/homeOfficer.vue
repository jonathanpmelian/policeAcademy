<template>
  <v-container>
    <v-row>
      <v-col><TheftCardFull :data="theft" /></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'homeOfficer',
  layout: 'mainOfficer',
  middleware({ redirect, $auth }) {
    if ($auth.user.role !== 'officer') {
      return redirect('/')
    }
  },
  data() {
    return {
      theft: this.$auth.user.caseAssigned,
    }
  },
}
</script>

<style lang="scss" scoped></style>
