<template>
  <v-footer app>
    <v-row>
      <v-col align="center">
        <span>&copy; PoliceAcademy {{ new Date().getFullYear() }}</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped></style>
