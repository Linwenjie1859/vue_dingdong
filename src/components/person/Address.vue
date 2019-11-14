<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-10-07 13:26:57
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 17:36:24
 -->
<template>
  <div class="address">
    <div class="row">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <h3>
          <blockquote>添加地址</blockquote>
        </h3>
        <div class="flex flex-wrap" > 
            <div class="flex flex-direction has-bg justify-between"  v-for="(item,index) in addressList" :key="index">
              <div class="flex justify-between">
                <span class="text-bold">{{item.real_name}}</span>
                <span class="text-grey">{{item.phone}}</span>
              </div>
              <div class="flex justify-between align-end">
                <span class="text-grey" style="margin-top:8px; width:90%">{{item.province}} {{item.city}} {{item.district}} {{item.detail}} </span>
                <span class="cuIcon-delete" style="margin-left:5px;" @click="deleteAddress(item.id,index)"></span>
              </div>
            </div>
        </div>

        <div>
          <span class="text-grey" style="margin:8px 0;">收货人</span>
          <input type="text" class="form-control" v-model="realName" />
        </div>
        <div>
          <span class="text-grey" style="margin:8px 0;">手机号</span>
          <input type="text" class="form-control" v-model="phone" />
        </div>
        <div>
          <span class="text-grey" style="margin:8px 0;">所在地区</span>
          <div class="input-group mt-2">
            <span class="input-group-addon">省级</span>
            <input type="email " class="form-control" v-model="province " placeholder="省级... " />
            <span class="input-group-addon">市级</span>
            <input type="email " class="form-control" v-model="city " placeholder="市级... " />
            <span class="input-group-addon">县级</span>
            <input type="email " class="form-control" v-model="district " placeholder="县级... " />
          </div>
        </div>
        <div>
          <span class="text-grey" style="margin:8px 0;">详细地址</span>
          <textarea class="form-control" v-model="detail"></textarea>
        </div>
        <button class="btn btn-success" style="margin:10px 0;" @click="saveAddress">保存地址</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
      addressList:[],
      realName: "",
      phone: "",
      detail: "",
      province: "",
      city: "",
      district: ""
    };
  },
  created(){
    this.getUserAddress();
  },
  methods: {
    //删除收货地址
    deleteAddress(id,index){
      this.$axios
        .post(
          "../crm/ebapi/user_api/remove_user_address",
          {
            addressId:id
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message('删除地址成功!');
          this.addressList.splice(index,1);
        });
    },
    //获取用户收货地址
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
          this.addressList = res.data.data;
          console.log(this.addressList);
        });
    },
    //添加收货地址
    saveAddress() {
      this.$axios
        .post(
          "../crm/ebapi/user_api/edit_user_address",
          {
            real_name: this.realName,
            phone: this.phone,
            detail: this.detail,
            is_default: true,
            address: {
              province: this.province,
              city: this.city,
              district: this.district
            },
            id: ""
          },
          {
            headers: {
              token: JSON.parse(sessionStorage.getItem("user")).token
            }
          }
        )
        .then(res => {
          this.$message('添加地址成功!');
          this.realName= "";
          this.phone= "";
          this.detail= "";
          this.province= "";
          this.city= "";
          this.district= "";
          setTimeout(() => {
            window.location.href = "/bsperson/address";
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-bg{
  background-color: rgba(240, 240, 240, 0.5); 
  color: #333333;
  width:31%;
  margin:0 1% 10px 1%; 
  padding:20px 15px;
  border-radius: 8px;
  border: 1px solid rgba(240, 240, 240,1);
  cursor: pointer;
}

.div-has-padding > div{
  margin:10px 0;
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
