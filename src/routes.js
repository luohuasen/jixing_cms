import Login    from './views/Login.vue'
import NotFound from './views/404.vue'
import Home     from './views/Home.vue'
import Banner   from './views/biz/Banner.vue'
import Config   from './views/biz/Config.vue'
import Product  from './views/biz/Product.vue'
import Service  from './views/biz/Service.vue'
import Work     from './views/biz/Work.vue'
import User     from './views/biz/User.vue'
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
        name: '常用配置',
        iconCls: 'el-icon-message',
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