/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:35:04
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-17 13:02:58
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入插件
// import util from '@/common/util.js'

import store from '@/store'
Vue.prototype.$store = store

import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

Vue.use(Vuelidate)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.url = 'http://www.bs.com/';
// Vue.prototype.url = 'http://www.vswxx.top/';

Vue.prototype.isLogin = function() {
        var that = this;
        if (JSON.parse(sessionStorage.getItem('user')) != null) {
            return true;
        } else {
            this.$router.push({
                name: "bsloginLink"
            });
        }
    }
    /**
     * @Modify: Mr. Lin
     * @function: POST 访问统一写法
     * @instructions: 
     * @param {type} 
     * @return: JSON
     */

Vue.prototype.basePost = function(url, data, successCallback, errorCallback, header) {

        // header['token'] = ;
        // console.log(header['token']);
        // util.basePost(url, data, successCallback, errorCallback, header);
        this.$axios.post(url, data, {
            headers: {
                'token': sessionStorage.getItem('user')['token']
            }
        }).then((res) => {
            try {
                if (res.data.code == 200) {
                    successCallback && successCallback(res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }).catch((res) => {
            errorCallback && errorCallback(res);
        })
    },

    new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
    }).$mount('#app');