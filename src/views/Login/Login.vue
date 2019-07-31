<template>
 <div class="login">
    <LoginHeader></LoginHeader>
 </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginHeader from './LoginHeader.vue'

@Component({
    components: { LoginHeader }
})

export default class Login extends Vue {}
</script>

<style>

</style>