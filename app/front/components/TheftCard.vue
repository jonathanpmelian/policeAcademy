<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col
          ><v-card-title>{{ data.licenseNumber }}</v-card-title></v-col
        >
      </v-row>
      <v-row>
        <v-col>
          <v-card-text>status: {{ data.owner }}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-text>status: {{ data.status }}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-text>type: {{ data.type }}</v-card-text>
        </v-col>
        <v-col>
          <v-card-text>color: {{ data.color }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
    {{ data }}
  </v-container>
</template>

<script>
export default {
  name: 'UserTheftCard',
  props: ['data'],
}
</script>

<style lang="scss" scoped></style>
