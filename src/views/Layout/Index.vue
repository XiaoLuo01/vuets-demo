<template>
 <div class="layout">
  <!-- 头部 -->
  <LayoutHeader></LayoutHeader>

  <!-- 内容 -->
  <Content>
    <router-view slot="content"></router-view>
  </Content>
 </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "./LayoutHeader.vue";
import Content from "./Content.vue";

@Component({
    components: { LayoutHeader, Content }
})

export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>