<template>
  <v-container>
    <v-card flat class="cardSize">
      <v-row>
        <v-col cols="7"
          ><v-card-title>{{ data.licenseNumber }}</v-card-title></v-col
        >
        <v-col align-self="center" align="end" class="mr-5">
          <v-btn class="mb-2" color="primary" text @click="showTheft"
            >View</v-btn
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-chip
        class="ma-2 white--text"
        label
        :color="
          data.status === 'solved'
            ? 'green'
            : data.status === 'assigned'
            ? 'orange'
            : 'brown'
        "
        >{{ data.status }}</v-chip
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'TheftCard',
  props: ['data'],
  methods: {
    showTheft() {
      this.$router.replace(`/theft/${this.data._id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.cardSize {
  width: 400px;
}
</style>
