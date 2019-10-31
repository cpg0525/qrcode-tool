<template>
  <div class="container">
    <Logo />
    <div class="el-custom-operator">
      <div class="el-custom-input">
        <el-input placeholder="请输入网址" v-model="url" clearable></el-input>
      </div>
      <div class="el-custom-file">
        <el-upload
          action="/action/upload/files"
          :limit="1"
          :multiple="false"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </div>
    <div class="el-custom-button">
      <el-button type="primary" icon="el-icon-mouse" @click="creat">生成二维码</el-button>
    </div>
    <div class="el-custom-image">
      <el-image :src="img" :preview-src-list="preview" alt="二维码图片" fit="contain">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <el-button type="primary" icon="el-icon-search" @click="search">查询数据库</el-button>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import axios from 'axios';
export default {
  data() {
    return {
      url: '',
      img: '',
      preview: [],
      dialogImageUrl: '',
      dialogVisible: false,
      picture: ''
    };
  },
  methods: {
    creat() {
      const o = this.picture || this.url;
      if (o && !/^[\u4e00-\u9fa5]{0,}$/.test(o)) {
        axios.get(`/action/get/qrcode?url=${o}`).then(res => {
          if (res.data.data) {
            this.img = res.data.data;
            this.preview = [this.img];
          }
        });
      } else {
        this.$message({
          message: '请输入正确的网址（不能是中文）',
          type: 'error',
          center: true
        });
      }
    },
    handleSuccess(e) {
      if (e && e.status === 1) {
        this.picture = e.url;
      }
    },
    handleRemove() {
      this.img = '';
      this.preview = [];
    },
    search() {
      axios.get('/action/get/mysql').then(res => {
        console.log('res:', res);
      });
    }
  },
  watch: {
    url(m) {
      if (m === '') {
        this.img = '';
        this.preview = [];
      }
    }
  },
  components: {
    Logo
  }
};
</script>

<style lang='scss'>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  .el-custom-operator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-custom-file {
      .el-upload--picture-card,
      .el-upload-list__item {
        max-width: 80px;
        max-height: 80px;
        line-height: 80px;
      }
    }
  }
  .el-custom-input {
    flex: 1;
    margin-right: 20px;
  }
  .el-custom-button {
    display: block;
  }
  .el-custom-image {
    max-width: 220px;
  }
  [class*='el-custom-'] {
    margin-top: 30px;
  }
}
</style>
