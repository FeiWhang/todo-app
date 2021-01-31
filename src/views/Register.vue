<template>
    <div class="register">
        <Header />
        <RegisterBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RegisterBody from "@/components/RegisterBody.vue";

export default {
    name: "Register",
    metaInfo: {
        title: "Register",
    },
    components: {
        Header,
        RegisterBody,
    },
};
</script>
