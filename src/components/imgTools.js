// 处理图片本身 功能

/**
 * 图片大小以M计算
 * @type {{M1: number, M2: number, M3: number, M4: number, M5: number, M6: number, M7: number, M8: number, M9: number, M10: number}}
 */
export const FILELIMIT = {
    M1:1,
    M2:2,
    M3:3,
    M4:4,
    M5:5,
    M6:6,
    M7:7,
    M8:8,
    M9:9,
    M10:10,
  }
  /**
   * 获取剪切板图片 输出DataUrl
   * @param target
   * @param fn
   */
  export function pasteImage(target, fn) {
    if(!target){
      return
    }
    target.addEventListener('paste', function(e){
      let clipboard = e.clipboardData;
      let type = clipboard.items[0].type;
      if(type.match(/image/)){
        let blob = clipboard.items[0].getAsFile()
        const imageUrl = URL.createObjectURL(blob)
        let formData = new FormData()
        formData.append('file[]', blob)
        return fn( { url: imageUrl, _formData: formData })
      }else{
        return
      }
    })
  }
  
  /**
   * 获取input=file的图片后转换DataUrl后返回
   * @param files
   * @param size
   * @param fn
   * @returns {boolean|*}
   */
  export function getDataUrlByFile(files,size, fn) {
    if (!files) return
    if (files.length === 0) return
    if (!size) return
    if (size === 0) return
    let fileArr = Object.keys(files).map((key) => {
      return {file: files[key]}
    })
    if(fileArr.length === 0){
        return
    }
    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i].file
      if (!/image\/\w+/.test(file.type)) {
        return false
      }
      const _fileProperty = file.size / 1024 / 1024 < size
      if (!_fileProperty) {
        continue
      }
      let imgUrl = URL.createObjectURL(file)
        let formData = new FormData()
        formData.append('file[]', file)
        fn({ url: imgUrl , _formData: formData} )
    }
  }
  
  /**
   * ref 传入的input=file控件 获取内容后返回formData
   * @param refsInput 必须是可用的dom元素 file=input
   * @param fileName
   * @param fn
   * @returns {boolean|*}
   */
  export function getFormDataByInputFile(refsInput, fileName='file[]', fn) {
    if(!refsInput) return
    let arr = Array.from(refsInput.files)
    if(arr.length === 0){
        return
    }
    let formData = new FormData()
    arr.map((item)=>{
      formData.append(fileName,item)
    })
    return fn(formData)
  }
  