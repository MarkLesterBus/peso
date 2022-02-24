<template>
  <v-app-bar flat color="white" fixed app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title v-text="title" />

    <v-spacer></v-spacer>
    <v-btn
      to="/employer/dashboard"
      color="orange"
      dark
      class="elevation-0"
      v-if="loggedIn"
      >Post a Job</v-btn
    >
    <v-divider vertical inset class="mx-3"></v-divider>
    <v-btn v-if="loggedIn" icon><v-icon>mdi-bell</v-icon></v-btn>
    <v-menu v-if="loggedIn" v-model="menu" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs">
          <v-avatar size="35">
            <v-img
              :src="'https://via.placeholder.com/150?text=512x512'"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card width="300">
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="'https://via.placeholder.com/150?text=512x512'"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.fname }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              <v-list-item-subtitle class="text-caption"
                >{{ user.role }},
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group router>
            <v-list-item :to="'/admin/users/' + user.id">
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Edit Profile</v-list-item-title>
            </v-list-item>
            <v-list-item :to="user.redirect">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-divider></v-divider>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <div v-else>
      <v-spacer />
      <v-btn text color="orange" to="/employer/sign-up"> Post a Job</v-btn>
      <v-btn text color="orange" to="/worker/sign-up"> Sign Up</v-btn>
      <v-btn text color="orange" to="/login"> Login</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  computed,
  useStore,
} from '@nuxtjs/composition-api'
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    items: Object,
    default: {},
  },
  setup() {
    const menu = ref(false)
    const store = useStore()
    const appBar = computed(() => store.state.system.appBar)
    const sideBar = computed(() => store.state.system.sideBar)
    const user = computed(() => store.state.auth.user)
    const loggedIn = computed(() => store.state.auth.loggedIn)

    const drawer = computed({
      get: () => sideBar.value.drawer,
      set: (value) => store.commit('system/SET_DRAWER', value),
    })
    return { appBar, user, drawer, loggedIn, menu }
  },
}
</script>
