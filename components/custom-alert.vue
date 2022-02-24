<template>
  <v-snackbar
    v-model="alert.visible"
    :timeout="alert.timeout"
    :color="alert.color"
    right
    text
    bottom
  >
    <div align="start">
      <v-icon medium :color="alert.color" class="mr-2">mdi-cogs</v-icon>
      <span class="font-weight-normal subtitle-1">SYSTEM</span>
      <p class="pt-3">
        <span class="font-weight-light caption"> {{ alert.message }}</span>
      </p>
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="closeAlert(false)">
        <v-icon :color="alert.color">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
export default {
  setup() {
    const store = useStore()
    const alert = computed(() => {
      return store.state.alerts.alert
    })
    function closeAlert(payload) {
      store.commit('alerts/REMOVE_ALERT', payload)
    }

    return { alert, closeAlert }
  },
}
</script>
