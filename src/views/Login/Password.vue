<template>
 <div class="password">
    <LoginHeader>
        <el-from slot="container">
            <div class="title">
                <h3>找回密码</h3>
            </div>
        </el-from>
    </LoginHeader>
 </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import LoginHeader from './LoginHeader.vue'

@Component({
    components: { LoginHeader }
})

export default class Password extends Vue {
    
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
</style>
