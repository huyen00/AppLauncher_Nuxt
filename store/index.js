import api from "../plugins/api"
export const state = () => ({
   dashboard: null,
  })
  
  export const getters = {
   
  }
  
  export const mutations = {


  }
  
  export const actions = {

    async getData({ commit }, params) {
      try {
        const data = await api.example.getExample(params)
        commit('setTestData', data);
      } catch (error) {
       
      }
    }
  //   getDashboard: ({ commit }) => {
  //     return ApiService.query(`api/v1/dashboard`).then((response) => {
  //           if (response.status == 200) {
  //               commit('getDashboard', response.data)
               
  //           }
  // },
    
  }