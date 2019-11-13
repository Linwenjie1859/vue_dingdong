/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:35:04
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 11:55:16
 */
import Vue from 'vue'
import Router from 'vue-router'
import BsHome from '@/components/BsHome'
import BsLogin from '@/components/BsLogin'
import BsRegister from '@/components/BsRegister'
import BsPerson from '@/components/BsPerson'
import BsAbout from '@/components/BsAbout'
import BsStudyRoom from '@/components/BsStudyRoom'
import BsStoreDetail from '@/components/BsStoreDetail'
import BsConfirmOrder from '@/components/BsConfirmOrder'

// 二级路由
import Address from '@/components/person/Address'
import Info from '@/components/person/Info'
import Upload from '@/components/person/Upload'
import Download from '@/components/person/Download'
import Order from '@/components/person/Order'
import Sells from '@/components/person/Sells'
import Collect from '@/components/person/Collect'
import Shopping from '@/components/person/Shopping'
Vue.use(Router)

export default new Router({

    routes: [
        { path: '/', name: 'bshomeLink', component: BsHome },
        { path: '/bsstoredetail', name: 'bsstoredetailLink', component: BsStoreDetail },
        { path: '/bsconfirmorder', name: 'bsconfirmorderLink', component: BsConfirmOrder },
        { path: '/bslogin', name: 'bsloginLink', component: BsLogin },
        { path: '/bsstudyroomLink', name: 'bsstudyroomLink', component: BsStudyRoom },
        { path: '/bsregister', name: 'bsregisterLink', component: BsRegister },
        {
            path: '/bsperson',
            name: 'bspersonLink',
            component: BsPerson,
            // 未登陆无法进入个人页面
            beforeEnter: (to, from, next) => {

                // console.log(JSON.parse(sessionStorage.getItem("user")));
                // if (JSON.parse(sessionStorage.getItem("user")) != null) {
                //     next();
                // } else {
                //     alert("还没有登录,请先登录!");
                //     next('/bslogin');
                // }
                next();
            },
            redirect: "/bsperson/info",
            children: [
                { path: '/bsperson/address', name: 'addressLink', component: Address },
                { path: '/bsperson/shopping', name: 'shoppingLink', component: Shopping },
                { path: '/bsperson/upload', name: 'uploadLink', component: Upload },
                { path: '/bsperson/download', name: 'downloadLink', component: Download },
                { path: '/bsperson/order', name: 'orderLink', component: Order },
                { path: '/bsperson/info', name: 'infoLink', component: Info },
                { path: '/bsperson/sells', name: 'sellsLink', component: Sells },
                { path: '/bsperson/collect', name: 'collectLink', component: Collect },
            ]
        },
        { path: '/bsabout', name: 'bsaboutLink', component: BsAbout },
    ],
    mode: 'history'
})