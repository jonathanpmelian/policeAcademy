<template>
  <v-container>
    <v-card class="logSize">
      <v-row>
        <v-col>
          <v-card-title class="justify-center">Login</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.emailMatch]"
                prepend-icon="mdi-email-outline"
                clearable
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :type="passVisible ? 'text' : 'Password'"
                prepend-icon="mdi-lock-outline"
                :append-icon="
                  passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="passVisible = !passVisible"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-subtitle class="text-center"
            >Don't you have an account yet?
            <a @click="switchForm">Register now</a>
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn
              :disabled="!logBtn"
              color="primary"
              class="mx-auto"
              @click="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      passVisible: false,
      rules: {
        emailMatch: () => {
          return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)
            ? true
            : 'Invalid email format'
        },
      },
    }
  },
  computed: {
    logBtn() {
      return this.password !== '' && this.email !== ''
    },
  },
  methods: {
    switchForm: function (e) {
      this.$store.dispatch('switchForm', e)
    },
    async login() {
      let data = {
        email: this.email,
        password: this.password,
      }
      await this.$store.dispatch('login', data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
