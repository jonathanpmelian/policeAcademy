<template>
  <v-container class="bSize" align="center">
    <v-row>
      <v-col align="center">
        <v-text-field
          class="searchWidth"
          background-color="white"
          filled
          dense
          clearable
          full-width
          :value="searchTheft"
          label="Search"
          placeholder="Search By License"
          @input="handleSearchTheft"
      /></v-col>
    </v-row>
    <v-row class="mb-4 mx-4">
      <v-col align="end">
        <v-btn
          color="green"
          class="white--text btnWidth"
          @click="handleStatusFilter('solved')"
          >Solved</v-btn
        >
      </v-col>
      <v-col align="center">
        <v-btn
          color="orange"
          class="white--text btnWidth"
          @click="handleStatusFilter('assigned')"
          >Assigned</v-btn
        >
      </v-col>
      <v-col align="start">
        <v-btn
          color="brown"
          class="white--text btnWidth"
          @click="handleStatusFilter('pending')"
          >Pending</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-card
          class="cardSize"
          flat
          v-for="(theft, i) in filteredThefts"
          :key="i"
        >
          <v-row>
            <v-col>
              <TheftCard :data="theft" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { debounce } from '~/helpers/index'
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  layout: 'mainOfficer',
  middleware({ redirect, $auth }) {
    if ($auth.user.role !== 'officer') {
      return redirect('/')
    }
  },
  computed: {
    searchTheft() {
      return this.$store.state.thefts.filter.search
    },
    ...mapGetters({
      thefts: 'thefts/getThefts',
      filteredThefts: 'thefts/getFilteredThefts',
    }),
    status() {
      return this.$store.state.thefts.filter.status
    },
  },
  methods: {
    handleSearchTheft: debounce(function (e) {
      this.$store.dispatch('thefts/filterSearch', e)
    }, 500),
    handleStatusFilter(status) {
      this.$store.dispatch('thefts/filterStatus', status)
    },
  },
  async fetch({ store }) {
    await store.dispatch('thefts/fetchAllThefts')
  },
  mounted() {
    if (!this.thefts.length) {
      this.$store.dispatch('thefts/fetchAllThefts')
    }
  },
}
</script>

<style lang="scss" scoped>
.bSize {
  width: 100vw;
  height: 100vh;
}
.searchWidth {
  width: 600px;
}
.cardSize {
  width: 600px;
}
.btnWidth {
  width: 100px;
}
</style>
