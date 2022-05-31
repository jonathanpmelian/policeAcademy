<template>
  <v-container>
    <v-row>
      <v-col
        ><h2>Welcome back officer {{ this.$auth.user.surname }}! 👮</h2>
      </v-col>
    </v-row>
    <div v-if="theftInfo">
      <v-row>
        <v-col><h4>This is the information available for your case</h4></v-col>
      </v-row>
      <v-row>
        <v-col><TheftCardFull :theftInfo="theftInfo" /></v-col>
      </v-row>
      <v-row>
        <v-col align="center"
          ><v-btn class="primary" @click="markAsSolved">Solved</v-btn></v-col
        >
      </v-row>
    </div>
    <v-row v-if="!theftInfo">
      <v-col>There is no more work to do for now!</v-col>
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
  methods: {
    async markAsSolved() {
      await this.$axios.put(`/api/thefts/${this.theftInfo._id}`)
      location.reload()
    },
  },
}
</script>

<style lang="scss" scoped></style>
