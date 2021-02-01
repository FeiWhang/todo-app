<template>
    <div class="TodoItem">
        <TodoItemMain />
        <TodoItemDropdown />
    </div>
</template>

<script>
import TodoItemMain from "./TodoItemMain";
import TodoItemDropdown from "./TodoItemDropdown";
export default {
    name: "TodoItem",
    components: { TodoItemMain, TodoItemDropdown },
    props: ["index"],
};
</script>

<style lang="scss" scoped>
.TodoItem {
    position: relative;
    font-size: 18px;
    border-bottom: 1px solid #ededed;
    padding: 12px 0;
    width: 100%;
    text-align: left;
}
</style>
