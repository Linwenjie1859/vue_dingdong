<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:52:46
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 20:47:24
 -->
<template>
  <div class="bsperson">
    <section class="section">
      <div class="container">
        <bssearchbox></bssearchbox>
      </div>
    </section>
    <section class="section bg-gray-sotf">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-4 col-md-4 col-lg-3 text-center">
            <div class="row">
              <div class="col-sm-11 col-md-11 bg-white-radius text-muted div-has-padding">
                <img :src="userInfo.avatar" alt class="userHead" />
                <p>
                  <strong>{{userInfo.nickname}}</strong>
                </p>
                <p>
                  <small>ID:{{userInfo.phone}}</small>
                </p>
                <p>
                  <small>登入IP:{{userInfo.last_ip}}</small>
                </p>
                <p>
                  <small>用户积分:{{userInfo.integral}}</small>
                </p>
                <img src="@/assets/vip_icon_gray_small.svg" title="vip特权" alt v-for="vip in 5"  :key="vip"/>
              </div>
            </div>
            <div class="row mt-5 mb-5">
              <div class="col-sm-11 col-md-11 bg-white-radius div-has-padding">
                <h4>
                  <strong>信息操作栏</strong>
                </h4>
                <div class="navbar-collapse">
                  <ul class="nav nav-pills nav-stacked">
                    <li data-toggle="tab" class="active">
                      <router-link :to="{name:'infoLink'}">
                        <span class="cuIcon-people"></span> 个人信息</router-link>
                    </li>
                    <!-- <li data-toggle="tab">
                      <router-link :to="{name:'uploadLink'}">我的上传</router-link>
                    </li> -->
                    <!-- <li data-toggle="tab">
                      <router-link :to="{name:'downloadLink'}">我的下载</router-link>
                    </li> -->
                    <!-- <li data-toggle="tab">
                      <router-link :to="{name:'sellsLink'}">发布书籍</router-link>
                    </li> -->
                    <li data-toggle="tab">
                      <router-link :to="{name:'orderLink'}">
                        <span class="cuIcon-formfill "></span> 我的订单</router-link>
                    </li>
                    <li data-toggle="tab"> 
                       <router-link :to="{name:'addressLink'}">
                         <span class="cuIcon-writefill "></span> 添加地址</router-link>
                    </li>
                    <li data-toggle="tab">
                      <router-link :to="{name:'collectLink'}">
                        <span class="cuIcon-goodsfavor "></span> 我的收藏</router-link>
                    </li>
                    <li data-toggle="tab">
                      <router-link :to="{name:'shoppingLink'}">
                        <span class="cuIcon-cartfill "></span> 我的购物车</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-8 col-md-8 col-lg-9">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BsSearchBox from "./util/BsSearchBox";
export default {
  name: "bsperson",
  components: {
    bssearchbox: BsSearchBox
  },
  created() {
    this.isLogin();
    this.getUserInfo();
  },
  data() {
    return {
      userInfo:{}
    };
  },
  methods: {
    getUserInfo() {
      this.$axios
        .post(
          "../crm/ebapi/user_api/my",
          {},
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.userInfo=res.data.data;
          this.userInfo['avatar']=this.userInfo['avatar']?this.userInfo['avatar']:'http://bs.vswxx.top/a1.png';
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  margin: 10px 0;
}
.container-fluid {
  padding: 0 80px;
}
@media (max-width: 992px) {
  .container-fluid {
    padding: 0 30px;
  }
}
@media (max-width: 768px) {
  .container-fluid {
    padding: 0 20px;
  }
}
.bg-gray-sotf {
  background: #f8fafa !important;
  padding-top: 20px;
}
.bg-white-radius {
  background: #fff;
  border-radius: 10px;
}
.div-has-padding {
  padding-top: 30px;
  padding-bottom: 30px;
}
/**************************/
.text-has-omit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /*设置显示多少行*/
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.section {
  position: relative;
  background: #fff;
  z-index: 100;
}
.userHead {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
</style>
