<template>
  <div class="MakeingImageForm">
    <div><img :src="imgUrl" style="width:60%"></div>
    <div><input type="text" v-model="matomeTitle"></div>
    <div><Forms formId="0" @itemValues="onChangeEmitItemValues" /></div>
    <div><Forms formId="1" @itemValues="onChangeEmitItemValues" /></div>
    <div><Forms formId="2" @itemValues="onChangeEmitItemValues" /></div>
    <div><Forms formId="3" @itemValues="onChangeEmitItemValues" /></div>
    <button v-on:click="onSubmit">画像を生成する</button>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
import MyUtil from '@/assets/js/MyUtil.js'
import Forms from '@/components/Forms.vue'

export default {
  name: 'MakeingImageForm',
  props: {
    imageFormId: null,
    imgUrls: {}
  },
  data: function () {
    return {
      MU: null,
      matomeTitle: null,
      imgUrl: null,
      postData: {},
    }
  },
  components: {
    Forms
  },
  watch: {
    matomeTitle() {
      this.onChangeValue()
    },
    imgUrls() {
      var imagesArray = this.imgUrls.map(e=>{
        if (Object.keys(e)[0] == this.imageFormId) {
          return e[Object.keys(e)[0]]
        }
      }).filter(Boolean)
      if (this.MU.isAllValueNotEmpty([imagesArray[0]])) {
        this.imgUrl = imagesArray[0]
      }
    }
  },
  methods: {
    onChangeEmitItemValues(values) {
      this.postData[values.formId] = values
      this.onChangeValue()
    },
    onChangeValue() {
      this.$emit('itemValues', {
        "imageFormId": this.imageFormId,
        "title": this.matomeTitle,
        "items": this.postData
      })
    },
    onSubmit() {
      this.$emit('onSubmit', this.imageFormId)
    }
  },
  mounted() {
    this.MU = new MyUtil()
  }
}
</script>

<style scoped lang="scss">
</style>