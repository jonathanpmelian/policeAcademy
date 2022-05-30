<template>
  <v-container>
    <v-card class="logSize">
      <v-row>
        <v-col>
          <v-card-title class="justify-center">Register</v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Name"
                v-model="name"
                :rules="[rules.nameMatch]"
                prepend-icon="mdi-account"
                clearable
              ></v-text-field>

              <v-text-field
                label="Surname"
                v-model="surname"
                :rules="[rules.surnameMatch]"
                prepend-icon="mdi-account"
                clearable
              ></v-text-field>

              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.emailMatch]"
                prepend-icon="mdi-email-outline"
                clearable
              ></v-text-field>

              <v-text-field
                :type="pass.visible ? 'text' : 'password'"
                label="Password"
                v-model="pass.password"
                prepend-icon="mdi-lock-outline"
                :append-icon="
                  pass.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="pass.visible = !pass.visible"
              ></v-text-field>

              <v-text-field
                :type="pass.visible ? 'text' : 'password'"
                label="Password"
                v-model="pass.confirm"
                prepend-icon="mdi-lock-outline"
                :append-icon="
                  pass.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                :rules="[rules.passwordMatch]"
                @click:append="pass.visible = !pass.visible"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-subtitle class="text-center"
            >Are you already registered?
            <a @click="switchForm">Login</a>
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn
              :disabled="!signBtn"
              color="primary"
              class="mx-auto"
              @click="signUp"
              >Sign Up</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      pass: {
        password: '',
        confirm: '',
        visible: false,
      },
      rules: {
        nameMatch: () => {
          return /\b([A-ZÀ-ÿa-z][-,a-z. '\\ ]{1,13})/.test(this.name)
            ? true
            : 'Invalid name format'
        },
        surnameMatch: () => {
          return /\b([A-ZÀ-ÿa-z][-,a-z. '\\ ]{1,13})/.test(this.surname)
            ? true
            : 'Invalid surname format'
        },
        emailMatch: () => {
          return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)
            ? true
            : 'Invalid email format'
        },
        passwordMatch: () => {
          return this.pass.password === this.pass.confirm
            ? true
            : "Password you entered don't match"
        },
      },
      error: null,
    }
  },
  computed: {
    signBtn() {
      if (this.pass.password !== '' || this.pass.confirm !== '') {
        return (
          this.rules.passwordMatch() === true &&
          this.rules.emailMatch() === true &&
          this.name !== '' &&
          this.surname !== ''
        )
      } else {
        return false
      }
    },
  },
  methods: {
    switchForm: function (e) {
      this.$store.dispatch('switchForm', e)
    },
    async signUp() {
      try {
        await this.$axios.post('/api/auth/signup', {
          name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
          surname: this.surname.charAt(0).toUpperCase() + this.surname.slice(1),
          email: this.email,
          password: this.pass.password,
        })

        let data = {
          email: this.email,
          password: this.pass.password,
        }

        await this.$store.dispatch('login', data)
      } catch (err) {
        this.error = err.response.data.message
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
