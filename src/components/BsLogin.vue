<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:50:58
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 14:11:22
 -->
<template>
  <div class="bslogin">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 visible-md visible-lg">
            <img src="@/assets/bg.png" class="translateY largeImg" alt />
          </div>
          <div class="col-md-4 col-md-push-2 text-center" style="margin-top:60px;">
            <h2>
              欢迎登录
              <strong>叮当</strong>
            </h2>
            <!-- 账号部分 -->
            <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.unumber.$error}"
            >
              <input
                type="text"
                @blur="$v.user.unumber.$touch()"
                v-model="user.unumber"
                class="form-control"
                placeholder="手机号码、邮箱账号 "
                ref="unumber"
              />
              <span
                class="form-control-feedback glyphicon glyphicon-ok"
                v-if="$v.user.unumber.required"
              ></span>
              <span class="help-block" v-if="$v.user.unumber.$error">账号不能为空</span>
            </div>
            <!-- 密码部分 -->
            <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.upassword.$error}"
            >
              <input
                type="password"
                @blur="$v.user.upassword.$touch()"
                v-model="user.upassword"
                class="form-control"
                placeholder="登录密码"
                ref="upassword"
              />
              <span
                class="form-control-feedback glyphicon glyphicon-ok"
                v-if="$v.user.upassword.required"
              ></span>
              <span class="help-block" v-if="$v.user.upassword.$error">密码不能为空</span>
            </div>
            <!-- 验证码部分 -->
            <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.code.$error}"
            >
              <div class="input-group">
                <input
                  type="text"
                  @blur="$v.user.code.$touch()"
                  v-model="user.code"
                  class="form-control"
                  placeholder="验证码"
                  ref="code"
                />
                <span class="input-group-addon" @click="refreshCode">
                  <identify :identifyCode="identifyCode"></identify>
                </span>
              </div>
              <span class="help-block" v-if="$v.user.code.$error">验证码不能为空</span>
            </div>
            <input
              type="button"
              class="btn btn-success mt-3"
              @click="loginUser"
              style="width:100%;"
              value="登录账号"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  alphaNum,
  email
} from "vuelidate/lib/validators";
import Identify from "@/components/util/BsCodeImage";
export default {
  name: "bslogin",
  components: {
    identify: Identify
  },
  data() {
    return {
      user: {
        unumber: "",
        upassword: "",
        code: ""
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: ""
    };
  },
  created() {
    this.user.unumber = this.$route.params.phone;
    this.user.upassword = this.$route.params.pwd;
  },
  validations: {
    user: {
      unumber: {
        required
      },
      upassword: {
        required
      },
      code: {
        required
      }
    }
  },
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeCode(4);
  },
  methods: {
    // 重置验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(4);
    },
    makeCode(length) {
      for (let i = 0; i < length; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //登入
    loginUser() {
      this.$refs.unumber.focus();
      this.$refs.upassword.focus();
      this.$refs.code.focus();
      if (!this.$v.user.unumber.$error && !this.$v.user.upassword.$error && !this.$v.user.code.$error) {
        
        if (this.user.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.$message.error('请填写正确验证码')
          this.refreshCode()
          return
        }
        this.$axios
          .post("../crm/ebapi/login/login_by_mobile_pwd", {
            phone: this.user.unumber,
            pwd: this.user.upassword
          })
          .then(res => {
            if (res.data.code == 200) {
              // this.loginStore(res.data.data);
              sessionStorage.setItem("user", JSON.stringify(res.data.data));
              window.location.href = "/";
              // this.$router.push({
              //   name: "bshomeLink"
              // });
            } else {
              this.$message.error(res.data.msg);
            }
          });
      }
    },
    ...mapMutations(["loginStore"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group-addon{
  padding: 0px;
}
.enterIncon > img {
  width: 40px;
}
/*****************/

.section {
  position: relative;
  background: #fff;
  z-index: 100;
}
.largeImg {
  width: 70%;
  height: 70%;
}
</style>
