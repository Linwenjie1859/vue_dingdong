<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr. Lin
 * @Date: 2019-06-08 09:55:13
 * @LastEditors: Mr. Lin
 * @LastEditTime: 2019-10-07 23:58:18
 -->
<template>
  <div class="sells">
    <div class="row">
      <div class="col-md-12 bg-white-radius div-has-padding">
        <h3>
          <blockquote>发布书籍</blockquote>
        </h3>
        <p>
          <input
            type="text"
            v-model="book.bname"
            class="form-control"
            placeholder="输入书籍名称...,例如：《朝花夕拾》"
          />
        </p>
        <p>
          <input
            type="text"
            v-model="book.bauthor"
            class="form-control"
            placeholder="输入书籍作者...,例如：鲁迅"
          />
        </p>
        <p>
          <input type="text" v-model="book.bnum" class="form-control" placeholder="输入书籍数量..." />
        </p>
        <p>
          <input
            type="text"
            v-model="book.bmoney"
            class="form-control"
            placeholder="输入书籍价钱...,例如：100元"
          />
        </p>
        <p>
          <textarea
            class="form-control"
            v-model="book.bdescription"
            style="height:200px;"
            placeholder="“回忆的记事”〔《三闲集·〈自选集〉自序》〕，比较完整地记录了鲁迅从幼年到青年时期的生活道路和经历，生动了描绘了清末民初的生活画面，是研究鲁迅早期思想和生活以至当时社会的重要艺术文献。这些篇章，文笔深沉隽永，是中国现代散文中的经典作品。"
          ></textarea>
        </p>
        <el-upload
          class="upload-demo"
          action="../cometomcat/bookInsert.form"
          :data="{   
            'bname':this.book.bname,
            'bauthor':this.book.bauthor,
            'bmoney':this.book.bmoney,
            'bdescription':this.book.bdescription,
            'bnum':this.book.bnum,
            'unumber':this.user.unumber,
            }"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :auto-upload="false"
          ref="upload"
          :on-success="handleSuccess"
          multiple
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitBook"
          >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sells",
  data() {
    return {
      book: {
        bname: "",
        bauthor: "",
        bmoney: "",
        bdescription: "",
        bnum: ""
      },
      user: {},
      fileList: [{}]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitBook() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
    }
  },
  created: function() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
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
textarea {
  resize: none;
}
</style>
