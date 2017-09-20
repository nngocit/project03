import { STORAGE } from './storage';
import { AppSetting } from './../appsettings/index';
import axios, { AxiosInstance } from 'axios';
import { Container } from "aurelia-dependency-injection";
import Qs from 'qs';
let storage = Container.instance.get(STORAGE);
axios.defaults.baseURL = AppSetting.apiEndPoint;

axios.defaults.paramsSerializer = function (params) {
    return Qs.stringify(params)
}
storage.get(STORAGE.tokenKey) ? axios.defaults.headers.common['Authorization'] = storage.get(STORAGE.tokenKey) : null

let comment = axios.create({
  baseURL: AppSetting.apiEndPointComment
});