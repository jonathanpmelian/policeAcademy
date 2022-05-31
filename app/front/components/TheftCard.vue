<template>
  <v-container>
    <v-card flat class="cardSize">
      <v-row>
        <v-col cols="6"
          ><v-card-title>{{ data.licenseNumber }}</v-card-title></v-col
        >
        <v-col align-self="center" align="end" class="mr-5">
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
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col
          align-self="center"
          align="center"
          class="mt-2"
          v-if="this.$route.name === 'search'"
        >
          {{ data.assignation.department.name }}
        </v-col>
        <v-col align-self="center" align="center" class="mt-2" v-else>
          <v-btn class="mb-2" color="primary" text @click="showTheft"
            >View</v-btn
          >
        </v-col>
      </v-row>
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
