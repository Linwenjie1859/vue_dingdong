<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:50:28
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 17:05:37
 -->
<template>
  <div class="bsfooter" style="border-top:2px solid #f5f5f5;">
    <div class="container" >
      <div class="row">
        <div class="col-xs-12 col-md-12">
          <div class="row">
            <div class="col-xs-7 col-sm-7 col-md-7" >
              <h3 class="text-grey">Information</h3>
              <p class="text-gray" style="text-indent: 2em;">
                读书诱发了人的思绪，使想象超越时空;读书丰富了人的思想，如接触博大智慧的老人;读书拓展了人的精神世界，使人生更加美丽。
              </p>
              <p class="text-gray" style="text-indent: 2em;"> 
                读书可以充实我们的思想，可以丰富我们的情感，可以教给我们本领，可以纠正我们的过失，在书籍中，你可以真切地感受到生活原本是如此地美好!
              </p>
              <!-- <h3 class="text-muted">{{info.title}}</h3>
              <ul class="list-unstyled">
                <li v-for="item in info.array">
                  <a href="#">{{item}}</a>
                </li>
              </ul> -->
            </div>
            <div class="col-md-3 text-right col-md-push-2" style="margin-top:50px;">
              <ul class="list-unstyled">
                <li>
                  <img src="@/assets/icon_1.png" alt style="heigth:20px;width:20px;" />
                </li>
                <li>
                  <img src="@/assets/icon-dashboard.png" alt style="heigth:20px;width:20px;" />
                </li>
                <li>
                  <p>
                    <a href="valentine.vswxx.top">Come on. Come on. Better tomorrow</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bsfooter",
  props: ["authorInfo"],
  data() {
    return {
      footerInfo: [{
        title:"友情链接",
        array:['百度','有道','淘宝网','京东']
      },{
        title:"公司产品",
        array:['叮当书城','叮当网','小程序','叮当App']
      },{
        title:"关于我们",
        array:['联系电话','邮箱地址','在线客服','贴吧交流']
      }]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .bsfooter {
  padding: 20px 0;
  /* font-size: 16px;
  background: #f8fafa;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 0 !important; */
} 
</style>
