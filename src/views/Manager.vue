<template>
  <div>
    <Manager_Header></Manager_Header>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Manager_Header from "@/components/Manager/Manager_Header.vue";

export default {
  components:{
    Manager_Header
  }
}
</script>

<style scoped>

</style>