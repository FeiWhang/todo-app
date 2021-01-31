<template>
    <div class="home">
        <Header />
        <HomeBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HomeBody from "@/components/HomeBody.vue";

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
