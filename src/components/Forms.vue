<template>
  <div class="forms">
    <input type="text" v-model="itemName">
    <!--<input type="text" v-model="itemThumbnail">-->
    <img :src="itemThumbnail" style="width: 500px;" v-show="itemThumbnail!=null">
    <p v-show="imgUploadProportion!=null">{{imgUploadProportion}}</p>
    <input type="file" name="file" ref="file"><button v-on:click="onClickUploadImg">画像をアップロード</button>
    <textarea v-model="itemDescription"></textarea>
  </div>
</template>

<script>
import axios from 'axios'
import ProgressPromise from 'progress-promise'

export default {
  name: 'Forms',
  props: {
    formId: null
  },
  data: function () {
    return {
      itemName: null,
      itemThumbnail: null,
      itemDescription: null,
      imgUploadProportion: null
    }
  },
  watch: {
    itemName() {
      this.onChangeValue()
    },
    itemThumbnail() {
      this.onChangeValue()
    },
    itemDescription() {
      this.onChangeValue()
    }
  },
  methods: {
    onChangeValue() {
      this.$emit('itemValues', {
        "formId": this.formId,
        "itemName": this.itemName,
        "itemThumbnail": this.itemThumbnail,
        "ItemDescription": this.itemDescription
      })
    },
    onClickUploadImg() {
      var params = new FormData()
      params.append('upload_file', this.$refs.file.files[0])
      new ProgressPromise((resolve, reject, progress) => {
        const config = {
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            progress(percentCompleted)
          }
        }
        axios.post("https://tsumugu.tech/gen_shareimg/upload.php", params, config).then(res => resolve(res)).catch(err => reject(err))
      })
      .progress(proportion => {
        this.imgUploadProportion = proportion+"%"
      })
      .then(response=>{
        this.imgUploadProportion = null
        console.log(response.data)
        if (response.data.error!=undefined) {
          alert("画像のアップロードに失敗しました")
        } else {
          this.itemThumbnail = response.data.imgurl
        }
      })
      .catch(error=>{
        this.imgUploadProportion = null
        console.log(error)
        alert("画像のアップロードに失敗しました")
      })
      /*
      console.log(params)
      axios.post("https://tsumugu.tech/gen_shareimg/upload.php", params)
      .then(response=>{
        if (response.data.error!=undefined) {
          console.log(response.data.error)
          alert("画像のアップロードに失敗しました")
        } else {
          console.log(response.data)
          this.itemThumbnail = response.data.imgurl
        }
      })
      .catch(error=>{
        console.log(error)
        alert("画像のアップロードに失敗しました")
      })
      */
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped lang="scss">
</style>
