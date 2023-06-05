
// import DevApi from '../api/devApi';
import apiFactory from "../api/apiFactory";
export default function({$axios}, inject){
  const api = apiFactory($axios)
  inject('api', api)
}