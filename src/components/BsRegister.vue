<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:51:23
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 18:08:16
 -->
<template>
  <div class="bsregister">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src="@/assets/register.png" class="translateY largeImg" alt />
          </div>
          <div class="col-md-4 col-md-push-2 text-center" style="margin-top:50px;">
            <h2>
              欢迎注册
              <strong>叮当</strong>
            </h2>
            <!-- 输入用户名 -->
            <!-- <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.uname.$error }"
            >
              <input
                type="text"
                class="form-control"
                v-model.trim="user.uname"
                @blur="$v.user.uname.$touch()"
                placeholder="请输入您的用户名称,名称不可超过20个字符..."
                ref="uname"
              />
              <span
                class="glyphicon glyphicon-ok form-control-feedback"
                v-if="$v.user.uname.required && !$v.user.uname.$error"
              ></span>
              <span
                class="glyphicon glyphicon-warning-sign form-control-feedback"
                v-if="!$v.user.uname.maxLength && $v.user.uname.$error"
              ></span>
              <span class="help-block" v-if="$v.user.uname.$error">请输入正确信息</span>
            </div>-->
            <!-- 输入账号 -->

            <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.unumber.$error }"
            >
              <input
                type="text"
                class="form-control"
                v-model.trim="user.unumber"
                @blur="$v.user.unumber.$touch()"
                placeholder="请输入您的账号,账号不可小于6给字符..."
                ref="unumber"
              />
              <span
                class="glyphicon glyphicon-ok form-control-feedback"
                v-if="$v.user.unumber.required && !$v.user.unumber.$error"
              ></span>
              <span
                class="glyphicon glyphicon-warning-sign form-control-feedback"
                v-if="!$v.user.unumber.minLength && $v.user.unumber.$error"
              ></span>
              <span class="help-block" v-if="$v.user.unumber.$error">请输入正确信息</span>
            </div>
            <!-- 输入密码 -->
            <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.upassword.$error }"
            >
              <input
                type="password"
                class="form-control"
                v-model.trim="user.upassword"
                @blur="$v.user.upassword.$touch()"
                placeholder="请输入您的密码,账号不可小于6给字符..."
                ref="upassword"
              />
              <span
                class="glyphicon glyphicon-ok form-control-feedback"
                v-if="$v.user.upassword.required && !$v.user.upassword.$error"
              ></span>
              <span
                class="glyphicon glyphicon-warning-sign form-control-feedback"
                v-if="!$v.user.upassword.minLength && $v.user.upassword.$error"
              ></span>
              <span class="help-block" v-if="$v.user.upassword.$error">请输入正确信息</span>
            </div>
            <!-- 确认密码 -->
            <div
              class="form-group has-feedback has-success"
              :class="{'has-error':$v.user.confirmPassword.$error }"
            >
              <input
                type="password"
                class="form-control"
                v-model.trim="user.confirmPassword"
                placeholder="请再次输入您的密码..."
                @blur="$v.user.confirmPassword.$touch()"
                ref="confirmPassword"
              />
              <span
                class="glyphicon glyphicon-ok form-control-feedback"
                v-if="$v.user.confirmPassword.required && !$v.user.confirmPassword.$error"
              ></span>
              <span
                class="glyphicon glyphicon-warning-sign form-control-feedback"
                v-if="!$v.user.confirmPassword.sameAsPassword && $v.user.confirmPassword.$error"
              ></span>
              <span class="help-block" v-if="$v.user.confirmPassword.$error">请输入正确信息</span>
            </div>

            <input
              type="button"
              class="btn btn-success mt-3"
              style="width:100%;"
              @click="registerUser"
              value="注册账号"
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
  alphaNum
} from "vuelidate/lib/validators";
export default {
  name: "bsregister",
  data() {
    return {
      user: {
        uname: "",
        unumber: "",
        upassword: "",
        confirmPassword: ""
      }
    };
  },
  validations: {
    emailPrefix: {
      required
    },
    emailSuffix: {
      required
    },
    user: {
      // uname: {
      //   required,
      //   maxLength: maxLength(20)
      // },
      unumber: {
        required,
        minLength: minLength(11),
        async isUnique(value) {
          // 异步校验用户名是否已注册
          const response = await this.$axios.post(
            "../crm/ebapi/login/is_unique_mobile",
            {
              phone: value
            }
          );
          return response.data.msg;
        }
      },
      upassword: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("upassword")
      }
    }
  },
  methods: {
    registerUser() {
      // this.$refs.uname.focus();
      this.$refs.unumber.focus();
      this.$refs.upassword.focus();
      this.$refs.confirmPassword.focus();
      if (
        // !this.$v.user.uname.$error &&
        !this.$v.user.unumber.$error &&
        !this.$v.user.upassword.$error &&
        !this.$v.user.confirmPassword.$error
      ) {
        this.$axios
          .post("../crm/ebapi/login/register_by_mobile", {
            // uname: this.user.uname,
            phone: this.user.unumber,
            pwd: this.user.upassword
          })
          .then(res => {
            if (res.data.code == 200) {
              this.loginStore(res.data.data);
              this.$message("注册成功");

              this.$axios
                .post("../crm/ebapi/login/login_by_mobile_pwd", {
                  phone: this.user.unumber,
                  pwd: this.user.upassword
                })
                .then(res => {
                  sessionStorage.setItem("user", JSON.stringify(res.data.data));
                  window.location.href = "/";
                });
            } else {
              this.$message(res.data.msg);
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
/*****************/
.section {
  position: relative;
  background: #fff;
  z-index: 100;
}
.largeImg {
  width: 75%;
  height: 75%;
}
</style>
