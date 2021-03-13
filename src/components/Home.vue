<template>
  <div class="home">
    <modal name="previewtweetimg-modal">
      <div>
        <div class="home__previewtweetimg-modal__imgswrapper"  v-bind:class="{ gridColumns: imgUrls.length>1 }">
          <div v-for="imgUrl in this.imgUrls"><img :src="imgUrl"></div>
        </div>
        <div><!--<button v-on:click="onClickSaveImgButton">ツイートせずに保存して終了</button>--><button class="active" v-on:click="onClickTweetButton">{{profile.twitterDisplayName}}(@{{profile.twitterScreenName}})でツイート</button></div>
      </div>
    </modal>
    <MakeingImageForm imageFormId="0" ref="mif-0" :genedImgUrls="imgUrls" @onChangeImageUrl="onChangeImageUrl" @openPreviewTweetImgModal="openPreviewTweetImgModal" @openNewMakingImageForm="openNewMakingImageForm" />
    <MakeingImageForm imageFormId="1" ref="mif-1" :genedImgUrls="imgUrls" style="display:none;" @onChangeImageUrl="onChangeImageUrl" @openPreviewTweetImgModal="openPreviewTweetImgModal" @openNewMakingImageForm="openNewMakingImageForm" />
    <MakeingImageForm imageFormId="2" ref="mif-2" :genedImgUrls="imgUrls" style="display:none;" @onChangeImageUrl="onChangeImageUrl" @openPreviewTweetImgModal="openPreviewTweetImgModal" @openNewMakingImageForm="openNewMakingImageForm" />
    <MakeingImageForm imageFormId="3" ref="mif-3" :genedImgUrls="imgUrls" style="display:none;" @onChangeImageUrl="onChangeImageUrl" @openPreviewTweetImgModal="openPreviewTweetImgModal" @openNewMakingImageForm="openNewMakingImageForm" />
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
      imgUrlsObj: {},
      imgUrls: [],
      dispMakingImageFormId: 0,
      //imgUrls: ["https://tsumugu.tech/gen_shareimg/tmp/imgs/img_6049bc00f0cae7.02140448.png", "https://tsumugu.tech/gen_shareimg/tmp/imgs/img_6049bc00f0cae7.02140448.png", "https://tsumugu.tech/gen_shareimg/tmp/imgs/img_6049bc00f0cae7.02140448.png", "https://tsumugu.tech/gen_shareimg/tmp/imgs/img_6049bc00f0cae7.02140448.png"]
    }
  },
  methods: {
    onChangeImageUrl(value) {
      this.imgUrlsObj[value.imageFormId] = value.imgUrl
      this.imgUrls = Object.keys(this.imgUrlsObj).map(k=>{
        return this.imgUrlsObj[k]
      }).filter(Boolean)
    },
    openPreviewTweetImgModal() {
      this.$modal.push('previewtweetimg-modal')
    },
    openNewMakingImageForm() {
      var currentMIFElm = this.$refs["mif-"+this.dispMakingImageFormId]
      if (currentMIFElm!=undefined) {
        currentMIFElm = currentMIFElm.$el
      }
      this.dispMakingImageFormId += 1
      var nextMIFElm = this.$refs["mif-"+this.dispMakingImageFormId]
      if (nextMIFElm!=undefined) {
        nextMIFElm = nextMIFElm.$el
      }
      //現在のMIFをfadeout
      if (nextMIFElm != undefined) {
        currentMIFElm.classList.add('animate__animated', 'animate__fadeOutLeft')
        currentMIFElm.addEventListener('animationend', () => {
          currentMIFElm.style.display = "none"
          //次のMIFをfadein
          nextMIFElm.style.display = "block"
          nextMIFElm.classList.add('animate__animated', 'animate__fadeInRight')
        })
      }
    },
    onClickSaveImgButton() {
      // TODO: firestoreにimgUrlsを保存する処理を書く
    },
    onClickTweetButton() {
      if (this.imgUrls.length == 0) {
        //alert("ツイートするには画像を生成してください")
        this.$dialog.alert('ツイートするには画像を生成してください', {okText: 'OK'})
        return false
      }
      axios.post('https://tsumugu.tech/gen_shareimg/tweetimages.php', {
        "twitterToken": this.profile.twitterToken,
        "twitterSecret": this.profile.twitterSecret,
        "imgUrls": this.imgUrls
      }).then(res=>{
        console.log(res)
        this.$modal.pop('previewtweetimg-modal')
        if (!this.MU.isAllValueNotEmpty([res.data.errors])) {
          //alert("ツイートしました")
          this.$dialog.alert('ツイートしました', {okText: 'OK'}).then(function(dialog) {
            // リロードなど初期化処理
            location.reload()
          })
        } else {
          this.onClickSaveImgButton()
          this.$dialog.alert('ツイートに失敗しました', {okText: 'OK'})
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
.home {
  &__previewtweetimg-modal {
    &__imgswrapper {
      margin: 5px;
      display:grid;
      grid-row: auto auto;
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      width:100%;
      /*height:90%;*/
      &>div {
        &>img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.gridColumns {
  grid-template-columns: 1fr 1fr;
}
</style>
