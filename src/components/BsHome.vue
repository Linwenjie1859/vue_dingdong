<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:46:09
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-30 21:04:05
 -->
<template>
  <div class="bshome">
    <section class="section">
      <bssearchbox></bssearchbox>
    </section>

    <section class="section">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
          <li data-target="#carousel-example-generic" data-slide-to="3"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
          <div class="item" :class="{'active':index==0}" v-for="(item,index) in homeAllInfo.banner">
            <img :src="item.pic" class="img-carousel" />
            <div class="carousel-has-content">
              <h2>一本好书相伴一生</h2>
              <p class="mt-5">如果一本书就相当于一个人，我们一辈子都会认识许许多多的人，有些人注定是生命中的过客，而有些人注定相伴一生。</p>
              <button class="btn btn-danger mt-3">了解更多</button>
            </div>
          </div>
        </div>
        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </section>
    <section class="section" style="background:#ffffff;" :style="{height:heightMax+'px'}">
      <div class="container">
        <div class="row">
          <h2 class="text-center">
            <strong>主编推荐</strong>&nbsp;独家特供
          </h2>
        </div>
        <div class="row v-waterfall-content" id="v-waterfall">
          <div
            class="col-md-3 col-xs-12 v-waterfall-item"
            v-for="(item,index) in waterfallList"
            :style="{top:item.top+'px',left:item.left+'px',height:item.height} "
            ref="ele"
            @click="toDetail(item.id)"
            v-if="index<12"
          >
            <div class="img-thumbnail thumbnail-has-shadow">
              <img :src="item.image" alt />
              <h3 class="text-red">
                <span style="font-size:15px;">¥&nbsp;</span>
                {{item.price}}
              </h3>
              <h4>{{item.store_name}}</h4>
              <p class="text-grey">当当网官方旗舰店 等更多商家</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-blackwhite-vertical">
      <div class="container bg-white-radius">
        <div class="row">
          <h2 class="mb-5">
            <strong>热搜排行榜</strong>
          </h2>
        </div>
        <div class="row">
          <div
            class="col-md-4 has-right-border last-no-border"
            v-for="(item,index) in homeAllInfo.info.bastList"
            style="margin-bottom:20px;"
          >
            <span class="badge badge-size badge-color-first">{{index+1}}</span>
            <img :src="item.image" class="userHead" alt   @click="toDetail(item.id)"/>
            <p class="text-black text-cut" style="font-size:18px;margin-top:10px" :title="item.store_name"  @click="toDetail(item.id)">{{item.store_name}}</p>
            <div class="flex align-center">
                <span class="text-price text-red" style="font-size:28px;">{{item.price}}</span>
                <del class="text-grey self-end" style="margin:0 0 5px 10px">{{item.ot_price}}</del>
            </div>
            <div class="flex align-center justify-between text-black" style="margin:10px 0;">
              <span>销量:{{item.ficti}}</span>
              <span>作者:{{item.author}}</span>
              <span>出版社:{{item.press}}</span>
            </div>
            <p class="text-grey" style="text-indent:2em;height:60px;"  @click="toDetail(item.id)">{{item.store_info}}</p>
          </div>
        </div>
        <div class="row text-right">
          <router-link class="btn btn-success" :to="{name:'bsstudyroomLink'}">
            <span>查看更多</span>
            &nbsp;
            <span class="glyphicon glyphicon-chevron-right icon-size"></span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- <section class="section bg-blackwhite-soft" >
      <div class="container">
        <div class="row text-center mb-5">
          <h2 class="col-md-12">
            在适当的地方为
            <strong>您的访客服务</strong>
          </h2>
          <p
            class="text-muted col-md-8 col-md-push-2"
          >配置您的潜在客户生成软件，以便只有在有人访问特定页面时才会显示您的小部件。吸引并转换您的移动访问者 - 在智能手机上显示小部件并让观众保持参与</p>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <img src="@/assets/bg-phone.png" alt class="largeImg_blackwhite img-responsive" />
          </div>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script>
