<template>
    <div class="TodoItemDropdown">
        <div class="TodoItemDropdownHeader">
            <p class="TodoItemDropdownHeader__text">
                Tuesday, 2 Feb 2564
            </p>
            <div class="TodoItemDropdownOption">
                <button
                    class="TodoItemDropdownOption__delete"
                    v-on:click="handleItemDelete"
                >
                    <v-icon color="#cc9a9a">mdi-close</v-icon>
                    <span>Delete this task</span>
                </button>
            </div>
        </div>
        <TodoSubItem />
        <TodoSubItem />
        <TodoSubItem />
        <TodoSubItem />
    </div>
</template>

<script>
import TodoSubItem from "./TodoSubItem";
export default {
    name: "TodoItemDropdown",
    components: { TodoSubItem },
    methods: {
        handleItemDelete() {
            console.log("delete todo item");
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoItemDropdown {
    margin: 16px 58px;
    font-size: 16px;
}

.TodoItemDropdownHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.TodoItemDropdownOption {
    display: flex;
    transition: all 0.3s ease;
    button {
        display: flex;
        align-items: center;
        outline: none;
        padding: 2px 8px;
        border-radius: 32px;
        background-color: #f8f8f8;

        span {
            font-size: 0;
            transition: font-size 0.3s ease;
        }
    }
    button:hover span {
        margin-left: 4px;
        font-size: 14px;
    }
}
</style>
