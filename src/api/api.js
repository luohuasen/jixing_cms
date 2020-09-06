import axios from 'axios';

let base = 'http://www.jixing.com:8081/';
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
export const findConfig = params => { return axios.get(`${base}/config/find`, { params: params }); };

// 用户
export const getUserListPage = params => { return axios.get(`${base}/user/all`, { params: params }); };
export const updateUser = params => { return axios.post(`${base}/user/update`, params); };
export const addUser = params => { return axios.post(`${base}/user/add`, params); };
export const deleteUser = params => { return axios.get(`${base}/user/delete`, { params: params }); };
export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };

// 行业知识
export const getIndustryListPage = params => { return axios.get(`${base}/industryInfo/all`, { params: params }); };
export const updateIndustry = params => { return axios.post(`${base}/industryInfo/update`, params); };
export const addIndustry = params => { return axios.post(`${base}/industryInfo/add`, params); };
export const deleteIndustry = params => { return axios.get(`${base}/industryInfo/delete`, { params: params }); };
// 留言
export const getLeaveWordListPage = params => { return axios.get(`${base}/leaveWord/all`, { params: params }); };
export const updateLeaveWord = params => { return axios.post(`${base}/leaveWord/update`, params); };
export const addLeaveWord = params => { return axios.post(`${base}/leaveWord/add`, params); };
export const deleteLeaveWord = params => { return axios.get(`${base}/leaveWord/delete`, { params: params }); };
export const findLeaveWord = params => { return axios.get(`${base}/leaveWord/find`, { params: params }); };
//一级分类
export const getCatagoryListPage = params => { return axios.get(`${base}/catagory/all`, { params: params }); };
export const updateCatagory = params => { return axios.post(`${base}/catagory/update`, params); };
export const addCatagory = params => { return axios.post(`${base}/catagory/add`, params); };
export const deleteCatagory = params => { return axios.get(`${base}/catagory/delete`, { params: params }); };
export const findCatagory = params => { return axios.get(`${base}/catagory/find`, { params: params }); };

//二级分类
export const getSubCatagoryListPage = params => { return axios.get(`${base}/subCatagory/all`, { params: params }); };
export const updateSubCatagory = params => { return axios.post(`${base}/subCatagory/update`, params); };
export const addSubCatagory = params => { return axios.post(`${base}/subCatagory/add`, params); };
export const deleteSubCatagory = params => { return axios.get(`${base}/subCatagory/delete`, { params: params }); };
export const findSubCatagory = params => { return axios.get(`${base}/subCatagory/find`, { params: params }); };

//产品管理
export const getProductInfoListPage = params => { return axios.get(`${base}/productInfo/all`, { params: params }); };
export const updateProductInfo = params => { return axios.post(`${base}/productInfo/update`, params); };
export const addProductInfo = params => { return axios.post(`${base}/productInfo/add`, params); };
export const deleteProductInfo = params => { return axios.get(`${base}/productInfo/delete`, { params: params }); };
export const findProductInfo = params => { return axios.get(`${base}/productInfo/find`, { params: params }); };
export const getRelatedListProductInfoListPage = params => { return axios.get(`${base}/productInfo/relatedList`, { params: params }); };
export const getUnRelatedListProductInfoListPage = params => { return axios.get(`${base}/productInfo/unRelatedList`, { params: params }); };

//产品分类管理
export const addProductCatagory = params => { return axios.post(`${base}/productCatagory/add`, params); };
export const deleteProductCatagory = params => { return axios.post(`${base}/productCatagory/delete`, params); };
