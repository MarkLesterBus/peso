<template>
  <v-container fluid>
    <v-card class="mx-auto my-5" outlined flat>
      <v-toolbar flat color="grey lighten-3">
        Add Company Information
        <v-spacer></v-spacer>
        <v-btn icon @click="company_info_show = !company_info_show">
          <v-icon>{{
            company_info_show ? 'mdi-close' : 'mdi-plus'
          }}</v-icon></v-btn
        >
      </v-toolbar>
      <v-card-text v-if="company_info_show">
        <label for="" class="font-weight-semibold">
          Company Name
          <v-text-field
            v-model="name"
            dense
            outlined
            placeholder="ex. Company Ltd."
          ></v-text-field>
        </label>

        <v-row dense>
          <v-col>
            <label for="" class="font-weight-semibold">
              Industry
              <v-select
                v-model="industry_id"
                :items="industries"
                item-text="industry"
                item-value="id"
                outlined
                dense
                placeholder="Select Industry"
              ></v-select>
            </label>
          </v-col>
          <v-col>
            <label for="" class="font-weight-semibold">
              Company Size
              <v-combobox
                v-model="size"
                :items="company_size"
                dense
                outlined
              ></v-combobox>
            </label>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <label for="" class="font-weight-semibold">
              Country
              <v-select
                v-model="country_id"
                :items="countries"
                item-text="name"
                item-value="id"
                outlined
                dense
                placeholder="Select Industry"
              ></v-select>
            </label>
          </v-col>
          <v-col>
            <label for="" class="font-weight-semibold">
              State
              <v-text-field v-model="state" dense outlined></v-text-field>
            </label>
          </v-col>
          <v-col>
            <label for="" class="font-weight-semibold">
              City
              <v-text-field v-model="city" dense outlined></v-text-field>
            </label>
          </v-col>
        </v-row>
        <label for="" class="font-weight-semibold">
          Address
          <v-textarea
            v-model="address"
            dense
            outlined
            placeholder="Street name/ Barangay/ Landmark"
          ></v-textarea>
        </label>
        <label for="" class="font-weight-semibold">
          Contanct No.
          <v-text-field v-model="contact_no" dense outlined></v-text-field>
        </label>
        <CustomEditor v-model="details" />
      </v-card-text>
      <v-card-actions v-if="company_info_show">
        <v-btn @click="submit()" text large color="primary">
          <v-icon class="mr-2">mdi-floppy</v-icon> Save Company
          Information</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  useFetch,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import CustomEditor from '../../components/custom-editor.vue'
export default {
  layout: 'main',
  setup() {
    const company_info_show = ref(false)
    const company_details_show = ref(false)
    const company_info = reactive({
      name: '',
      industry_id: '',
      size: '',
      country_id: '',
      state: '',
      city: '',
      address: '',
      contact_no: '',
      details: 'About the company',
    })

    const company_size = reactive([
      '0 - 1 Employees',
      '2 - 10 Employees',
      '11 - 50 Employees',
      '51 - 200 Employees',
      '201 - 500 Employees',
      '501 - 1000 Employees',
      '1001 - 5000 Employees',
      '5001 - 10,000 Employees',
      '10,000+ Employees',
    ])
    const store = useStore()

    const { fetch, fetchState } = useFetch(async () => {
      await store.dispatch('resources/fetchIndustries')
      await store.dispatch('resources/fetchCountries')
    })

    const industries = computed(() => store.state.resources.industries)
    const countries = computed(() => store.state.resources.countries)

    function submit() {
      store.dispatch('companies/storeCompany', {
        name: company_info.name,
        size: company_info.size,
        state: company_info.state,
        city: company_info.city,
        address: company_info.address,
        contact_no: company_info.contact_no,
        details: company_info.details,
        country_id: company_info.country_id,
        industry_id: company_info.industry_id,
        enployer_id: store.state.auth.user.id,
      })
    }
    return {
      company_size,
      industries,
      countries,
      ...toRefs(company_info),
      company_info_show,
      company_details_show,
      submit,
    }
  },
  components: { CustomEditor },
}
</script>
