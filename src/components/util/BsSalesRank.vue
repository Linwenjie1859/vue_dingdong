<template>
  <div class="bssalesrank">
    <div class="img-thumbnail">
      <div v-for="book in books">
        <div class="row">
          <div class="col-md-6 mt-3">
            <img src="@/assets/a.jpg" alt />
          </div>
          <div class="col-md-6 mt-3">
            <p class="text-has-omit" style="font-size:12px;">{{book.name}}</p>
            <p style="color:#c30000">
              <strong>￥{{book.price}}</strong>
            </p>
            <del>
              <strong class="text-muted">￥{{book.oldPrice}}</strong>
            </del>
            <p>
              <small>{{book.chatNumber}}条评论</small>
            </p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bssalesrank",
  data() {
    return {
      books: [
        {
          name:
            "笑背古诗：漫画版（全4册 ），中国诗词大会点评嘉宾推荐 含小学生必背古诗词75首+80首 适合小学生的国学经典儿童诗歌 当当首发独家",
          price: 70.0,
          oldPrice: 140.0,
          chatNumber: 5426
        },
        {
          name:
            "笑背古诗：漫画版（全4册 ），中国诗词大会点评嘉宾推荐 含小学生必背古诗词75首+80首 适合小学生的国学经典儿童诗歌 当当首发独家",
          price: 70.0,
          oldPrice: 140.0,
          chatNumber: 5426
        }
      ]
    };
  },
  props: {}
};
</script>

<style scoped>
.text-has-omit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /*设置显示多少行*/
  -webkit-line-clamp: 2;
  overflow: hidden;
}
img {
  height: 120px;
  width: 120px;
}
</style>
