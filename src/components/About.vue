<template>
  <div class="about">
    <p class="about__catchcopy">好きなモノをまとめてシェア</p>
    <div class="about__preview__wrapper">
      <div class="about__preview__wrapper__contents">
        <div class="about__preview__wrapper__contents__title"></div>
        <div class="about__preview__wrapper__contents__items">
          <div class="about__preview__wrapper__contents__items__top">
            <div class="about__preview__wrapper__contents__items__top__clickzone"></div>
          </div>
          <div class="about__preview__wrapper__contents__items__other">
            <div class="about__preview__wrapper__contents__items__other__item1">
              <div class="about__preview__wrapper__contents__items__other__item1__clickzone"></div>
            </div>
            <div class="about__preview__wrapper__contents__items__other__item2">
              <div class="about__preview__wrapper__contents__items__other__item2__clickzone"></div>
            </div>
            <div class="about__preview__wrapper__contents__items__other__item3">
              <div class="about__preview__wrapper__contents__items__other__item3__clickzone"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="about__preview__wrapper__credit"><img src="https://tsumugu.tech/gen_shareimg/logo.png" style="margin: 0;padding: 0;width: 300px;"></div>
    </div>
    <div style="margin-top: 50px;"><button class="twitter" v-on:click="onClickTwitterSigninButton"><i class="fab fa-twitter"></i> Twitterで新しくはじめる</button></div>
    <div><button class="twitter" style="margin-top: 10px;" v-on:click="onClickTwitterSigninButton"><i class="fab fa-twitter"></i> Twitterでログイン</button></div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'About',
  methods: {
    onClickTwitterSigninButton() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var profile = result.additionalUserInfo.profile
          var screenName = profile.screen_name
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          localStorage.setItem('twitterScreenName', screenName)
          localStorage.setItem('ttkn', token)
          localStorage.setItem('tsec', secret)
        }).catch((error) => {
          this.$dialog.alert("サインインに失敗しました", {okText: 'OK'})
        })
      })
      .catch((error) => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
p {
  margin: 0;
  padding: 0;
}
.about {
  text-align: center;
  &__catchcopy {
    font-size: 1.5rem;
  }
  &__preview {
    &__wrapper {
      margin: 0 auto;
      margin-bottom: 10px;
      position: relative;
      max-width: 650px;
      height: auto;
      background-image: url('https://tsumugu.tech/gen_shareimg/bg.png');
      background-size: contain;
      background-repeat: no-repeat;
      border-radius: 0.25rem;
      border: 1px solid $border;
      /*font-weight: bold;*/
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
          background-color: $preview-bgcolor;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          writing-mode:vertical-rl;
          text-orientation:upright;
          color: $preview-textcolor;
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
            z-index: 999;
            width: calc( 100% - 10px );
            height: 50%;
            &__clickzone {
              display: block;
              width: 100%;
              height: 100%;
              background-color: $preview-bgcolor;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: $preview-textcolor;
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
            z-index: 888;
            width: calc( 100% - 10px );
            height: calc( 50% - 5px );
            &__item1 {
              &__clickzone {
                display: block;
                width: 100%;
                height: 100%;
                background-color: $preview-bgcolor;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: $preview-textcolor;
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
                background-color: $preview-bgcolor;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: $preview-textcolor;
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
                background-color: $preview-bgcolor;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: $preview-textcolor;
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
        z-index: 0;
        text-align: center;
      }
    }
    &__wrapper:before {
      content: "";
      display: block;
      padding-top: 56.25%;
    }
  }
}
</style>
