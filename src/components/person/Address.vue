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
      realName: "",
      phone: "",
      detail: "",
      province: "",
      city: "",
      district: ""
    };
  },
  methods: {
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
          console.log(res);
          this.$message('添加地址成功!');
          this.realName= "";
          this.phone= "";
          this.detail= "";
          this.province= "";
          this.city= "";
          this.district= "";
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
