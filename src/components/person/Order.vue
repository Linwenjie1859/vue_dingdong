<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:54:16
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 16:31:27
 -->
<template>
  <div class="order">
    <div class="row" style="margin-bottom:10px;">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <h3>
          <blockquote>历史订单记录</blockquote>
        </h3>
        <div
          class="flex flex-direction"
          v-for="(item1,index1) in orderInfo"
          style="margin-bottom:20px;"
          :key="index1"
        >
          <div class="flex" style="margin-bottom:5px;">
            <span>
              <strong>{{item1._add_time}}</strong>
            </span>
            <span style="margin-left:15px;" class="text-grey">订单编号:{{item1.order_id}}</span>
          </div>
          <div
            class="flex align-center justify-between"
            style="margin:0 20px;"
            v-for="(item2,index2) in item1.cartInfo"
            :key="index2"
          >
            <div class="flex" @click="toDetail(item2.product_id)">
              <img
                :src="item2.productInfo.image"
                alt
                style="height:80px;width:80px;margin-right:20px;"
              />
              <div class="flex flex-direction justify-around">
                <span
                  class="text-has-overflow"
                  :title="item2.productInfo.store_name"
                >{{item2.productInfo.store_name}}</span>
                <span
                  class="text-grey text-has-overflow"
                  :title="item2.productInfo.store_info"
                >{{item2.productInfo.store_info}}</span>
              </div>
            </div>

            <div class="flex flex-direction">
              <p class="text-grey">
                <del>{{item2.productInfo.ot_price}}</del>
              </p>
              <p>{{item2.productInfo.price}}</p>
            </div>

            <div class="flex flex-direction align-end">
              <span>{{item1.total_price}}</span>
              <span class="text-grey">x{{item2.cart_num}}</span>
            </div>
            <div
              class="flex flex-direction justify-between align-center"
              v-if="item1.status == 0 && item1.paid == 0"
            >
              <span class="text-grey">等待买家付款</span>
              <button class="btn btn-success">立即付款</button>
            </div>

            <div
              class="flex flex-direction justify-between align-center"
              v-if="item1.status == 0 && item1.paid == 1"
            >
              <span class="text-grey">等待卖家发货</span>
              <button class="btn btn-success" @click="callSeller">提醒卖家发货</button>
            </div>
            <div
              class="flex flex-direction justify-between align-center"
              v-if="item1.status == 1 && item1.paid == 1"
            >
              <span class="text-grey">卖家已发货</span>
              <button class="btn btn-success" @click="confirmGood(item1.order_id,index1)">确认收货</button>
            </div>

            <div
              class="flex flex-direction justify-between align-center"
              v-if="item1.status == 2 && item1.paid == 1"
            >
              <span class="text-grey">买家已收货</span>
              <button
                class="btn btn-success"
                data-toggle="modal"
                data-target="#myModal"
                @click="getCurrentIndex(index1)"
              >立即评价</button>
            </div>

            <div
              class="flex flex-direction justify-between align-center"
              v-if="item1.status == 3&& item1.paid == 1"
            >
              <span class="text-grey">交易完成</span>
              <button class="btn btn-success" @click="toDetail(item2.product_id)">再次购买</button>
            </div>

            <!-- Button trigger modal -->
            <div
              id="myModal"
              class="modal fade"
              tabindex="-1"
              role="dialog"
              aria-labelledby="gridSystemModalLabel"
              style="margin-top:2%;"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="gridSystemModalLabel">订单评价</h4>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-4">
                        <img
                          :src="orderInfo[currentIndex].cartInfo[0].productInfo.image"
                          alt
                          style="height:100%;width:100%;"
                        />
                      </div>
                      <div class="col-md-8">
                        <p>
                          <strong>{{orderInfo[currentIndex].cartInfo[0].productInfo.store_name}}</strong>
                        </p>
                        <p
                          class="text-grey"
                        >{{orderInfo[currentIndex].cartInfo[0].productInfo.store_info}}</p>
                        <textarea class="form-control" v-model="evaluation"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="toEvaluation(orderInfo[currentIndex].cartInfo[0].unique)"
                    >立即评价</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
          </div>
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
      callFlag: true,
      orderInfo: {},
      //当前操作的订单
      currentIndex: 0,
      //评价内容
      evaluation: ""
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    //前往评价
    toEvaluation(unique) {
      this.$axios
        .post(
          "../crm/ebapi/user_api/user_comment_product",
          {
            unique: unique,
            comment: this.evaluation,
            pics: "",
            product_score: 5,
            service_score: 5
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message("评价成功,感谢您的评价。");
            setTimeout(() => {
              $("#myModal").modal("hide");
            }, 500);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    //获取当前操作的下标
    getCurrentIndex(index) {
      this.currentIndex = index;
    },
    //确认收货
    confirmGood(id, index) {
      this.$axios
        .post(
          "../crm/ebapi/user_api/user_take_order",
          {
            uni: id
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message("确认成功,欢迎下次在购。");
          setTimeout(() => {
            window.location.href = "/bsperson";
          }, 1000);
        })
        .catch(res => {
          console.log(res);
        });
    },
    //提醒卖家发货
    callSeller() {
      if (this.callFlag) {
        this.$message("成功通知卖家发货。");
        this.callFlag = false;
      } else {
        this.$message("已经提醒过卖家。");
      }
    },
    //查看详情
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
          "../crm/ebapi/user_api/get_user_order_list",
          {
            type: "",
            page: "",
            limit: "",
            search: ""
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.orderInfo = res.data.data;
          console.log(this.orderInfo);
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
  white-space: nowrap;
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
