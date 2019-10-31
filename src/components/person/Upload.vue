<template>
  <div class="upload">
    <div class="row">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              电子书籍
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#bookPass" role="tab" data-toggle="tab">审核通过</a>
              </li>
              <li>
                <a href="#bookNoPass" role="tab" data-toggle="tab">未通过</a>
              </li>
            </ul>
          </li>
          <li role="presentation" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown">
              写作文章
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#articlePass" role="tab" data-toggle="tab">审核通过</a>
              </li>
              <li>
                <a href="#articleNoPass" role="tab" data-toggle="tab">未通过</a>
              </li>
            </ul>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content div-has-min-height">
          <!-- 电子书籍 -->
          <div role="netBookPass" class="tab-pane active" id="bookPass">
            <!-- 没有的数据模块 -->
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="@/assets/empty.png" alt />
                <p class="text-muted">您还没有上传电子书</p>
              </div>
            </div>
          </div>
          <div role="netBookNoPass" class="tab-pane" id="bookNoPass">
            <!-- 没有的数据模块 -->
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="@/assets/empty.png" alt />
                <p class="text-muted">您没有未通过的电子书</p>
              </div>
            </div>
          </div>
          <!-- 写作文章 -->
          <div role="articlePass" class="tab-pane" id="articlePass">
            <!-- 没有的数据模块 -->
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="@/assets/empty.png" alt />
                <p class="text-muted">您还没有上过文章</p>
              </div>
            </div>
          </div>
          <div role="articleNoPass" class="tab-pane" id="articleNoPass">
            <!-- 没有的数据模块 -->
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="@/assets/empty.png" alt />
                <p class="text-muted">您没有未通过的过文章</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-white-radius {
  background: #fff;
  border-radius: 10px;
}
.div-has-padding {
  padding-top: 30px;
  padding-bottom: 30px;
}
.nav-tabs > li.active > a {
  border: none !important;
  border-bottom: 2px solid #008aff !important;
}
.div-has-min-height {
  min-height: 500px;
}
@media (max-width: 768px) {
  .div-has-min-height {
  }
}
</style>