import BsSearchBox from "./util/BsSearchBox";
export default {
  name: "bshome",
  components: {
    bssearchbox: BsSearchBox
  },

  data() {
    return {
      waterfallList: [], //  处理好后的所有数据
      waterfallImgWidth: 235,
      waterfallImgCol: 0, //目标分成5列
      waterfallImgRight: 10,
      waterfallImgBottom: 10,
      waterfallDeviationHeight: [],
      heightMax: 0,
      /****************************** */
      homeAllInfo: {
        info:{
          bastList:[]
        }
      },
      user: {},
      authors: [{}, {}, {}],
      hotBooks: [{}, {}, {}, {}],
      books: [{}, {}, {}],
      carousels: [{}, {}, {}],
      allGoodBook: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      // searchKey: "",
      booksort: [
        { sort: "特色书单" },
        { sort: "网络文学" },
        { sort: "小说" },
        { sort: "特色书单" },
        { sort: "电子书 网络文学" }
      ]
    };
  },
  created() {
    this.getHomeAllInfo();
    this.getProductCate();
  },

  methods: {
    toDetail(id) {
      this.$router.push({
        name: "bsstoredetailLink",
        params: {
          id: id
        }
      });
    },
    //计算每个图片的宽度或者是列数
    calculationWidth(ele) {
      let domWidth = document.getElementById("v-waterfall").offsetWidth;
      if (!this.waterfallImgWidth && this.waterfallImgCol) {
        this.waterfallImgWidth =
          (domWidth - this.waterfallImgRight * this.waterfallImgCol) /
          this.waterfallImgCol;
      } else if (this.waterfallImgWidth && !this.waterfallImgCol) {
        this.waterfallImgCol = Math.floor(
          domWidth / (this.waterfallImgWidth + this.waterfallImgRight)
        );
      }
      this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
      for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
        this.waterfallDeviationHeight[i] = 0;
      }
      this.imgPreloading(ele);
    },
    //图片预加载
    imgPreloading(ele) {
      for (let i = 0; i < this.waterfallList.length; i++) {
        this.waterfallList[i].height = ele[i].clientHeight;
        this.waterfallList[i].width = ele[i].clientWidth;
        this.rankImg(this.waterfallList[i]);
      }
    },
    //瀑布流布局
    rankImg(waterfallList) {
      let minIndex = this.filterMin();
      waterfallList.top = this.waterfallDeviationHeight[minIndex];
      waterfallList.left =
        minIndex * (this.waterfallImgRight + waterfallList.width);
      this.waterfallDeviationHeight[minIndex] +=
        waterfallList.height + this.waterfallImgBottom;
      this.heightMax = Math.max.apply(null, this.waterfallDeviationHeight) + 50;
    },
    /**
     * 找到最短的列并返回下标
     * @returns {number} 下标
     */
    filterMin() {
      const min = Math.min.apply(null, this.waterfallDeviationHeight);
      return this.waterfallDeviationHeight.indexOf(min);
    },

    /*********************************/
    /**
     * @Modify: Mr. Lin
     * @function: 获得获取一级和二级分类
     * @instructions:
     * @param {type}
     * @return: JSON
     */
    getProductCate() {
      this.$axios
        .post("../crm/ebapi/store_api/get_product_category", {})
        .then(res => {
          this.getProductInfo(1);
        });
    },
    /**
     * @Modify: Mr. Lin
     * @function: 根据分类cid查询该类下的所有的商品
     * @instructions:
     * @param {type}
     * @return: JSON
     */
    getProductInfo(cid) {
      this.$axios
        .post("../crm/ebapi/store_api/get_product_list", {
          cid: cid,
          keyword: "",
          priceOrder: "",
          salesOrder: "",
          news: "",
          page: "",
          limit: ""
        })
        .then(res => {
          this.waterfallList = res.data.data;
          this.$nextTick(() => {
            setTimeout(() => {
              this.calculationWidth(this.$refs.ele);
              this.$forceUpdate();
            }, 200);
          });
        });
    },
    /**
     * @Modify: Mr. Lin
     * @function: 获得banner图片
     * @instructions:
     * @param {type}
     * @return: JSON
     */
    getHomeAllInfo() {
      this.$axios.post("../crm/ebapi/public_api/index", {}).then(res => {
        this.homeAllInfo = res.data.data;
      });
    },
    toDetail(id) {
      this.$router.push({
        name: "bsstoredetailLink",
        params: {
          id: id
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-waterfall-content {
  width: 100%;
  height: 100%;
  position: relative;
}
.v-waterfall-item {
  position: absolute;
}
.v-waterfall-item img {
  width: 170px;
  height: auto;
}
.text-red {
  font-family: arial;
  font-weight: 400;
  color: #ff0036;
}
.nav-tabs {
  border: none;
}
.has-border {
  border-bottom: 1px solid #eee;
}

.text-has-red {
  color: #c30000;
}
.div-is-inline {
  display: inline-block;
  padding: 0 40px;
}
.img-has-shadow {
  height: 160px;
  width: 150px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05125);
}
.text-has-black {
  color: #000;
}
.div-has-tmlr-padding {
  padding: 30px 10px;
}
.nav-tabs > li.active > a:hover {
  background-color: #fff;
}
.nav-tabs > li {
  width: 25%;
  text-align: center;
  border-right: 1px solid rgb(221, 221, 221);
}

.nav-tabs > li:nth-last-of-type(1) {
  border-right: none;
}
.nav-tabs > li > a {
  width: 100%;
  color: #777;
}
.nav-tabs > li.active > a {
  background-color: #f8fafa;
  border: none !important;
  border-bottom: 2px solid #008aff !important;
}
.carousel-inner > .item > img {
  height: 500px !important;
}
@media (max-width: 768px) {
  .carousel-inner > .item > img {
    height: 300px !important;
  }
  .carousel-has-content {
    bottom: 10% !important;
  }
}

.carousel-has-content {
  bottom: 30%;
  position: absolute;
  right: 15%;
  left: 15%;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.img-carousel {
  width: 100%;
}
.carousel-control.right {
  background-image: none;
}
.carousel-control.left {
  background-image: none;
}
.section {
  position: relative;
  background: white;
  z-index: 100;
}

.highlight-ul {
  list-style-image: url("../assets/yes.svg");
  line-height: 20px;
}
.thumbnail-has-shadow {
  transition: all 0.25s ease;
  padding: 25px !important;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
  border: 1px solid #f5f5f5;
  border-radius: 2px;
}
.thumbnail-has-shadow:hover {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05125);
  -webkit-transform: scale(0.96);
  transform: scale(0.96);
}
.img-thumbnail > img {
  border: 1px solid rgba(119, 119, 119, 0.288);
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.card-has-margin {
  margin: 30px 0;
  padding: 30px;
}
img {
  height: 200px;
  width: 200px;
}
.largeImg {
  width: 90%;
  height: 90%;
}
.largeImg_blackwhite {
  width: 70%;
  height: 70%;
  margin: 0 auto;
}
.bg-muted-sotf {
  background-color: #f8fafa;
}
.bg-blackwhite-vertical {
  background: linear-gradient(-10deg, #f5f5f5 50%, #fff 50%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 60px 0;
}
.bg-blackwhite-soft {
  background: linear-gradient(185deg, #f5f5f5 50%, #fff 50%);
  background-size: 100% 80%;
  background-repeat: no-repeat;
  padding: 0 0 64px;
}
.bg-white-radius {
  padding: 20px 50px 100px 50px;
  background-color: #fff;
  box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.07);
  /* box-shadow: 0 2px 38px 0 rgba(0,0,0,.07); */
  border-top-right-radius: 100px;
  border-bottom-left-radius: 100px;
}
.userHead {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.badge-size {
  position: absolute;
  font-size: 20px;
}
.icon-size {
  font-size: 10px;
}
.badge-color-first {
  background-color: #f54545;
}
.badge-color-second {
  background-color: #ff8547;
}
.badge-color-three {
  background-color: #ffac38;
}
.has-right-border {
  border-right: 1px dashed rgba(0, 0, 0, 0.568);
}
.last-no-border:nth-last-child(1) {
  border: none;
}
/********************/
/* .translateY {
  position: relative;
  -webkit-transform: translatey(0);
  transform: translatey(0);
  -webkit-animation: float 12s ease-in-out infinite;
  animation: float 12s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0);
  }
} */
</style>
