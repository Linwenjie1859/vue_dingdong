<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-07-24 09:44:25
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 15:32:27
 -->
<template>
  <div class="bssearchbox">
    <div class="container">
      <div class="row">
        <div class="col-md-3 pull-left hidden-xs">
          <h1 class="text-muted text-center">
            <strong>叮当书城</strong>
          </h1>
        </div>
        <div class="col-xs-12 col-sm-7 col-md-6 pull-left mt-5">
          <div class="row">
            <div class="col-md-12">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="输入您要查询的商品名称、类型等相关信息..."
                  v-model.trim="keyWord"
                />
                <div class="input-group-btn">
                  <button class="btn btn-success" @click="searchBook">搜索书籍</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <small class="text-muted hotword">
                <span class="pull-left">热搜：</span>
                <ul class="list-unstyled">
                  <li v-for="hot in hotWord" :key="hot.id">{{hot.word}}</li>
                </ul>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-3 text-right mt-5 visible-md visible-lg">
          <div class="btn-group">
            <button class="btn btn-danger" @click="pushToCart">
              <span class="cuIcon-cartfill"></span>
              购物车
            </button>
             
            <button class="btn btn-default" @click="pushToOrder">
               我的订单
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bssearchbox",
  data() {
    return {
      hotWord: [
        {
          word: "言情小说",
          id: 1
        },
        {
          word: "科幻小说",
          id: 2
        },
        {
          word: "修仙小说",
          id: 3
        }
      ],
      keyWord: ""
    };
  },
  methods: {
    searchBook() {
      if (this.keyWord != null) {
        this.$router.push({
          name: "bsstudyroomLink",
          params: {
            keyWord: this.keyWord
          }
        });
      }
    },
    pushToCart() {
      this.$router.push({
        name: "shoppingLink"
      });
    },
    pushToOrder() {
      this.$router.push({
        name: "orderLink"
      });
    }
  }
};
</script>

<style scoped>
.bssearchbox {
  padding-bottom: 20px;
}
.hotword > ul > li {
  float: left;
  padding: 0 5px 0 0;
}
.hotword > ul {
  display: inline;
}
</style>
