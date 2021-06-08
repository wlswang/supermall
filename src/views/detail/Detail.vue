<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

export default {
  name: "Detail",
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    }
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>

</style>
