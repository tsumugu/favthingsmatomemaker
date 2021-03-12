<template>
  <div class="about">
    好きなモノまとめメーカーとは...
    <div><button class="twitter" v-on:click="onClickTwitterSigninButton"><i class="fab fa-twitter"></i> Twitterでサインイン</button></div>
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
          alert("サインインに失敗しました")
        })
      })
      .catch((error) => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
