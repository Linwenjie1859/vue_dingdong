<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 10:16:35
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-06-08 10:16:35
 -->
<template>
  <div class="bsabout"> 
    <div class="container">
      <hr>
      <div class="row">
        <div class="col-sm-12">
          <div v-for="user in userInfo">
            <div class="row" v-if="user.who==1">
              <div class="col-sm-1 pull-left">
                <img src="../assets/a1.png" alt />
                <span class="badge" style="background:#4cae4c">&nbsp;{{user.role}}&nbsp;</span>
              </div>
              <div class="col-sm-10 pull-left well">
                <strong>{{user.name}}</strong> 
                <small>{{user.time}}</small>
                 
                <div class="row mt-3">
                  <div class="col-sm-12">
                    <p>{{user.Chat}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-if="user.who==2">
              <div class="col-sm-1 pull-right">
                <span class="badge" style="background:#4cae4c">&nbsp;{{user.role}}&nbsp;</span>
                <img src="../assets/a2.png" alt />
              </div>
              <div class="col-sm-10 pull-right well">
                <strong class="pull-right">{{user.name}}</strong> 
                <small class="pull-right">{{user.time}}</small> 
                <div class="row pull-right mt-3">
                  <div class="col-sm-12">
                    <p>{{user.Chat}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-7">
          <input type="text" class="form-control">
        </div>
        <div class="col-sm-2">
          <button class="btn btn-success" value="">发送</button>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "bsabout",
  data() {
    return {
      userInfo: [
        {
          name: "张海天",
          time: "2019-8-9 12:00:00",
          Chat: "真理惟一可靠的标准就是永远自相符合。 —— 欧文",
          role: "医生",
          who: 1
        },
        {
          name: "张晓霞",
          time: "2019-8-9 12:00:00",
          Chat: `我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田
            我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田
            我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田`,
          role: "病人",
          who: 2
        },
        {
          name: "张海天",
          time: "2019-8-9 12:00:00",
          Chat: "真理惟一可靠的标准就是永远自相符合。 —— 欧文",
          role: "医生",
          who: 1
        },
        {
          name: "张晓霞",
          time: "2019-8-9 12:00:00",
          Chat:
            "时间是一切财富中最宝贵的财富。 —— 欧文时间是一切财富中最宝贵的财富。 —— 欧文时间是一切财富中最宝贵的财富。 —— 欧文时间是一切财富中最宝贵的财富。 —— 欧文时间是一切财富中最宝贵的财富。 —— 欧文",
          role: "病人",
          who: 2
        },
        {
          name: "张海天",
          time: "2019-8-9 12:00:00",
          Chat: "真理惟一可靠的标准就是永远自相符合。 —— 欧文",
          role: "医生",
          who: 1
        },
        {
          name: "张晓霞",
          time: "2019-8-9 12:00:00",
          Chat: "真理惟一可靠的标准就是永远自相符合。 —— 欧文",
          role: "病人",
          who: 2
        },
        {
          name: "张海天",
          time: "2019-8-9 12:00:00",
          Chat: "真理惟一可靠的标准就是永远自相符合。 —— 欧文",
          role: "医生",
          who: 1
        },
        {
          name: "张晓霞",
          time: "2019-8-9 12:00:00",
          Chat:
            "我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田",
          role: "病人",
          who: 2
        },
        {
          name: "张晓霞",
          time: "2019-8-9 12:00:00",
          Chat:
            "我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田",
          role: "病人",
          who: 2
        },
        {
          name: "张海天",
          time: "2019-8-9 12:00:00",
          Chat: "真理惟一可靠的标准就是永远自相符合。 —— 欧文.这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯。 —— 歌德。这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯。 —— 歌德",
          role: "医生",
          who: 1
        }
      ]
    };
  },
  props:{

  },
  methods: {},
  components: {}
};
</script>

<style scoped>
.el-upload__input {
  display: none !important;
}
img {
  width: 50px;
  height: 50px;
}
</style>
