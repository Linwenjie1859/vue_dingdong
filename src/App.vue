<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:35:04
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 14:45:48
 -->
<template>
  <div id="app">
    <bsheader></bsheader>
    <router-view style="margin-top:50px; min-height: 470px;"></router-view>
    <bsfooter :authorInfo="authorName"></bsfooter>
  </div>
</template>

<script>
import BsHeader from "./components/BsHeader";
import BsFooter from "./components/BsFooter";
export default {
  name: "App",
  data() {
    return {
      authorName: "Handsome Lin"
    };
  },

  components: {
    bsheader: BsHeader,
    bsfooter: BsFooter
  }
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/icon.css";
.text-has-omit-three {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /*设置显示多少行*/
  -webkit-line-clamp: 3;
  overflow: hidden;
  /*! autoprefixer: off */
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
}
.text-has-omit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /*设置显示多少行*/
  -webkit-line-clamp: 2;
  overflow: hidden;
  /*! autoprefixer: off */
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
}

.mt-1,
.my-1 {
  margin-top: 0.25rem !important;
}

.mr-1,
.mx-1 {
  margin-right: 0.25rem !important;
}

.mb-1,
.my-1 {
  margin-bottom: 0.25rem !important;
}

.ml-1,
.mx-1 {
  margin-left: 0.25rem !important;
}

.mt-2,
.my-2 {
  margin-top: 0.5rem !important;
}

.mr-2,
.mx-2 {
  margin-right: 0.5rem !important;
}

.mb-2,
.my-2 {
  margin-bottom: 0.5rem !important;
}

.ml-2,
.mx-2 {
  margin-left: 0.5rem !important;
}

.mt-3,
.my-3 {
  margin-top: 1rem !important;
}

.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.ml-3,
.mx-3 {
  margin-left: 1rem !important;
}

.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
}

.mr-4,
.mx-4 {
  margin-right: 1.5rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

.ml-4,
.mx-4 {
  margin-left: 1.5rem !important;
}

.mt-5,
.my-5 {
  margin-top: 3rem !important;
}

.mr-5,
.mx-5 {
  margin-right: 3rem !important;
}

.mb-5,
.my-5 {
  margin-bottom: 3rem !important;
}

.ml-5,
.mx-5 {
  margin-left: 3rem !important;
}
</style>
