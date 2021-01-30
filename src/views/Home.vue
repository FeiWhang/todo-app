<template>
    <div class="home">
        <Header />
        <section class="body">
            <HomeBody />
        </section>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import HomeBody from "@/components/Home/HomeBody.vue";

export default {
    name: "Home",
    components: {
        Header,
        HomeBody,
    },
};
</script>
