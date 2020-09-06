import Login    from './views/Login.vue'
import NotFound from './views/404.vue'
import Home     from './views/Home.vue'
import Banner   from './views/biz/Banner.vue'
import Config   from './views/biz/Config.vue'
import Product  from './views/biz/Product.vue'
import Service  from './views/biz/Service.vue'
import Work     from './views/biz/Work.vue'
import User     from './views/biz/User.vue'
import AboutJiXingEdit from "./views/about/AboutJiXingEdit";
import AboutServiceEdit from "./views/service/AboutServiceEdit";
import IndustryInfo from "./views/industry/IndustryInfo";
import ContactInformation from "./views/contact/ContactInformation";
import LeaveWordList from "./views/contact/LeaveWordList";

import Catagory from "./views/product/Catagory";
import ProductCatagory from "./views/product/ProductCatagory";
import ProductInfo from "./views/product/ProductInfo";
import SubCatagory from "./views/product/SubCatagory";

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '网站首页',
        iconCls: 'el-icon-s-home',
        children: [
            { path: '/banner', component: Banner, name: 'banner图片' },
            { path: '/config', component: Config, name: '通用配置' },
            { path: '/product', component: Product, name: '吉星产品' },
            { path: '/service', component: Service, name: '我们的服务' },
            { path: '/work', component: Work, name: '制作案例' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '关于吉星',
        iconCls: 'el-icon-info',
        children: [
            { path: '/aboutJiXingEdit', component: AboutJiXingEdit, name: '关于吉星' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '产品管理',
        iconCls: 'el-icon-goods',
        children: [
            { path: '/catagory', component: Catagory, name: '一级分类管理' },
            { path: '/subCatagory', component: SubCatagory, name: '二级分类管理' },
            { path: '/productInfo', component: ProductInfo, name: '产品管理' },
            { path: '/productCatagory', component: ProductCatagory, name: '产品分类管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '服务介绍',
        iconCls: 'el-icon-service',
        children: [
            { path: '/aboutServiceEdit', component: AboutServiceEdit, name: '服务介绍' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '行业知识',
        iconCls: 'el-icon-guide ',
        children: [
            { path: '/industry', component: IndustryInfo, name: '行业知识' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '联系我们',
        iconCls: 'el-icon-phone',
        children: [
            { path: '/contactInformation', component: ContactInformation, name: '联系方式' },
            { path: '/leaveWord', component: LeaveWordList, name: '在线留言' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统用户',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/user', component: User, name: '用户管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;