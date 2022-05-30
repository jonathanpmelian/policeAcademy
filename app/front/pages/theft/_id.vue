<template>
  <TheftCardFull :theftInfo="theftInfo" />
</template>

<script>
export default {
  name: 'theftid',
  layout: 'mainUser',
  data() {
    return {
      theftInfo: [],
    }
  },
  async asyncData({ $axios, route }) {
    let { data } = await $axios.get(`/api/thefts/${route.params.id}`)

    return { theftInfo: data }
  },
}
</script>

<style lang="scss" scoped></style>
