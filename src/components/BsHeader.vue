<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:47:17
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 17:09:16
 -->
<template>
  <div class="bsheader">
    <nav
      class="navbar navbar-default navbar-fixed-top"
      :class="{'navbar-has-shadow':pageSwitch.navbar_shadow}"
    >
      <div class="container-fluid" >
        <div class="navbar-header">
          <router-link :to="{name:'bshomeLink'}">
            <img src="@/assets/logo.png" alt style="height:45px;width:45px;" />
          </router-link>
          <button class="navbar-toggle" data-toggle="collapse" data-target="#menu">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="menu" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbbar-left">
            <li>
              <a>欢迎来叮当</a>
            </li>
            <li>
              <router-link :to="{name:'bsloginLink'}" v-if="user==null">
                <span class=""></span> 请登入
              </router-link>
              <router-link :to="{name:'bspersonLink'}" v-else>

                 <span class="cuIcon-crownfill text-red"></span>
                <span v-if="user.nickname!='' && user.nickname!=null">{{user.nickname}}</span>
                <span v-else>{{user.phone}}</span>

              </router-link>
            </li>
            <li>
              <router-link :to="{name:'bsregisterLink'}" v-if="user==null">
                <span></span> 免费注册
              </router-link>
              <router-link :to="{}" v-else>
                <span @click="userLoginOut">退出账号</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'bshomeLink'}">
                <span class="cuIcon-homefill text-orange"></span> 叮当商城
              </router-link>
            </li>
            <!-- <li>
              <router-link :to="{name:'bshomeLink'}">
                <span></span> 书籍分类
              </router-link>
            </li>-->
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link :to="{name:'bsstudyroomLink'}">
                <span class="cuIcon-discoverfill text-red"></span>叮当书房
              </router-link>
            </li>
            <li class="hidden-sm">
              <router-link :to="{name:'bspersonLink'}">
                <span></span> 个人中心</router-link>
            </li>
            <li>
              <router-link :to="{name:'shoppingLink'}">
                <span class="cuIcon-cartfill text-orange"></span> 我的购物车</router-link>
            </li>
            <li >
              <router-link :to="{name:'orderLink'}" >
                <span class="cuIcon-formfill text-red"></span> 我的订单</router-link>
            </li>
            <li class="hidden-sm">
              <router-link :to="{name:'collectLink'}">
               我的收藏</router-link>
            </li>
            <!-- <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                我的叮当
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu text-center">
                <li>
                  <router-link :to="{name:'bspersonLink'}">个人中心</router-link>
                </li>
                <li>
                  <router-link :to="{name:'orderLink'}">我的订单</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">叮当优惠券</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">购物车</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">我的收藏</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">发表评论</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">礼品卡</router-link>
                </li>
              </ul>
            </li> -->
            <!-- <li class="visible-xs-block visible-lg-block">
              <router-link :to="{name:'bshomeLink'}" class="dropdown-toggle" data-toggle="dropdown">
                <span class></span>我要投稿
              </router-link>
            </li>-->
            <!-- <li class="dropdown hidden-sm">
              <a href="#" :to="{name:'bsaboutLink'}" class="dropdown-toggle" data-toggle="dropdown">
                企业入口
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu text-center">
                <li>
                  <router-link :to="{name:'bshomeLink'}">企业采购</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">企业优惠卡</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">礼品卡激活</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">活动专区</router-link>
                </li>
              </ul>
            </li>
            <li class="dropdown ">
              <a href="#" :to="{name:'bsaboutLink'}" class="dropdown-toggle" data-toggle="dropdown">
                客户服务
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu text-center">
                <li>
                  <router-link :to="{name:'bshomeLink'}">帮助中心</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">退换货中心</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">自助发票厅</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">联系客服</router-link>
                </li>
                <li>
                  <router-link :to="{name:'bshomeLink'}">我要投诉</router-link>
                </li>
              </ul>
            </li>-->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "bsheader",
  data() {
    return {
      user: {},
      pageSwitch: {
        navbar_shadow: false
      },
      phone: ""
    };
  },

  methods: {
    userLoginOut() {
      sessionStorage.removeItem("user");
      window.location.href = "/";
    },
    listenerScroll() {
      // let scroll = document.documentElement.scrollTop;
      let scroll = $(window).scrollTop();
      if (scroll > 80) {
        this.pageSwitch.navbar_shadow = true;
      } else if (scroll <= 80) {
        this.pageSwitch.navbar_shadow = false;
      }
    }
  },
  mounted() {
    $(window).scroll(this.listenerScroll);
  },

  created: function() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-has-shadow {
  box-shadow: 0 0 14px -6px rgba(0, 0, 0, 0.2) !important;
}
.navbar {
  background: #fff;
}
.navbar-default {
  border: none;
}
</style>
