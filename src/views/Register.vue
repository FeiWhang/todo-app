<template>
    <div class="register">
        <Header />
        <RegisterBody />
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import RegisterBody from "@/components/Register/RegisterBody.vue";

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
