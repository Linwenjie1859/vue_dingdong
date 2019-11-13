<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:54:16
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 16:22:51
 -->
<template>
  <div class="order">
    <div class="row" style="margin-bottom:10px;">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <h3>
          <blockquote>我的收藏柜</blockquote>
        </h3>
        <div
          class="flex align-center justify-between"
          style="margin:20px;"
          v-for="(item2,index2) in orderInfo"
          :key="index2"
        >
          <div class="flex">
            <img :src="item2.image" alt style="height:80px;width:80px;margin-right:20px;" />
            <div class="flex flex-direction justify-around">
              <span class="text-has-overflow" :title="item2.store_name">{{item2.store_name}}</span>
            </div>
          </div>

          <div class="flex flex-direction">
            <p class="text-grey">
              <del>{{item2.ot_price}}</del>
            </p>
            <p>{{item2.price}}</p>
          </div>
          <div class="flex flex-direction">
            <span>销量:{{item2.sales}}</span>
          </div>
          <button class="btn btn-success" @click="toDetail(item2.pid)">立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      orderInfo: {}
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: "bsstoredetailLink",
        params: {
          id: id
        }
      });
    },
    getOrderList() {
      this.$axios
        .post(
          "../crm/ebapi/store_api/get_user_collect_product",
          {
            page: "",
            limit: ""
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          console.log(res);
          this.orderInfo = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-has-overflow {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
tr > th {
  text-align: center;
}
.bg-white-radius {
  background: #fff;
  border-radius: 10px;
}
.div-has-padding {
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
