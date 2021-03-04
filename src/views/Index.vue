<template>
  <div class="index">
    <div v-if="isLoading"><!-- Loading... --></div>
    <div v-else>
      <div v-if="isSignined"><Home :profile="profile"/></div>
      <div v-else><About/></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

export default {
  name: 'Index',
  data: function () {
    return {
      isLoading: true,
      isSignined: false,
      profile: null
    }
  },
  components: {
    About,
    Home
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLoading = false
      this.isSignined = (user!=null)
      if (this.isSignined) {
        var profile = user.providerData[0]
        this.profile = {
          "userId": user.uid,
          "twitterDisplayName": profile.displayName,
          "twitterScreenName": localStorage.twitterScreenName,
          "twitterProfileImgUrl": profile.photoURL.replace("_normal.jpg", ".jpg"),
          "twitterInternalId": profile.uid,
          "twitterToken": localStorage.ttkn,
          "twitterSecret": localStorage.tsec
        }
        console.log(this.profile)
      }
    })
  }
}
</script>
