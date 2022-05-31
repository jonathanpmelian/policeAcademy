<template>
  <v-container class="cardSize">
    <v-row>
      <v-col align="center">
        <v-text-field
          class="searchWidth"
          background-color="white"
          filled
          rounded
          dense
          clearable
          full-width
          :value="searchPost"
          label="Search"
          :placeholder="`Search By ${picked}`"
          @input="handleSearchPost"
      /></v-col>
    </v-row>
    <v-row class="my-4">
      <v-col align="end">
        <v-chip>Solved</v-chip>
      </v-col>
      <v-col align="center">
        <v-chip>Assigned</v-chip>
      </v-col>
      <v-col align="start">
        <v-chip>Pending</v-chip>
      </v-col>
    </v-row>
    <v-card flat>
      <v-row>
        <v-col>This is the search view</v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'search',
  layout: 'mainOfficer',
  middleware({ redirect, $auth }) {
    if ($auth.user.role !== 'officer') {
      return redirect('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.cardSize {
  width: 60vw;
}
.searchWidth {
  width: 60vw;
}
</style>
