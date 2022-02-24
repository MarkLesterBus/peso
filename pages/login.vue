<template>
  <v-container>
    <v-row style="height: 500px" align="center" justify="center">
      <v-card width="400" class="mt-5">
        <v-row no-gutters justify="center" class="my-3">
          <v-col cols="2" align="center">
            <v-img
              class="my-4 mx-4"
              width="60"
              height="60"
              src="http://cabadbaranadn.gov.ph/cbr/wp-content/uploads/2019/06/City-seal-for-letterhead-296x300.png"
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-card-title class="text-h4 font-weight-bold">PESO</v-card-title>
            <v-card-subtitle class="font-weight-light"
              >Online Job Portal and Employment Facilitation
              System</v-card-subtitle
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card flat class="mx-auto my-6" width="350">
          <label for="" class="font-weight-semibold">
            Email
            <v-text-field
              v-model="email"
              type="email"
              dense
              outlined
            ></v-text-field>
          </label>
          <label for="" class="font-weight-semibold">
            Password
            <v-text-field
              v-model="password"
              type="password"
              dense
              outlined
            ></v-text-field>
          </label>
          <v-row dense align="center" justify="center">
            <v-checkbox
              class="my-0"
              dense
              hide-details
              label="Keep me logged in"
            />
            <v-spacer />
            <a href="#">Forgot password</a>
          </v-row>
          <v-btn block dark color="orange" class="my-5" @click="authenticate()">
            <v-icon class="mr-3">mdi-key</v-icon>
            Sign In
          </v-btn>
        </v-card>
      </v-card>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      show: false,
      email: '',
      password: '',
      overlay: false,
    }
  },

  computed: {},
  methods: {
    messageAlert(status, color, message) {
      this.$store.dispatch(
        'alerts/storeAlert',
        {
          color: color,
          message: message,
          status: status,
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    },
    async authenticate() {
      this.overlay = true
      await this.$auth
        .loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((rs) => {
          this.messageAlert(
            'SUCCESS',
            'success',
            'Login success, ' + 'Welcome ' + this.$auth.user.fname
          )
          this.$router.push('/')
        })

        .catch((err) => {
          this.messageAlert('ERROR', 'error', err.message)
        })
      this.overlay = false
    },
  },
}
</script>
