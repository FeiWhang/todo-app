<template>
    <div class="todo">
        <Header />
        <section class="body">
            <h1>This is a todo page</h1>
        </section>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
// import HomeBody from "@/components/Home/HomeBody.vue";

export default {
    name: "Todo",
    components: {
        Header,
        // HomeBody,
    },
};
</script>
