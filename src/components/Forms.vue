<template>
  <div class="forms">
    <div class="forms__area">
      <h2>{{title}}</h2>
    </div>
    <div class="forms__area">
      <h3>title</h3>
      <input type="text" v-model="itemName">
    </div>
    <div class="forms__area">
      <h3>Image</h3>
      <div v-show="itemThumbnail!=null">
        <img :src="itemThumbnail" style="max-width: 300px;">
      </div>
      <div v-show="imgUploadProportion!=null">
        <p>{{imgUploadProportion}}</p>
      </div>
      <div>
        <div><input type="file" name="file" ref="file"></div>
        <div><button v-on:click="onClickUploadImg">画像をアップロード</button></div>
      </div>
    </div>
    <div class="forms__area" v-show="isDispDiscription">
      <h3>Description</h3>
      <textarea v-model="itemDescription"></textarea>
    </div>
    <div class="forms__area">
      <button v-on:click="onChangeValue">このアイテムの内容を確定(編集可能)</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProgressPromise from 'progress-promise'

export default {
  name: 'Forms',
  props: {
    formId: null,
    title: null,
    isDispDiscription: false,
    propsItems: null
  },
  data: function () {
    return {
      itemName: null,
      itemThumbnail: "https://tsumugu.tech/gen_shareimg/tmp/uploads/uploads_604377124a3e2.png",
      itemDescription: null,
      imgUploadProportion: null
    }
  },
  methods: {
    onChangeValue() {
      this.$emit('itemValues', {
        "formId": this.formId,
        "itemName": this.itemName,
        "itemThumbnail": this.itemThumbnail,
        "ItemDescription": this.itemDescription,
        "isEdited": (this.propsItems!=null)
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
    }
  },
  mounted() {
    if (this.propsItems != null) {
      this.itemDescription = this.propsItems.ItemDescription
      this.itemName = this.propsItems.itemName
      this.itemThumbnail = this.propsItems.itemThumbnail
    }
  }
}
</script>

<style scoped lang="scss">
h2, h3 {
  margin: 0;
  padding: 0;
}
.forms {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 0.25rem;
  &__area {
    margin-top: 10px;
  }
}
</style>
