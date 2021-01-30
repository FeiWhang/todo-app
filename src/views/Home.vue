<template>
    <div class="home">
        <Header />
        <HomeBody />
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import HomeBody from "@/components/Home/HomeBody.vue";

export default {
    name: "Home",
    metaInfo: {
        titleTemplate: null,
    },
    components: {
        Header,
        HomeBody,
    },
};
</script>
