<template>
  <div class="forms">
    <input type="text" v-model="itemName">
    <input type="text" v-model="itemThumbnail">
    <textarea v-model="itemDescription"></textarea>
  </div>
</template>

<script>

export default {
  name: 'Forms',
  props: {
    formId: null
  },
  data: function () {
    return {
      itemName: null,
      itemThumbnail: null,
      itemDescription: null
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
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
</style>
