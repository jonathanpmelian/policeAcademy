<template>
  <v-container>
    <v-row>
      <v-col>This is the search view</v-col>
    </v-row>
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

<style lang="scss" scoped></style>
