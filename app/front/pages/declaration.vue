<template>
  <v-container>
    <v-card class="logSize">
      <v-row>
        <v-col>
          <v-card-title class="justify-center">Information</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-card-text>
            <v-form>
              <v-text-field
                label="LicenseNumber"
                v-model="licenseNumber"
                :rules="[rules.licenseNumberMatch]"
              ></v-text-field>
              <v-text-field
                label="Type"
                v-model="type"
                :rules="[rules.typeMatch]"
              ></v-text-field>
              <v-text-field
                label="Color"
                v-model="color"
                :rules="[rules.colorMatch]"
              ></v-text-field>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  width="250"
                  v-model="date"
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                label="Description"
                v-model="description"
                :rules="[rules.descriptionMatch]"
              ></v-text-field>
              <v-text-field label="Address" v-model="address"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col align="center">
                <v-btn
                  :disabled="!registerBtn"
                  class="primary"
                  @click="register"
                >
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'declaration',
  layout: 'mainUser',
  data() {
    return {
      licenseNumber: '',
      type: '',
      color: '',
      date: '',
      description: '',
      address: '',
      rules: {
        licenseNumberMatch: () => {
          return /^(\d{4})([A-Z]{3})$/.test(this.licenseNumber)
            ? true
            : 'License Format: 0000XXX'
        },
        typeMatch: () => {
          return /\b([A-ZÀ-ÿa-z][-,a-z. '\\ ]{2,13})/.test(this.type)
            ? true
            : 'Invalid type format'
        },
        colorMatch: () => {
          return /\b([A-ZÀ-ÿa-z][-,a-z. '\\ ]{2,13})/.test(this.color)
            ? true
            : 'Invalid color format'
        },
        descriptionMatch: () => {
          return /\b([A-ZÀ-ÿa-z][-,a-z. '\\ ]{2,250})/.test(this.description)
            ? true
            : 'Invalid descrption format'
        },
      },
    }
  },
  computed: {
    computedDate() {
      return new Date(this.date)
    },
    registerBtn() {
      return (
        this.rules.licenseNumberMatch() === true &&
        this.rules.typeMatch() === true &&
        this.rules.colorMatch() === true &&
        this.date !== '' &&
        this.rules.descriptionMatch() === true &&
        this.address !== ''
      )
    },
  },
  methods: {
    async register() {
      console.log(typeof this.computedDate, this.computedDate)
      await this.$axios.post(`/api/thefts`, {
        licenseNumber: this.licenseNumber,
        type: this.type.charAt(0).toUpperCase() + this.type.slice(1),
        color: this.color.charAt(0).toUpperCase() + this.color.slice(1),
        date: this.computedDate,
        description:
          this.description.charAt(0).toUpperCase() + this.description.slice(1),
        address: this.address,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.logSize {
  width: 500px;
}
</style>
