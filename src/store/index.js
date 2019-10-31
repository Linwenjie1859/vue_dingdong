/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-10-03 16:03:08
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-03 16:28:38
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        account: '',
        phone: '',
        uid: '',
        token: '',
        isLog: '',
        navHeight: '',
    },
    mutations: {
        loginStore(state, provider) {
            state.account = provider.account;
            state.phone = provider.phone;
            state.uid = provider.uid;
            state.token = provider.token;
            state.isLog = true;
        },
        logoutStore(state) {
            state.token = '';
            state.isLog = false;
        },
        setNavHeight(state, provider) {
            state.navHeight = provider.navHeight
        }
    }
})

export default store