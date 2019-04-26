<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: "Home",
  mounted() {
    this.$emit("componenteCargado", 5);
  }
};
</script>

