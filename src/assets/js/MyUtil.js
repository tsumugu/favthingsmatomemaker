export default class MyUtil {
  constructor() {
  }
  isString(obj) {
    return typeof (obj) == "string" || obj instanceof String;
  }
  isAllValueNotEmpty(objArr) {
    // foreachだと意図した挙動にならないので注意。
    if (objArr.length == 0) {
      return false
    }
    for (var i=0;i<objArr.length;i++) {
      var item = objArr[i]
      if (item == null || item == undefined) {
        return false
      } else {
        if (this.isString(item)) {
          // 文字列のときは文字数をチェック
          if (item.replace(/\s+/g,'').length <= 0) {
            return false
          }
        } else if (item instanceof Array) {
          // 配列のときはlengthを取得
          var itemV = null
          if (item.length == undefined) {
            itemV = Object.keys(item)
          } else {
            itemV = item
          }
          if (itemV.length <= 0) {
            return false
          }
        }
      }
    }
    return true
  }
}