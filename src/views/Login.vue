<template>
    <div class="login">
        <Header />
        <LoginBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import LoginBody from "@/components/LoginBody.vue";

export default {
    name: "Login",
    metaInfo: {
        title: "Login",
    },
    components: {
        Header,
        LoginBody,
    },
};
</script>
