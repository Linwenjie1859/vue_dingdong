<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-10-07 13:26:57
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 17:36:24
 -->
<template>
  <div class="shopping">
    <div class="row">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <h3>
          <blockquote>我的购物车</blockquote>
        </h3>
        <div class="flex flex-direction">
          <div
            class="flex flex-direction has-solid-bottom"
            v-for="(item,index) in goodsList"
            :key="index"
          >
            <div class="flex align-center">
              <img
                :src="item.productInfo.image"
                class="hidden-lg"
                alt
                style="height:100px;width:100px;"
              />
              <span
                style="width:100%; margin-left:30px; "
                class="hidden-lg text-gray"
                :title="item.productInfo.store_info"
              >{{item.productInfo.store_info}}</span>
            </div>
            <div class="flex align-center div-has-margin justify-between">
              <div class="flex align-center">
                <!-- <input type="checkbox" style="margin-right:10px;"> -->
                <img
                  :src="item.productInfo.image"
                  class="visible-lg-block"
                  alt
                  style="height:100px;width:100px;"
                />
              </div>
              <span
                style="width:200px;"
                class="text-has-omit-three visible-lg-block text-gray"
                :title="item.productInfo.store_info"
              >{{item.productInfo.store_info}}</span>
              <div class="flex flex-direction">
                <del class="text-price text-gray">{{item.productInfo.ot_price}}</del>
                <strong class="text-price text-black">{{item.productInfo.price}}</strong>
              </div>
              <div
                class="flex input-group mt-2 flex agline-center text-bold"
                style="margin:0 15px;width:90px;"
              >
                <span class="input-group-addon text-black is-pointer" @click="addSubNum(index,-1)">-</span>
                <input
                  type="text"
                  class="form-control text-center"
                  style="width:100%;padding:0 5px ;"
                  v-model="item.cart_num"
                />
                <span
                  class="input-group-addon text-black text-bold is-pointer"
                  @click="addSubNum(index,1)"
                >+</span>
              </div>
              <div class="flex" style="margin-right:10px;">
                <span class="text-price text-red">{{item.productInfo.price*item.cart_num}}</span>
              </div>

              <div class="flex align-center">
                <a @click="payMoney(item.id)" class="is-pointer">
                  <span class="cuIcon-refund"></span>
                  <span style="width:50px;margin-right:18px;" class="text-center">支付</span>
                </a>

                <a @click="deleteGood(item.id,index)" class="is-pointer">
                  <span class="cuIcon-deletefill"></span>
                  <span style="width:50px" class="text-center">移除</span>
                </a>
              </div>
            </div>
          </div>
          <!-- <div class="flex align-center justify-between" style="margin-top:50px;">
              <div style="margin-top:20px;">
                <label>
                  <input type="checkbox" style="margin-right:10px;">全选
                </label>
              </div>
              <div class="flex align-center">
                  <h3><span class="text-price text-red">5966</span></h3>
                  <button class="btn btn-success" style="margin-left:30px;">立即结算</button>
              </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopping",
  data() {
    return {
      //加载loading标记
      refreshFlag: true,
      loadingStatus: "loading",

      listId: [],

      noDateFlag: false, // 页面没有数据标志
      checkedNum: 0, // 目前选中的商品个数
      checkedAllFlag: false, //全部选中按钮标记
      checkedList: [], //所有被选中店铺
      checkAll: true, //购物车全选
      goodsList: [],
      differentStore: false,
      /************/
      headerPosition: "fixed",
      headerTop: null,
      statusTop: null,
      showHeader: true,
      selectedList: [],
      isAllselected: false,

      //控制滑动效果
      theIndex: "",
      oldIndex: "",
      isStop: false
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    deleteGood(id, index) {
      let that = this;
      this.$axios
        .post(
          "../crm/ebapi/auth_api/remove_cart",
          {
            ids: id
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          that.goodsList.splice(index, 1);
          that.$message("删除商品成功!");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //增加商品数量
    addSubNum(index, num) {
      if (num < 0 && this.goodsList[index].cart_num <= 1) {
        this.$message("该宝贝不能减少了哟~");
      } else {
        this.goodsList[index].cart_num =parseInt(this.goodsList[index].cart_num) + num;
      }
      let that = this;
      this.$axios
        .post(
          "../crm/ebapi/auth_api/change_cart_num",
          {
            cartId: parseInt(that.goodsList[index].id),
            cartNum: parseInt(that.goodsList[index].cart_num)
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          if(res.data.code==400){
            this.$message('您购买的商品库存不足,请联系卖家。');
            this.goodsList[index].cart_num =parseInt(this.goodsList[index].cart_num) - num;
          }
        })
        .catch(err => {

        });
    },
    //获得购物车信息
    getGoodsList() {
      let that = this;
      this.$axios
        .post(
          "../crm/ebapi/auth_api/get_cart_list",
          {},
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          console.log(res);
          let valid = res.data.data.valid;
          this.goodsList = valid;
          console.log(that.goodsList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即前往支付
    payMoney(id) {
      this.$router.push({
        name: "bsconfirmorderLink",
        params: {
          listId: id
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-solid-bottom {
  margin-top: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
}
.is-pointer {
  cursor: pointer;
}

.div-has-margin {
  margin: 10px 20px;
}

.div-has-padding > div {
  margin: 10px 0;
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
