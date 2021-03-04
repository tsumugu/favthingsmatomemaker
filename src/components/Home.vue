<template>
  <div class="home">
    <h1>画像作成ページ</h1>
    <div><button v-on:click="onClickTweetButton">{{profile.twitterDisplayName}}(@{{profile.twitterScreenName}})でツイート</button></div>
    <hr>
    <MakeingImageForm imageFormId="0" @itemValues="onChangeEmitItemValues" @onSubmit="onSubmit" :imgUrls="imgUrls" />
    <MakeingImageForm imageFormId="1" @itemValues="onChangeEmitItemValues" @onSubmit="onSubmit" :imgUrls="imgUrls" />
    <MakeingImageForm imageFormId="2" @itemValues="onChangeEmitItemValues" @onSubmit="onSubmit" :imgUrls="imgUrls" />
    <MakeingImageForm imageFormId="3" @itemValues="onChangeEmitItemValues" @onSubmit="onSubmit" :imgUrls="imgUrls" />
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
      items: {},
      MU: null,
      imgUrls: []
    }
  },
  methods: {
    onChangeEmitItemValues(values) {
      this.items[values.imageFormId] = values
    },
    postGenImgAPI(postObj) {
      return axios.post('https://tsumugu.tech/gen_shareimg/get.php', postObj)
    },
    onSubmit(formId) {
      var e = this.items[formId]
      // 指定のformIdの要素の存在確認
      if (!this.MU.isAllValueNotEmpty([e])) {
        alert("入力してください")
        return false
      }
      var title = e.title
      // titleのnullチェック
      if (!this.MU.isAllValueNotEmpty([title])) {
        alert("タイトルを入力してください")
        return false
      }
      var items = Object.keys(e.items).map(l=>{
        var f = e.items[l]
        if (this.MU.isAllValueNotEmpty([f.itemName, f.itemThumbnail])) {
          return {
            "title": f.itemName,
            "description": f.ItemDescription,
            "thumbnail": f.itemThumbnail
          }
        }
      }).filter(Boolean)
      // タイトルとサムネが入力されていない場合mapで弾かれるので、処理前後で配列の要素数を比較することで正しく入力されているかを確認できる
      if (Object.keys(e.items).length != items.length) {
        alert("アイテムのタイトルと画像は必須項目です")
        return false
      }
      var resItems = {}
      resItems["top"] = items[0]
      items.shift()
      resItems["other"] = items

      var postObj = {}
      postObj["title"] = title
      postObj["items"] = resItems
      this.postGenImgAPI(postObj).then(response=>{
        // すでに画像があったら削除する
        this.imgUrls = this.imgUrls.map(e=>{
          if (Object.keys(e)[0] != formId) {
            return e
          }
        }).filter(Boolean)

        this.imgUrls.push({[formId]: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
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
