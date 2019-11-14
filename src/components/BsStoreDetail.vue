<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-10-05 15:40:29
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 16:25:53
 -->
<template>
  <div class="bsstoredetail">
    <div class="container">
      <div class="row" style="margin-top:25px">
        <div class="col-md-4 col-sm-6">
          <div class="flex flex-direction">
            <section class="section">
              <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                  <div
                    class="item"
                    :class="{'active':index==0}"
                    v-for="(item,index) in goodsInfo.storeInfo.slider_image"
                    :key="index"
                  >
                    <img :src="item" class="img-carousel" />
                  </div>
                </div>
                <!-- Controls -->
                <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="right carousel-control"
                  href="#carousel-example-generic"
                  data-slide="next"
                >
                  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </section>
            <div class="flex justify-between" style="margin:15px 0px;">
              <img
                :src="item"
                alt
                style="height:53px;width:53px;"
                v-for="(item,index) in goodsInfo.storeInfo.slider_image"
                :key="index"
              />
            </div>
          </div>
        </div>
        <div class="col-md-5 col-sm-6" style="margin:10px 15px; padding-bottom:20px;">
          <div class="row flex flex-direction justify-between" style="min-height:420px;">
            <div class="flex justify-between">
              <p class="text-has-green">
                <strong>叮当购物，好货到家</strong>
              </p>
              <div
                class="flex"
                :class="{'text-grey':!collectFlag,'text-orange':collectFlag}"
                @click="changeCollect"
              >
                <div v-if="!collectFlag">
                  <strong>
                    收藏
                    <span class="cuIcon-favor"></span>
                  </strong>
                </div>
                <div v-else>
                  <strong>
                    已收藏
                    <span class="cuIcon-favorfill"></span>
                  </strong>
                </div>
              </div>
              <!-- <strong>
                <a href="https://book.douban.com/chart">豆瓣读书</a>
              </strong>-->
            </div>
            <h4>
              <strong>{{goodsInfo.storeInfo.store_name}}</strong>
            </h4>
            <p class="text-has-red">自己的事情自己做 抖音同款 成长励志故事书</p>
            <div class="flex justify-between align-center text-grey">
              <h3 class="text-has-red" style="font-size:32px;">
                <strong>
                  <span style="font-size:15px;">¥&nbsp;</span>
                  {{goodsInfo.storeInfo.price}}
                </strong>
              </h3>
              <span>作者:{{goodsInfo.storeInfo.author}}</span>
              <span>出版社:{{goodsInfo.storeInfo.press}}</span>
            </div>
            <div
              class="flex justify-between align-center bg-gray"
              style="padding:20px;   box-sizing:border-box;"
            >
              <div>
                月销量&nbsp;
                <strong class="text-has-red">{{goodsInfo.storeInfo.ficti}}</strong>
              </div>
              <div>
                商品浏览量&nbsp;
                <strong class="text-has-red">{{goodsInfo.storeInfo.browse}}</strong>
              </div>
              <div>
                送叮当积分&nbsp;
                <strong class="text-has-green">{{goodsInfo.storeInfo.give_integral}}</strong>
              </div>
            </div>
            <div class="flex align-center" style="margin-top:10px">
              <span class="text-grey">数量</span>
              <input
                type="text"
                class="form-control"
                v-model="currentNum"
                style="width:10%;margin:0 10px; padding:10px;"
              />
              <div class="flex flex-direction">
                <span
                  class="glyphicon glyphicon-menu-up radius text-grey"
                  style="margin-bottom:2px;"
                  @click="addSubNum(1)"
                ></span>
                <span class="glyphicon glyphicon-menu-down radius text-grey" @click="addSubNum(-1)"></span>
              </div>
              <span style="margin:0 20px 0 5px;">{{goodsInfo.storeInfo.unit_name}}</span>
              <span
                class="text-grey"
              >库存{{goodsInfo.storeInfo.stock}}{{goodsInfo.storeInfo.unit_name}} （每人限购10件）</span>
            </div>
            <div class="flex" style="margin-top:30px;">
              <button class="btn btn-danger" style="margin:0 20px;" @click="purchase">立即购买</button>
              <button class="btn btn-danger" @click="addCart">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bsstoredetail",
  data() {
    return {
      collectFlag: "",
      goodsInfo: {
        storeInfo: {
          slider_image: [],
          store_name: "",
          price: 0,
          sales: 0,
          browse: 0,
          give_integral: 0
        }
      },
      currentNum: 1,
      productId: 0
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.isLogin();
    }
    this.productId = this.$route.params.id;
    this.getGoodDetail();
  },
  methods: {
    addCart(){
      this.$axios
        .post(
          "../crm/ebapi/auth_api/set_cart",
          {
            productId: this.productId,
						merId: this.goodsInfo.storeInfo.mer_id,
						cartNum: this.currentNum,
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message('添加购物车成功!');
          console.log(res);
      });
    },
    changeCollect() {
      if (this.collectFlag) {
        this.$axios
          .post(
            "../crm/ebapi/store_api/uncollect_product",
            {
              productId: this.productId
            },
            {
              headers: {
                token: JSON.parse(sessionStorage.getItem("user")).token
              }
            }
          )
          .then(res => {
            this.collectFlag = !this.collectFlag;
          });
      } else {
        this.$axios
          .post(
            "../crm/ebapi/store_api/collect_product",
            {
              productId: this.productId
            },
            {
              headers: {
                token: JSON.parse(sessionStorage.getItem("user")).token
              }
            }
          )
          .then(res => {
            this.collectFlag = !this.collectFlag;
          });
      }
    },
    // 获得商品的详细的信息
    getGoodDetail() {
      this.$axios
        .post(
          "../crm/ebapi/store_api/details",
          {
            id: this.productId
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.goodsInfo = res.data.data;
          console.log(res.data.data.storeInfo);
          this.collectFlag = res.data.data.storeInfo.userCollect;
        });
    },
    // 立即购买
    purchase() {
      this.$axios
        .post(
          "../crm/ebapi/auth_api/now_buy",
          {
            productId: this.goodsInfo.storeInfo.id,
            merId: this.goodsInfo.mer_id,
            cartNum: this.currentNum
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$router.push({
            name: "bsconfirmorderLink",
            params: {
              listId: res.data.data.cartId
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //加购商品数量增减
    addSubNum(num) {
      if (num < 0 && this.currentNum == 1) {
        this.$message("亲，已经不能再减了");
        return;
      }
      this.currentNum = parseInt(this.currentNum )+ num;
    }
  }
};
</script>

<style scoped>
.text-has-red {
  font-size: 14px;
  color: #ff0036;
}
.text-has-green {
  font-size: 14px;
  color: #00bf00;
  line-height: 16px;
}
</style>