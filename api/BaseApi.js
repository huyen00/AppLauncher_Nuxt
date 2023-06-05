export default class BaseApi {
    constructor(axios) {
      this._axios = axios;
    }
  
    async get(url, params = {}) {
      try {
        const { data } = await this._axios.get(url, { params });
        return data;
      } catch (e) {
        // throw e;
      }
    }
  
    async put(url, data) {
      try {
        const { response } = await this._axios.put(url, data);
        return response;
      } catch (error) {
        // throw error;
      }
    }
  
    async patch(url, data) {
      try {
        const { response } = await this._axios.patch(url, data);
        return response;
      } catch (error) {
        // throw error;
      }
    }
  
    async post(url, data) {
      try {
        const { response } = await this._axios.post(url, data);
        return response;
      } catch (error) {
        // throw error;
      }
    }
  
    async delete(url, data) {
      try {
        const { response } = await this._axios.delete(url, { data });
        return response;
      } catch (error) {
        // throw error;
      }
    }
  }