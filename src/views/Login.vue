<template>
    <div class="login">
        <Header />

        <section class="body">
            <h1>This is a login page</h1>
        </section>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
// import HomeBody from "@/components/Home/HomeBody.vue";

export default {
    name: "Login",
    components: {
        Header,
        // HomeBody,
    },
};
</script>
