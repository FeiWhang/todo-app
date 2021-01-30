<template>
    <div class="todo">
        <Header />
        <h1>This is a todo page</h1>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
// import HomeBody from "@/components/Home/HomeBody.vue";

export default {
    name: "Todo",
    metaInfo: {
        title: "To do",
    },
    components: {
        Header,
        // HomeBody,
    },
};
</script>
