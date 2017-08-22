import axios from 'axios'

let baseUrl  = '';

// 登录
export const requestLogin = params => {return axios.post(`${baseUrl}/login`, params)};


// 模板管理
export const getTemplateList = params => {return axios.get(`${baseUrl}/ali/template`, {params: params})};


// 海报管理
export const getPosterList = params => {return axios.get(`${baseUrl}/ali/poster`,  {params: params})};

export const editPoster = params => {return axios.get(`${baseUrl}/ali/poster_edit`, {params: params})};

export const delPoster = params => {return axios.get(`${baseUrl}/ali/poster_del`, {params: params})};

export const addPoster = params => {return axios.get(`${baseUrl}/ali/poster_add`, {params: params})};

export const delMultiPoster = params => {return axios.get(`${baseUrl}/ali/poster_del_multi`, {params: params})};


// 店招管理
export const getSignList = params => {return axios.get(`${baseUrl}/ali/sign`, {params: params})};

export const editSign = params => {return axios.get(`${baseUrl}/ali/sign_edit`, {params: params})};

export const delSign = params => {return axios.get(`${baseUrl}/ali/sign_del`, {params: params})};

export const delMultiSign = params => {return axios.get(`${baseUrl}/ali/sign_del_multi`, {params: params})};

export const addSign = params => {return axios.get(`${baseUrl}/ali/sign_add`, {params: params})};


// 客户案例管理
export const getUserCasesList = params => {return axios.get(`${baseUrl}/ali/usercases`, {params: params})};

export const delUserCase = params => {return axios.get(`${baseUrl}/ali/usercases_del`, {params: params})};

export const delMultiUserCase = params => {return axios.get(`${baseUrl}/ali/usercases_del_multi`, {params: params})};

export const editUserCases = params => {return axios.get(`${baseUrl}/ali/usercases_edit`, {params: params})};

export const addUserCases = params => {return axios.get(`${baseUrl}/ali/usercases_add`, {params: params})};


// 首页定制案例管理
export const getHomeCasesList = params => {return axios.get(`${baseUrl}/ali/homecases`, {params: params})};

export const delHomeCase = params => {return axios.get(`${baseUrl}/ali/homecases_del`, {params: params})};

export const delMultiHomeCase = params => {return axios.get(`${baseUrl}/ali/homecases_del_multi`, {params: params})};

export const editHomeCase = params => {return axios.get(`${baseUrl}/ali/homecases_edit`, {params: params})};

export const addHomeCase = params => {return axios.get(`${baseUrl}/ali/homecases_add`, {params: params})};



// 详情定制案例管理
export const getDetailCasesList = params => {return axios.get(`${baseUrl}/ali/homecases`, {params: params})};

export const delDetailCases = params => {return axios.get(`${baseUrl}/ali/homecases_del`, {params: params})};

export const delMultiDetailCases = params => {return axios.get(`${baseUrl}/ali/homecases_del_multi`, {params: params})};

export const editDetailCases = params => {return axios.get(`${baseUrl}/ali/homecases_edit`, {params: params})};

export const addDetailCases = params => {return axios.get(`${baseUrl}/ali/homecases_add`, {params: params})};



// 工具案例案例管理
export const getShowCasesList = params => {return axios.get(`${baseUrl}/ali/showcases`, {params: params})};

export const delShowCases = params => {return axios.get(`${baseUrl}/ali/showcases_del`, {params: params})};

export const delMultiShowCases = params => {return axios.get(`${baseUrl}/ali/showcases_del_multi`, {params: params})};

export const editShowCases = params => {return axios.get(`${baseUrl}/ali/showcases_edit`, {params: params})};

export const addShowCases = params => {return axios.get(`${baseUrl}/ali/showcases_add`, {params: params})};
