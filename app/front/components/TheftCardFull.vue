<template>
  <v-container>
    <v-card flat class="cardSize">
      <v-row>
        <v-col>
          <v-card-title>Information</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Owner:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.owner }}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>License:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.licenseNumber }} </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Status:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.status }} </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Description:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.description }} </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Type:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.type }} </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Color:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.color }} </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Date:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.date.slice(0, 10) }} </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" align-self="center" class="ml-4">
          <h4>Assignation:</h4>
        </v-col>
        <v-col align="start">
          <v-card-text>{{ theftInfo.assignation }} </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'TheftCardFull',
  props: ['theftInfo'],
}
</script>

<style lang="scss" scoped>
.cardSize {
  width: 500px;
}
</style>
