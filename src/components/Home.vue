<template>
  <div class="home">
    <h1>画像作成ページ</h1>
    <div><button v-on:click="onClickTweetButton">{{profile.twitterDisplayName}}(@{{profile.twitterScreenName}})でツイート</button></div>
    <hr>
    <MakeingImageForm imageFormId="0" @onChangeImageUrl="onChangeImageUrl" />
    <MakeingImageForm imageFormId="1" @onChangeImageUrl="onChangeImageUrl" />
    <MakeingImageForm imageFormId="2" @onChangeImageUrl="onChangeImageUrl" />
    <MakeingImageForm imageFormId="3" @onChangeImageUrl="onChangeImageUrl" />
  </div>
</template>

<script>
import axios from 'axios'
import MyUtil from '@/assets/js/MyUtil.js'
import MakeingImageForm from '@/components/MakeingImageForm.vue'

export default {
  name: 'Home',
   props: {
    profile: null
  },
  components: {
    MakeingImageForm
  },
  data: function () {
    return {
      MU: null,
      imgUrls: {}
    }
  },
  methods: {
    onChangeImageUrl(value) {
      this.imgUrls[value.imageFormId] = value.imgUrl
    },
    onClickTweetButton() {
      var imgUrls = this.imgUrls.map(e=>{
        return e[Object.keys(e)[0]]
      }).filter(Boolean)
      if (imgUrls.length == 0) {
        alert("ツイートするには画像を生成してください")
        return false
      }
      axios.post('https://tsumugu.tech/gen_shareimg/tweetimages.php', {
        "twitterToken": this.profile.twitterToken,
        "twitterSecret": this.profile.twitterSecret,
        "imgUrls": imgUrls
      }).then(res=>{
        console.log(res)
        if (!this.MU.isAllValueNotEmpty([res.data.errors])) {
          alert("ツイートしました")
        } else {
          alert("ツイートに失敗しました")
        }
      })
    }
  },
  mounted() {
    this.MU = new MyUtil()
  }
}
</script>

<style scoped lang="scss">
</style>
