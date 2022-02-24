import CompanyService from '~/services/CompanyService'
export const namespaced = true
export const state = () => ({
  companies: [], // companies Object
  company: {
    id: '',
    name: '',
    size: '',
    state: '',
    city: '',
    address: '',
    contact_no: '',
    details: '',
    country_id: '',
    industry_id: '',
    employer_id: '',
  }, // company Object
})

export const mutations = {
  SET_COMPANIES(state, payload) {
    state.companies = payload
  },

  SET_COMPANY(state, payload) {
    state.company = payload
  },

  STORE_COMPANY(state, payload) {
    state.companies.push(payload)
  },
  REMOVE_COMPANY(state, payload) {
    state.companies = state.companies.filter(
      (company) => company.id !== payload
    )
  },
}

export const actions = {
  fetchCompanies({ commit, dispatch }) {
    return CompanyService.companies()
      .then((rs) => {
        commit('SET_COMPANIES', rs.data)
      })
      .catch(() => {
        dispatch(
          'alerts/storeAlert',
          {
            message: 'Unable to fetch companies, please try again.',
            status: 'error',
            visible: true,
          },
          { root: true }
        )
      })
  },
  fetchCompany({ commit, dispatch }, payload) {
    return CompanyService.company(payload)
      .then((rs) => {
        commit('SET_COMPANY', rs.data)
      })
      .catch((er) => {
        dispatch(
          'alerts/storeAlert',
          {
            color: 'red',
            message: 'Unable to fetch specific companies, please try again.',
            status: 'Error',

            visible: true,
          },
          { root: true }
        )
      })
  },
  storeCompany({ commit, getters, dispatch }, payload) {
    if (!getters.getExisitingCompany(payload.name)) {
      return CompanyService.save(payload)
        .then((rs) => {
          commit('STORE_COMPANY', rs.data)
          commit('SET_COMPANY', rs.data)

          dispatch(
            'alerts/storeAlert',
            {
              color: 'green',
              message: 'company ' + rs.data.name + ', successfuly created.',

              visible: true,
            },
            { root: true }
          )
        })
        .catch((er) => {
          console.log(er.message)
          dispatch(
            'alerts/storeAlert',
            {
              color: 'red',
              message: 'Unable to create new company, please try again.',
              status: 'Error',

              visible: true,
            },
            { root: true }
          )
        })
    } else {
      dispatch(
        'alerts/storeAlert',
        {
          color: 'red',
          message:
            'Unable to create new company, Company email was already taken.',
          status: 'Error',

          visible: true,
        },
        { root: true }
      )
    }
  },
  updateCompany({ commit, dispatch }, payload) {
    return CompanyService.update(payload)
      .then((rs) => {
        commit('SET_COMPANY', rs.data)
        dispatch(
          'alerts/storeAlert',
          {
            color: 'green',
            message: 'Company ' + rs.data.name + ', successfuly updated.',

            visible: true,
          },
          { root: true }
        )
      })
      .catch((er) => {
        dispatch(
          'alerts/storeAlert',
          {
            color: 'red',
            message: 'Unable to update company, please try again.',
            status: 'Error',

            visible: true,
          },
          { root: true }
        )
      })
  },
  removeCompany({ commit, dispatch }, payload) {
    return CompanyService.remove(payload)
      .then((rs) => {
        commit('REMOVE_COMPANY', rs.data)
        dispatch(
          'alerts/storeAlert',
          {
            color: 'green',
            message: 'Company ' + rs.data.name + ', successfuly deleted.',
            visible: true,
          },
          { root: true }
        )
      })
      .catch((er) => {
        dispatch(
          'alerts/storeAlert',
          {
            color: 'green',
            message: 'Company ' + rs.data.name + ', successfuly deleted.',
            visible: true,
          },
          { root: true }
        )
      })
  },
  uploadLogo({ commit, dispatch }, payload) {
    return CompanyService.upload(payload).then((rs) => {
      commit('SET_COMPANY', rs.data)
      dispatch(
        'alerts/storeAlert',
        {
          color: 'green',
          message: 'Company ' + rs.data.name + ', logo successfuly uploaded.',
          visible: true,
        },
        { root: true }
      )
    })
  },
}

export const getters = {
  getExisitingCompany: (state) => (payload) => {
    return state.companies.find((company) => company.name === payload)
  },
}
