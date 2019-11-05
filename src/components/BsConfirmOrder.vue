<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 10:16:35
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-11-04 21:42:23
 -->
<template>
  <div class="bsconfirmorder">
    <div class="container">
      <strong>确认订单信息</strong>
      <div class="flex flex-direction" v-for="(item1,index1) in cartInfo">
        <p>店铺: 新华文轩网络书店</p>
        <div
          class="flex align-center justify-between"
          style="padding:5px; border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0;"
          v-for="(item2,index2) in item1.data"
        >
          <div class="flex align-center">
            <img
              :src="item2.productInfo.image"
              alt
              style="width:55px; height:55px; margin-right:10px;"
            />
            <span
              style="width:210px;"
              class="text-has-omit"
              :title="item2.productInfo.store_info"
            >{{item2.productInfo.store_info}}</span>
          </div>
          <div class="flex flex-direction align-end">
            <strong class="text-red">
              <p style="font-size:20px;" class="text-price">{{item2.productInfo.price}}</p>
            </strong>
            <span class="text-grey">x{{item2.cart_num}}</span>
          </div>
        </div>
        <div class="flex align-center justify-between" style="margin:10px 0;">
          <span>配送方式</span>
          <strong>免邮快递</strong>
        </div>
        <div class="flex align-center justify-between" style="margin:10px 0;">
          <span>买家留言</span>
          <input type="text" class="form-control" v-model="mark" style="width:70%;" />
        </div>
        <div class="flex align-center justify-end" style="margin:10px 0;">
          <strong>
            <span>共{{item1.data.length}}件商品 合计</span>
            <span class="text-red">￥{{sumPrice}}</span>
          </strong>
        </div>
      </div>
      <div class="flex align-center justify-end" style="margin:10px 0;">
        <button class="btn btn-success" @click="settlement">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bsconfirmorder",
  data() {
    return {
      cartInfo: [],
      sumPrice: 0,
      orderKey: 0,
      mark: "",
      address: {}
    };
  },
  created() {
    this.getOrderInfo();
    this.getAddressList();
  },
  methods: {
    //获取默认收货地址
    getAddressList() {
      this.$axios
        .post(
          "../crm/ebapi/user_api/user_default_address",
          {},
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.address = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即结算
    settlement() {
      this.$axios
        .post(
          "/crm/ebapi/auth_api/create_order",
          {
            key: this.orderKey,
            addressId: this.address.id,
            couponId: "",
            userIntegral: 0,
            mark: this.mark,
            price:this.sumPrice
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message(res.data.msg);
          if (res.data.code == 200) {
            setTimeout(() => {
              this.$router.push({
                name: "bsstudyroomLink"
              });
            }, 800);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获得订单信息
    getOrderInfo() {
      this.$axios
        .post(
          "../crm/ebapi/auth_api/confirm_order",
          {
            cartId: this.$route.params.listId
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.cartInfo = this.SortData(res.data.data.cartInfo);
          for (let j = 0; j < this.cartInfo.length; j++) {
            this.sumNum += this.cartInfo[j].data.length;
            for (let i = 0; i < this.cartInfo[j].data.length; i++) {
              this.sumPrice +=
                this.cartInfo[j].data[i].cart_num *
                this.cartInfo[j].data[i].productInfo.price;
            }
          }
          this.orderKey = res.data.data.orderKey;
        })
        .catch(err => {
          console.log(err);
        });
    },

    dealData(data) {
      for (let i = 0; i < data.length; i++) {
        data[i]["coupon_price"] = parseFloat(data[i].coupon_price);
      }
      return data;
    },
    SortData(data) {
      let map = {}; //存在mer_id
      let array = []; //所有的数据
      for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        if (!map[temp.mer_id]) {
          array.push({
            mer_id: temp.mer_id,
            data: [temp]
          });
          map[temp.mer_id] = "Occupies a position";
        } else {
          for (var j = 0; j < array.length; j++) {
            var existData = array[j];
            if (existData.mer_id == temp.mer_id) {
              existData.data.push(temp);
              break;
            }
          }
        }
      }
      return array;
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
