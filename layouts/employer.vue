<template>
  <v-app dark>
    <custom-appbar title="PESO"> </custom-appbar>
    <custom-drawer :items="employer"></custom-drawer>
    <v-main>
      <v-container fluid fill-height>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import customAppbar from '~/components/custom-appbar.vue'
import CustomDrawer from '~/components/custom-drawer.vue'
import employer from '@/components/employer'
export default {
  components: { customAppbar, CustomDrawer },
  name: 'EmployertLayout',
  setup() {
    return { employer }
  },
}
</script>
