<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:54:01
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-11-04 23:57:40
 -->
<template>
  <div class="info">
    <div class="row">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active">
            <a href="#info" aria-controls="info" role="tab" data-toggle="tab">我的资料</a>
          </li>
          <li role="presentation">
            <a href="#safe" aria-controls="safe" role="tab" data-toggle="tab">账号安全</a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <!-- 我的资料 -->
          <div role="tabpanel" class="tab-pane active div-has-tmlr-padding" id="info">
            <div class="row">
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-1">
                <span>个人头像</span>
              </div>
              <div class="col-xs-9 col-sm-10 col-md-10 col-lg-11">
                <img src="http://bs.vswxx.top/a1.png" alt class="userHead" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-1">
                <span>用户昵称</span>
              </div>
              <div class="col-xs-9 col-md-10 col-sm-10 col-lg-9">
                <input
                  type="text"
                  class="form-control"
                  placeholder="用户昵称"
                  v-model="userInfo.nickname"
                />
              </div>
            </div>
            <!-- <div class="row">
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-1">
                <span>性别</span>
              </div>
              <div class="col-xs-9 col-sm-10 col-md-10 col-lg-11">
                <div class="radio">
                  <label>
                    <input type="radio" name="sex" value="保密" checked />保密
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="sex" value="女" />女
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="sex" value="男" />男
                  </label>
                </div>
              </div>
            </div>-->
            <!-- <div class="row">
              <div class="col-md-2 col-sm-2 col-xs-3 col-lg-1 mt-2">年龄</div>
              <div class="col-xs-9 col-md-10 col-sm-10 col-lg-9">
                <select name id class="form-control" style="width:30%;">
                  <option value="1">1</option>
                  <option value="1">99</option>
                  <option value="1">3</option>
                </select>
              </div>
            </div>-->
            <div class="row">
              <div class="col-md-2 col-sm-2 col-xs-3 col-lg-1 mt-2">默认地址</div>
              <div class="col-xs-9 col-md-10 col-sm-10 col-lg-9">
                <select name id class="form-control" v-model="currentAdderId">
                  <option
                    :value="item.id"
                    v-for="(item,index) in addressList" :key="index"
                  >{{item.city}} {{item.district}} {{item.detail}}</option>
                </select>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-md-2 col-sm-2 col-xs-3 col-lg-1 mt-2">常用邮箱</div>
              <div class="col-xs-9 col-md-10 col-sm-10 col-lg-9">
                <input type="text" class="form-control" placeholder="常用的邮箱地址" />
              </div>
            </div>-->
            <div class="row">
              <div class="col-sm-6 col-sm-push-2 col-md-4 col-md-push-2 col-lg-3 col-lg-push-1">
                <button class="btn btn-primary btn-block" @click="saveInfo">保存信息</button>
              </div>
            </div>
          </div>
          <!-- 账号安全 -->
          <div role="tabpanel" class="tab-pane div-has-tmlr-padding" id="safe">
            <div class="row">
              <div class="col-md-3 text-is-left">
                <p>
                  <span class="spanp-has-border"></span> 绑定手机号
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-11 text-is-left">
                <strong style="margin-right:10px;">手机号</strong>
                <span class="text-grey">{{userInfo.phone}}</span>
                <!-- <button class="btn btn-success btn-has-margin">修改</button> -->
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 flex justify-between has-border align-center">
                <p>
                  <strong style="margin-right:10px;">账户余额</strong>
                  <span class="text-grey">{{userInfo.now_money}}</span>
                </p>
                <button class="btn btn-success " style="margin-top:-10px;"   data-toggle="modal"  data-target="#myModal">充值</button>
              </div>
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
                <div class="modal-content" >
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="gridSystemModalLabel">充值中心</h4>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-4"><img src="@/assets/money.jpg" alt="" style="height:100%;width:100%;"></div>
                      <div class="col-md-8">
                        <p><strong>扫码1元购,金额随便输入！(本站商品一概不发货)</strong></p>
                        <input type="number" v-model.number="addPrice" class="form-control" width="50%" placeholder="请输入充值金额">
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="addMoney()">立即充值</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
            <!-- <div class="row">
              <div class="col-md-push-1 col-md-6 mt-3 text-is-left">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="新的手机号码" />
                  <div class="input-group-btn">
                    <button class="btn btn-primary">获取验证码</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-push-1 col-md-11 mt-3 text-is-left">
                <button class="btn btn-has-margin" disabled>下一步</button>
                <button class="btn btn-default btn-has-margin">取消</button>
              </div>
            </div>-->
            <div class="row">
              <div class="col-md-3 text-is-left">
                <p>
                  <span class="spanp-has-border"></span> 登录信息
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>登录IP地址</th>
                      <th>上线地点</th>
                      <th>登入时间</th>
                      <th>是否消费</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>192.168.181.1</td>
                      <td>福建省福州市</td>
                      <td>2019-07-24 10:39:23</td>
                      <td>否</td>
                    </tr>
                    <tr>
                      <td>192.168.181.1</td>
                      <td>福建省福州市</td>
                      <td>2019-07-24 10:39:23</td>
                      <td>否</td>
                    </tr>
                    <tr>
                      <td>192.168.181.1</td>
                      <td>福建省福州市</td>
                      <td>2019-07-24 10:39:23</td>
                      <td>否</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      userInfo: {},
      addressList: [],
      currentAdderId: 0,
      addPrice: '',
    };
  },
  created() {
    this.getUserInfo();
    this.getDefaultAddress();
    this.getUserAddress();
  },
  methods: {
    addMoney() {
      if(this.addPrice==''){
        this.$message('金额充值错误,请重新操作。')
        return ;
      }
      this.$axios
        .post(
          "../crm/ebapi/user_api/user_wechat_recharge",
          {
            price: this.addPrice,
            type: 1
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message('嘿！你不扫码,这是想白嫖吗?');
          setTimeout(() => {
            this.userInfo.now_money += parseFloat(this.addPrice);
            $('#myModal').modal('hide');
          }, 2000);
        });
    },
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
          console.log(res);
          this.userInfo = res.data.data;
          this.userInfo["pwd"] = JSON.parse(sessionStorage.getItem("user")).pwd;
          this.userInfo.now_money = parseFloat(this.userInfo.now_money);
        });
    },
    getUserAddress() {
      this.$axios
        .post(
          "../crm/ebapi/user_api/user_address_list",
          {},
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          console.log(res);
          this.addressList = res.data.data;
        });
    },
    saveNickName() {
      this.$axios
        .post(
          "../crm/ebapi/user_api/edit_user",
          {
            avatar: "",
            nickname: this.userInfo.nickname
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message("用户昵称保存成功");
        });
    },
    changeDefault() {
      this.$axios
        .post(
          "../crm/ebapi/user_api/set_user_default_address",
          {
            addressId: this.currentAdderId
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message("默认地址保存成功");
        });
    },
    getDefaultAddress() {
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
          this.currentAdderId = res.data.data.id;
        });
    },

    saveInfo() {
      this.changeDefault();
      this.saveNickName();
      location.reload();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-border {
  border-bottom: 1px solid rgba(170, 170, 170, 0.5);
}
.bg-white-radius {
  background: #fff;
  border-radius: 10px;
}
.div-has-padding {
  padding-top: 30px;
  padding-bottom: 30px;
}
.div-has-tmlr-padding {
  padding: 30px 10px;
}
.div-has-tmlr-padding > .row {
  padding: 14px 0 11px;
}
.div-has-tmlr-padding > div > div:nth-of-type(1) {
  color: #777;
  text-align: center;
}
.nav-tabs > li.active > a {
  border: none !important;
  border-bottom: 2px solid #008aff !important;
}
.userHead {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.radio {
  display: inline-block;
  margin: 0 10px 0 0;
}
.spanp-has-border {
  border-left: 3px solid #008aff;
  padding-left: 10px;
}
.text-is-left {
  text-align: left !important;
}
.btn-has-margin {
  margin-left: 5px;
}
.table > thead > tr > th {
  text-align: center;
}
</style>
