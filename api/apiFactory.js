import DevApi from "../api/devApi";

const apiFactory =({ $axios})=> {
  return {
    example: new DevApi($axios),
  } 
};



export default  apiFactory ;