<template>
  <div style="width: 1920px;height: 1080px;display: flex;flex-direction: column">
    <div>
      <Doc_Header></Doc_Header>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import Doc_Header from "@/components/Headers/Doc_Header.vue"
export default {
  components:{
    Doc_Header
  }
}
</script>

<style scoped>

</style>