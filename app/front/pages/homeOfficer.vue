<template>
  <v-container>
    <v-row>
      <v-col><TheftCardFull :theftInfo="theftInfo" /></v-col>
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
      theftInfo: this.$auth.user.caseAssigned,
    }
  },
}
</script>

<style lang="scss" scoped></style>
