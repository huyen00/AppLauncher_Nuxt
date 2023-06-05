import BaseApi from './BaseApi';

export default class DevApi extends BaseApi {
  getExample(params) {
    return this.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json', params);
  }
};