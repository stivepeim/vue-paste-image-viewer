<template>
  <div id="app">
    <ul class='tips'>
      <li>数量显示可自定义，默认5张</li>
      <li>可以粘贴图片</li>
      <li>选择和粘贴的图片可删除</li>
      <li>在业务中也可以使用imgTools中的pasteImg方法注册多个可接收粘贴的dom</li>
    </ul>
    <img-upload-custom ref="imgUploadCustom" :maxLength="5" :multiple="true" :pasteImg="uploadConfig.pasteImg" @selectedImages="handleSelectedImages"></img-upload-custom>
    <button @click="handleUploadImg" :disabled="uploadConfig.selectedImgUpList.length === 0">你自己的上传事件</button>
  </div>
</template>

<script>
import imgUploadCustom from './components/imageView'

export default {
  name: 'App',
  components: {
    imgUploadCustom
  },
   data(){
    return{
      uploadConfig:{
        pasteImg:{},
        selectedImgUpList:[]
      }
    }
  },
  methods:{
    handleSelectedImages(selectedImageList){
      this.uploadConfig.selectedImgUpList = selectedImageList
    },
    handleUploadImg(){
      const _formData = this.uploadConfig.selectedImgUpList.map(item => { return item._formData })
      //这里的formData即可直接上传
      console.log('_formData:', _formData)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tips{
  text-align: left;
}
</style>
