<template>
    <div class="TodoItem">
        <input
            class="TodoItem__checkbox"
            type="checkbox"
            :checked="isCompleted"
            v-on:click="handleItemComplete"
        />
        <label>{{ title }}</label>
        <button class="destroy" v-on:click="handleItemDelete"></button>
    </div>
</template>

<script>
export default {
    name: "TodoItem",
    data: () => {
        return {
            isCompleted: false,
            title: "Upper chest",
        };
    },
    methods: {
        handleItemComplete() {},
        handleItemDelete() {},
    },
};
</script>

<style lang="scss" scoped>
.TodoItem {
    position: relative;
    font-size: 20px;
    border-bottom: 1px solid #ededed;
    padding: 8px 0;
    width: 100%;
}
</style>
