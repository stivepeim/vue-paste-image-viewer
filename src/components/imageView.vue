<template>
  <div class="imageUpload" >
    <div class="imageUploadSelf" ref="imageUploadSelf">
      <input v-if="fileInSide" type="file" ref="imgUpload" :multiple="multiple" :name="name" :accept="accept" style="display: none;" @change="handleGetFile">
      <div class="selectedImg" >
        <div class="imgContainer" v-for="(img,index) in selectedImgData" :key="index">
          <img :src="img.url" lazy class="viewImg">
          <span class="del" @click="handleImgDel(index)" v-if="maxLength > 1">x</span>
        </div>
      </div>
      <i class="checkImg" @click="handleInputClick" v-if="fileInSide && selectedImgData.length < maxLength">Up</i>
      <span v-if="selectedImgData.length === 0" class="emptyText">粘贴图片</span>
    </div>
  </div>
</template>
/*
上传图片组件，支持剪切板粘贴图片。将图片本地显示后组件form参数后抛出，组件内实现图片预览和删除
思路：
1：将控件选择的数据传递进来做展示
2：将粘贴的图片结果传出去
后面用事件传递的方式将input想办法内置
TODO
1：删除图片按钮鼠标悬浮出现
*/
<script>
  import * as imgTools from './imgTools'
  export default {
    // name: "ImageUploadSelf"
    props:{
      accept:{
        type:String,
        default:'image/jp2,image/jpeg,image/gif,image/png,image/pjp,image/pjpeg,image/bmp'
      },
      fileInSide:{ // 控制input = file 组件是否在组件内
        type: Boolean,
        default: true
      },
      name:{
        type:String,
        default:'file[]'
      },
      multiple:{
        type:Boolean,
        default:false
      },
      uploadUrl:{
        type:String,
        default:`${process.env.BASE_API}upload`
      },
      maxLength:{ // 图片数量上限
        type:Number,
        default:1
      },
      pasteImg:{ //其他攻坚出发的粘贴图片数据
        type: Object
      }
    },
    watch:{
      pasteImg:function(o,n){
        if(!this.handleValidateMaxLimit()){
          if(!n.url){
            this.selectedImgData.push(o)
          }else{
            this.selectedImgData.push(n)
          }
        }
      }
    },
    data(){
      return{
        selectedImgData:[],
        delUpload: true
      }
    },
    mounted(){
      this.handlePatesImg(this.$refs.imageUploadSelf)
    },
    methods:{
      handleInputClick(){
        if(this.handleValidateMaxLimit()){
          return
        }
        this.$refs.imgUpload.click()
      },
      handleGetFile(){
        imgTools.getDataUrlByFile(this.$refs.imgUpload.files,imgTools.FILELIMIT.M2, (dataUrl)=> {
          if(this.handleValidateMaxLimit()){
            return
          }
          this.selectedImgData.push(dataUrl)
          this.$emit('selectedImages', this.selectedImgData)
        })
      },
      handleImgDel(index){
        this.selectedImgData.splice(index,1)
        this.$emit('selectedImages', this.selectedImgData)
      },
      open(){
        if(this.handleValidateMaxLimit()){
          return
        }
        this.$refs.imgUpload.click()
      },
      reset(){
        this.selectedImgData = []
      },
      handlePatesImg(refsImageUpload){
        imgTools.pasteImage(refsImageUpload, (imgBlobUrl,)=> {
          if(!imgBlobUrl){
            return
          }
          if(this.handleValidateMaxLimit()){
            return
          }
          this.selectedImgData.push(imgBlobUrl)
          this.$emit('selectedImages', this.selectedImgData)
        })
      },
      handleValidateMaxLimit(){
        return this.selectedImgData.length >= this.maxLength
      }
    }
  }
</script>

<style scoped>
  .imageUpload{
    display: flex;
  }
  .imageUploadSelf{
    width: 100%;
    min-height: 50px;
    margin: 5px;
    padding: 5px;
    border: #DCDFE6 solid 1px;
    float: left;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: hidden;
  }
  .selectedImg{
    overflow: auto;
    white-space: nowrap;
    overflow-y: hidden;
    position: relative;
  }
  .checkImg{
    display: flex;
    background-color: #EBEEF5;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    color: #C0C4CC;
  }
  .viewImg{
    margin: 5px;
    width: 100px;
    height: 100px;
  }
  .imgContainer{
    display: inline-block;
  }
  .imgContainer .del{
    position: relative;
    width: 15px;
    height: 15px;
    right: 30px;
    top: -85px;
    color: #F56C6C;
    background-color: white;
    border-radius: 8px;
    z-index: 1;
    display: inline-block;
    font-size: 13px;
    cursor: pointer;
  }
  .emptyText{
      color: gray;
  }
</style>
