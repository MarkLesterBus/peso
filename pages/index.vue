<template>
  <v-container>
    <custom-appbar title="PESO"> </custom-appbar>
  </v-container>
</template>

<script>
import customAppbar from '~/components/custom-appbar.vue'
export default {
  components: { customAppbar },
  name: 'IndexPage',
  setup() {
    return {}
  },
}
</script>
