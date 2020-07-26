import axios from 'axios';

let base = 'http://www.jixing.com/';
// let base = 'http://106.52.26.157/';

// 案例
export const getWorkListPage = params => { return axios.get(`${base}/work/all`, { params: params }); };
export const updateWork = params => { return axios.post(`${base}/work/update`, params); };
export const addWork = params => { return axios.post(`${base}/work/add`, params); };
export const deleteWork = params => { return axios.get(`${base}/work/delete`, { params: params }); };


// 服务
export const getServiceListPage = params => { return axios.get(`${base}/service/all`, { params: params }); };
export const updateService = params => { return axios.post(`${base}/service/update`, params); };
export const addService = params => { return axios.post(`${base}/service/add`, params); };
export const deleteService = params => { return axios.get(`${base}/service/delete`, { params: params }); };


// 产品
export const getProductListPage = params => { return axios.get(`${base}/product/all`, { params: params }); };
export const updateProduct = params => { return axios.post(`${base}/product/update`, params); };
export const addProduct = params => { return axios.post(`${base}/product/add`, params); };
export const deleteProduct = params => { return axios.get(`${base}/product/delete`, { params: params }); };

// banner图
export const getBannerListPage = params => { return axios.get(`${base}/banner/all`, { params: params }); };
export const updateBanner = params => { return axios.post(`${base}/banner/update`, params); };
export const addBanner = params => { return axios.post(`${base}/banner/add`, params); };
export const deleteBanner = params => { return axios.get(`${base}/banner/delete`, { params: params }); };

// 配置
export const getConfigListPage = params => { return axios.get(`${base}/config/all`, { params: params }); };
export const updateConfig = params => { return axios.post(`${base}/config/update`, params); };
export const addConfig = params => { return axios.post(`${base}/config/add`, params); };
export const deleteConfig = params => { return axios.get(`${base}/config/delete`, { params: params }); };

// 用户
export const getUserListPage = params => { return axios.get(`${base}/user/all`, { params: params }); };
export const updateUser = params => { return axios.post(`${base}/user/update`, params); };
export const addUser = params => { return axios.post(`${base}/user/add`, params); };
export const deleteUser = params => { return axios.get(`${base}/user/delete`, { params: params }); };
export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };
