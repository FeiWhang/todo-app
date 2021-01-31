<template>
    <div class="todo">
        <Header />
        <TodoBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TodoBody from "@/components/Todo/TodoBody.vue";

export default {
    name: "Todo",
    metaInfo: {
        title: "To do",
    },
    components: {
        Header,
        TodoBody,
    },
};
</script>
