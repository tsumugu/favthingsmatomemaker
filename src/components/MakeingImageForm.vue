<template>
  <div class="MakeingImageForm">
    <div class="MakeingImageForm__preview__wrapper" v-show="imgUrl==null">
      <div class="MakeingImageForm__preview__wrapper__contents">
        <div class="MakeingImageForm__preview__wrapper__contents__title" ref="clickzone-title" v-on:click="openEditItemModal('title')">
          <div v-if="this.item==null">タイトル</div>
          <div v-else>{{this.item.title==undefined?"タイトル":matomeTitle}}</div>
        </div>
        <div class="MakeingImageForm__preview__wrapper__contents__items">
          <div class="MakeingImageForm__preview__wrapper__contents__items__top">
            <div class="MakeingImageForm__preview__wrapper__contents__items__top__clickzone" ref="clickzone-1" v-on:click="openEditItemModal('1')">
              <div v-if="this.postData['1']==undefined">item ①</div>
              <div v-else class="MakeingImageForm__preview__wrapper__contents__items__top__clickzone__preview">
                <img :src="this.postData['1'].itemThumbnail" class="MakeingImageForm__preview__wrapper__contents__items__top__clickzone__preview__img">
                <div class="MakeingImageForm__preview__wrapper__contents__items__top__clickzone__preview__texts">
                  <p>{{this.postData['1'].itemName}}</p>
                  <p>{{this.postData['1'].ItemDescription}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="MakeingImageForm__preview__wrapper__contents__items__other">
            <div class="MakeingImageForm__preview__wrapper__contents__items__other__item1">
              <div class="MakeingImageForm__preview__wrapper__contents__items__other__item1__clickzone" ref="clickzone-2" v-on:click="openEditItemModal('2')">
                <div v-if="this.postData['2']==undefined">item ②</div>
                <div v-else class="MakeingImageForm__preview__wrapper__contents__items__other__item1__clickzone__preview">
                  <img :src="this.postData['2'].itemThumbnail">
                  <p>{{this.postData['2'].itemName}}</p>
                </div>
              </div>
            </div>
            <div class="MakeingImageForm__preview__wrapper__contents__items__other__item2">
              <div class="MakeingImageForm__preview__wrapper__contents__items__other__item2__clickzone" ref="clickzone-3" v-on:click="openEditItemModal('3')">
                <div v-if="this.postData['3']==undefined">item ③</div>
                <div v-else class="MakeingImageForm__preview__wrapper__contents__items__other__item2__clickzone__preview">
                  <img :src="this.postData['3'].itemThumbnail">
                  <p>{{this.postData['3'].itemName}}</p>
                </div>
              </div>
            </div>
            <div class="MakeingImageForm__preview__wrapper__contents__items__other__item3">
              <div class="MakeingImageForm__preview__wrapper__contents__items__other__item3__clickzone" ref="clickzone-4" v-on:click="openEditItemModal('4')">
                <div v-if="this.postData['4']==undefined">item ④</div>
                <div v-else class="MakeingImageForm__preview__wrapper__contents__items__other__item3__clickzone__preview">
                  <img :src="this.postData['4'].itemThumbnail">
                  <p>{{this.postData['4'].itemName}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="MakeingImageForm__preview__wrapper__credit"><img src="https://tsumugu.tech/gen_shareimg/logo.png" style="margin: 0;padding: 0;width: 300px;"></div>
    </div>
    <!--
    <div class="MakeingImageForm__previewImage" v-show="imgUrl!=null">
      <img :src="imgUrl">
      <div><button v-on:click="()=>{closePreviewModal();openAskDialog();}">これでOK</button></div>
      <div><button v-on:click="dispPreviewArea()">編集する</button></div>
    </div>
    <button v-on:click="$modal.push('previewimage-modal')">テスト</button>
    -->
    <modal name="previewimage-modal">
      <div class="MakeingImageForm__previewImage">
        <img :src="imgUrl">
        <div><button v-on:click="dispPreviewArea()">修正する</button><button class="active" v-on:click="()=>{$modal.pop('previewimage-modal');openAskDialog();}">これでOK</button></div>
      </div>
    </modal>
    <div v-show="imgUrl==null" class="MakeingImageForm--centerize">
      <div class="MakeingImageForm__editarea" ref="editarea-title" style="display: inline-block;">
        <h2>タイトル</h2>
        <div><input type="text" v-model="matomeTitle"></div>
        <div><button v-on:click="onChangeEmitItemValues('{\'formId\': \'title\', \'isEdited\': false}')">タイトルを確定(編集可能)</button></div>
      </div>
      <Forms style="display:none;" formId="1" title="item ①" isDispDiscription="true" ref="editarea-1" @itemValues="onChangeEmitItemValues" />
      <Forms style="display:none;" formId="2" title="item ②" ref="editarea-2" @itemValues="onChangeEmitItemValues" />
      <Forms style="display:none;" formId="3" title="item ③" ref="editarea-3" @itemValues="onChangeEmitItemValues" />
      <Forms style="display:none;" formId="4" title="item ④" ref="editarea-4" @itemValues="onChangeEmitItemValues" />
      <div class="MakeingImageForm__editarea" v-show="imgUrl==null">
        <button v-on:click="onGenImg">画像を生成する</button><button v-on:click="$emit('openPreviewTweetImgModal', null)">ツイートして終了する</button>
      </div>
    </div>
    <modal name="edititem-modal">
      <div>
        <button v-on:click="$modal.pop('edititem-modal')">close</button>
        <div v-if="editItemPropsVal=='title'">
          <h2>タイトル</h2>
          <div><input type="text" v-model="matomeTitle"></div>
          <div><button v-on:click="onChangeEmitItemValues('{\'formId\': \'title\', \'isEdited\': true}')">タイトルを確定(編集可能)</button></div>
        </div>
        <div v-else>
          <Forms v-show="editItemPropsVal.formId=='1'" formId="1" title="item ①" isDispDiscription="true" :propsItems="editItemPropsVal" @itemValues="onChangeEmitItemValues" />
          <Forms v-show="editItemPropsVal.formId=='2'" formId="2" title="item ②" :propsItems="editItemPropsVal" @itemValues="onChangeEmitItemValues" />
          <Forms v-show="editItemPropsVal.formId=='3'" formId="3" title="item ③" :propsItems="editItemPropsVal" @itemValues="onChangeEmitItemValues" />
          <Forms v-show="editItemPropsVal.formId=='4'" formId="4" title="item ④" :propsItems="editItemPropsVal" @itemValues="onChangeEmitItemValues" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import html2canvas from 'html2canvas'
import MyUtil from '@/assets/js/MyUtil.js'
import Forms from '@/components/Forms.vue'
import '@/assets/style/vue-thin-modal-responsive.css'

export default {
  name: 'MakeingImageForm',
  props: {
    imageFormId: null
  },
  data: function () {
    return {
      MU: null,
      matomeTitle: null,
      imgUrl: null,
      //imgUrl: "https://tsumugu.tech/gen_shareimg/tmp/imgs/img_6049bc00f0cae7.02140448.png",
      postData: {},
      item: null,
      editItemPropsVal: {
        "formId": null
      }
    }
  },
  components: {
    Forms
  },
  /*
  watch: {
    matomeTitle() {
      this.onChangeValue()
    }
  },
  */
  methods: {
    dispPreviewArea() {
      this.imgUrl = null
      this.$modal.pop('previewimage-modal')
    },
    openAskDialog() {
      // TODO: 枚数表示を実装
      this.$dialog
      .confirm('もっと画像を作成しますか？(残りn枚)',{
        reverse: true,
        okText: 'いいえ',
        cancelText: 'はい',
      })
      .then(()=>{
        // 終了してツイートする
        this.$emit('openPreviewTweetImgModal', null)
      })
      .catch(()=>{
        // 画像をもっと作る
        this.$emit('openNewMakingImageForm', this.imageFormId)
      })
    },
    openEditItemModal(formId) {
      var val = this.postData[formId]
      if (formId == "title"&&this.matomeTitle!=null) {
        val = "title"
      }
      if (val!=undefined) {
        this.editItemPropsVal = val
        this.$modal.push('edititem-modal')
      }
    },
    onChangeEmitItemValues(values) {
      if (this.MU.isString(values)) {
        values = JSON.parse(values.replaceAll("'", "\""))
      }
      //valのチェック
      if (values.formId == 'title') {
        if (!this.MU.isAllValueNotEmpty([this.matomeTitle])) {
          alert("タイトルを入力してください")
          return false
        }
      } else {
        if (!this.MU.isAllValueNotEmpty([values.itemName, values.itemThumbnail])) {
          alert("アイテムのタイトルと画像は必須項目です")
          return false
        }
      }
      if (!values.isEdited) {
        var previewElm = undefined
        var editareaElm = undefined
        var nextEditareaElm = undefined
        if (values.formId != "title") {
          //this.postData[values.formId] = values
          this.$set(this.postData, values.formId, values)
          previewElm = this.$refs["clickzone-"+values.formId]
          editareaElm = this.$refs["editarea-"+values.formId].$el
          if (this.$refs["editarea-"+(parseInt(values.formId)+1).toString(10)] != undefined) {
            nextEditareaElm = this.$refs["editarea-"+(parseInt(values.formId)+1).toString(10)].$el
          }
        } else {
          previewElm = this.$refs["clickzone-title"]
          editareaElm = this.$refs["editarea-title"]
          nextEditareaElm = this.$refs["editarea-1"].$el
        }
        if (previewElm!=undefined&&editareaElm!=undefined) {
          // プレビュー部分の見た目を変化させる
          previewElm.classList.add('editableitem')
          // 編集画面をfadeout
          editareaElm.classList.add('animate__animated', 'animate__fadeOutLeft')
          editareaElm.addEventListener('animationend', () => {
            editareaElm.style.display = "none"
            //次の編集画面をfadein
            if (nextEditareaElm != undefined) {
              nextEditareaElm.style.display = "inline-block"
              nextEditareaElm.classList.add('animate__animated', 'animate__fadeInRight')
            }
          })
        }
      } else {
        if (values.formId != "title") {
          this.$set(this.postData, values.formId, values)
        }
        this.$modal.pop('edititem-modal')
      }
      this.onChangeValue()
      console.log(this.postData)
    },
    onChangeValue() {
      this.item = {
        "title": this.matomeTitle,
        "items": this.postData
      }
    },
    postGenImgAPI(postObj) {
      return axios.post('https://tsumugu.tech/gen_shareimg/get.php', postObj)
    },
    convertItemToPostObj(e) {
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
      
      return postObj
    },
    onGenImg() {
      var postObj = this.convertItemToPostObj(this.item)
      if (postObj) {
        this.postGenImgAPI(postObj).then(response=>{
          this.imgUrl = response.data
          this.$emit('onChangeImageUrl', {
            "imageFormId": this.imageFormId,
            "imgUrl": this.imgUrl
          })
          // プレビューダイアログを出す
          this.$modal.push('previewimage-modal')
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  },
  mounted() {
    this.MU = new MyUtil()
  }
}
</script>

<style scoped lang="scss">
.MakeingImageForm {
  margin: 0 auto;
  border: 1px solid red;
  max-width: 650px;
  &--centerize {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__preview {
    &__wrapper {
      position: relative;
      max-width: 650px;
      height: auto;
      background-image: url('https://tsumugu.tech/gen_shareimg/bg.png');
      background-size: contain;
      background-repeat: no-repeat;
      &__contents {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 80%;
        height: calc( 100% - 50px );
        &__title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 10%;
          height: calc( 100% - 50px );
          background-color: gray;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          writing-mode:vertical-rl;
          text-orientation:upright;
          color: white;
          font-size: 1.2rem;
        }
        &__items {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 90%;
          height: calc( 100% - 50px );
          &__top {
            padding: 0 5px 0 5px;
            position: absolute;
            top: 0;
            right: 0;
            width: calc( 100% - 10px );
            height: 50%;
            &__clickzone {
              display: block;
              width: 100%;
              height: 100%;
              background-color: gray;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 1.2rem;
              &__preview {
                 display: flex;
                 justify-content: left;
                 align-items: center;
                 width: 100%;
                 height: 100%;
                &__img {
                  margin: 10px;
                  height: 80%;
                }
                &__texts {
                  &>p {
                    margin: 0;
                    padding: 0;
                    overflow-wrap: break-all;
                  }
                }
              }
            }
          }
          &__other {
            padding: 5px 5px 0 5px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 5px;
            position: absolute;
            bottom: 0;
            right: 0;
            width: calc( 100% - 10px );
            height: calc( 50% - 5px );
            &__item1 {
              &__clickzone {
                display: block;
                width: 100%;
                height: 100%;
                background-color: gray;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.2rem;
                &__preview {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  &>img {
                    width: 80%;
                  }
                  &>p {
                    margin: 0;padding: 0;
                  }
                }
              }
            }
            &__item2 {
              &__clickzone {
                display: block;
                width: 100%;
                height: 100%;
                background-color: gray;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.2rem;
                &__preview {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  &>img {
                    width: 80%;
                  }
                  &>p {
                    margin: 0;padding: 0;
                  }
                }
              }
            }
            &__item3 {
              &__clickzone {
                display: block;
                width: 100%;
                height: 100%;
                background-color: gray;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.2rem;
                &__preview {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  &>img {
                    width: 80%;
                  }
                  &>p {
                    margin: 0;padding: 0;
                  }
                }
              }
            }
          }
        }
      }
      &__credit {
        position: absolute;
        bottom: 10px;
        width: 100%;
        text-align: center;
      }
    }
    &__wrapper:before {
      content: "";
      display: block;
      padding-top: 56.25%;
    }
  }
  &__previewImage {
    &>img {
      max-width: 650px;
    }
  }
  &__editarea {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 0.25rem;
    &>h2 {
      margin: 0;
      padding: 0;
    }
  }
}
.editableitem {
  background-color: red;
}
.editableitem:hover {
  color: red;
}
.editableitem:hover:before {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  content: '編集する';
  color: red;
  background-color: white;
  opacity: 0.7;
}
</style>