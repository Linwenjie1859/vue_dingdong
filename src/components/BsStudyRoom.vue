<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-07-23 18:15:46
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-14 16:18:42
 -->
<template>
  <div class="bsstudyroom">
    <section class="section">
      <div class="container text-center">
        <div class="row scrollimation fade-right in">
          <img src="@/assets/widget.svg" alt />
        </div>
        <div class="row">
          <div class="col-md-12 col-xs-12 scrollimation fade-right in">
            <h2>
              <strong>叮当</strong> 云书房
            </h2>
            <p
              class="text-muted text-has-omit"
            >On the road to success, there will certainly be failures; For failure, we should treat and treat correctly, not afraid of failure, will become | Do not seek to be compared with others, but seek to go beyond themselves, to cry cry out excited tears, to laugh out of the growth of character!</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-md-push-3">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="输入关键字:书名、作者" v-model="keyWord" />
              <div class="input-group-btn">
                <button class="btn btn-success" @click="getSortGoods">立即查询</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding:30px 0">
      <div class="container">
        <div class="row">
          <!-- Nav tabs -->
          <div class="col-md-3 text-center">
            <ul class="nav nav-tabs nav-has-border-active" role="tablist">
              <li v-for="(item1,index1) in categoryList" :class="{'active' : index1==0}">
                <a
                  :href="'#'+item1.id"
                  aria-controls="networkBook"
                  role="tab"
                  data-toggle="tab"
                  @click="changeCurrentIndex(index1)"
                >
                  <strong style="display:block">{{item1.cate_name}}</strong>
                  <small
                    class="text-muted"
                    v-for="(item2,index2) in item1.child"
                  >{{item2.cate_name}} &nbsp;</small>
                </a>
              </li>
            </ul>
          </div>

          <!-- Tab panes -->
          <div class="col-md-9">
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active">
                <div class="row">
                  <div class="col-md-1">
                    <img src="@/assets/book_icon.svg" style="vertical-align: bottom;" alt />
                  </div>
                  <div class="col-md-5">
                    <Strong style="font-size:22px;">{{categoryList[currentIndex].cate_name}}</Strong>
                  </div>
                </div>
                <!-- /*****************/ -->
                <div class="row">
                  <div class="col-md-12">
                    <div class="flex align-center">
                      <div
                        class="flex align-center"
                        style="margin:10px 15px;"
                        @click="changeAllRank"
                      >
                        <strong
                          style="font-size:16px"
                          :class="[allOrder == 0 ? '' : 'text-orange']"
                        >综合</strong>
                        <div class="flex flex-direction" style="margin-left:3px;">
                          <span
                            class="cuIcon-fold"
                            style="height:8px;"
                            :class="[allOrder == 1 ?  'text-orange':'']"
                          ></span>
                          <span
                            class="cuIcon-unfold"
                            style="height:14px;"
                            :class="[allOrder == 2 ? 'text-orange':'']"
                          ></span>
                        </div>
                      </div>
                      <div
                        class="flex align-center"
                        style="margin:10px 15px;"
                        @click="changeSalesRank"
                      >
                        <strong
                          style="font-size:16px"
                          :class="[salesOrder == 0 ? '' : 'text-orange']"
                        >销量</strong>
                        <div class="flex flex-direction" style="margin-left:3px;">
                          <span
                            class="cuIcon-fold"
                            style="height:8px;"
                            :class="[salesOrder == 1 ? 'text-orange':'']"
                          ></span>
                          <span
                            class="cuIcon-unfold"
                            style="height:14px;"
                            :class="[salesOrder == 2 ? 'text-orange':'']"
                          ></span>
                        </div>
                      </div>
                      <div
                        class="flex align-center"
                        style="margin:10px 15px;"
                        @click="changePriceRank"
                      >
                        <strong
                          style="font-size:16px"
                          :class="[priceOrder == 0 ? '' : 'text-orange']"
                        >价格</strong>
                        <div class="flex flex-direction" style="margin-left:3px;">
                          <span
                            class="cuIcon-fold"
                            style="height:8px;"
                            :class="[priceOrder == 1 ? 'text-orange':'']"
                          ></span>
                          <span
                            class="cuIcon-unfold"
                            style="height:14px;"
                            :class="[priceOrder == 2 ? 'text-orange':'']"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <!-- 好评排行次级导航 -->
                    <div class="tab-content">
                      <div role="tabpanel" class="tab-pane active" id="praiseRank">
                        <div class="row mt-3">
                          <div
                            class="col-md-4"
                            style="margin:15px 0;"
                            v-for="(item1,index1) in goodsList"
                          >
                            <div class="flex bg-white radius">
                              <img
                                :src="item1.image"
                                alt
                                class="img-responsive img-has-shadow"
                                @click="toDetail(item1.id)"
                              />
                              <div
                                class="flex flex-direction justify-between"
                                style="padding-left:10px;"
                              >
                                <strong
                                  class="text-has-black text-has-omit-three"
                                  :title="item1.store_name"
                                >{{item1.store_name}}</strong>
                                <span class="text-has-red" style="font-size:16px;">￥{{item1.price}}</span>
                                <div class="flex align-center justify-between">
                                  <span style="font-size:12px">销量:{{item1.sales}}</span>
                                  <del style="font-size:12px">原价:{{item1.virtual_price}}</del>
                                </div>
                                <p class="text-has-omit">
                                  <small :title="item1.store_name">{{item1.store_name}}</small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /*****************/ -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "bsstudyroom",
  data() {
    return {
      goodsList: [],
      categoryList: [
        {
          cate_name: ""
        }
      ],
      //关键字
      keyWord: "",
      //控制价钱升降排序标记
      priceOrder: 0,
      //控制销量升降排序标记
      salesOrder: 0,
      //控制综合升降排序标记
      allOrder: 0,
      currentIndex: 0,
      currentId: 0
    };
  },
  created() {
    this.getCategoryList();
  },
  
  methods: {
    //改变综合排序
    changeAllRank() {
      this.allOrder = this.allOrder == 2 ? 0 : this.allOrder + 1;
      this.getSortGoods();
    },
    //改变销量排序
    changeSalesRank() {
      this.salesOrder = this.salesOrder == 2 ? 0 : this.salesOrder + 1;
      this.getSortGoods();
    },
    //改变价格排序
    changePriceRank() {
      this.priceOrder = this.priceOrder == 2 ? 0 : this.priceOrder + 1;
      this.getSortGoods();
    },

    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.currentId = this.categoryList[index].id;
      this.getSortGoods();
    },
    //获取分类列表
    getCategoryList() {
      this.$axios
        .post("../crm/ebapi/store_api/get_product_category", {})
        .then(res => {
          this.categoryList = res.data.data;
          this.currentId = this.categoryList[0].id;
          this.getSortGoods();
        });
    },
    getSortGoods() {
      this.goodsList = [];
      this.$axios
        .get("../crm/ebapi/store_api/get_product_list", {
          params: {
            cid: this.currentId,
            keyword: this.$route.params.keyWord?this.$route.params.keyWord: this.keyWord,
            priceOrder:
              this.priceOrder == 0 ? "" : this.priceOrder == 1 ? "desc" : "asc",
            salesOrder:
              this.salesOrder == 0 ? "" : this.salesOrder == 1 ? "desc" : "asc",
            news: "",
            page: "",
            limit: ""
          }
        })
        .then(res => {
          this.keyWord=this.$route.params.keyWord?this.$route.params.keyWord:this.keyWord;
          this.$route.params.keyWord=null;
          this.goodsList = res.data.data;
          // 添加一个虚拟价钱
          this.addVirtualPrice(this.goodsList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    addVirtualPrice(data) {
      for (var i = 0; i < data.length; i++) {
        data[i]["virtual_price"] = parseFloat(data[i].price) + 30;
      }
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

<style scoped>
.is-borderbox {
  box-sizing: border-box;
}
.scrollimation.fade-right {
  opacity: 0;
  -webkit-transform: translateX(-100px);
  -moz-transform: translateX(-100px);
  -ms-transform: translateX(-100px);
  transform: translateX(-100px);
  -webkit-transition: -webkit-transform 0.6s ease-out, opacity 0.6s ease-out;
  transition: transform 0.6s ease-out, opacity 0.6s ease-out;
}
.scrollimation.fade-right.in {
  opacity: 1;
  -webkit-transform: translateX(0px);
  -moz-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transform: translateX(0px);
}
/************************/
.bg-white {
  background: white;
}
.bg-gray-sotf {
  background: #f8fafa;
}
.img-has-shadow {
  height: 162px;
  width: 114px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05125);
}
.text-has-red {
  color: #c30000;
}
.text-has-black {
  color: #000;
}
.row > .nav-has-second-nav > li.active > a {
  border: none !important;
}

/****************************/

.section {
  position: relative;
  background: #fff;
  z-index: 100;
}
.nav-has-border-active > li {
  float: none;
}

.nav-has-border-active {
  border: none;
}

.nav-has-border-active > li > a {
  border-right: 1px solid #ddd;
  border-radius: 0;
  padding: 20px;
}

.nav-has-border-active > li.active > a {
  border: 1px solid #ddd !important;
  border-right: none !important;
}
</style>
