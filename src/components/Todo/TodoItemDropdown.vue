<template>
    <div class="TodoItemDropdown">
        <div class="TodoItemDropdownHeader">
            <p class="TodoItemDropdownHeader__text">{{ date }}</p>
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
        <input
            class="TodoItemDropdown__newSubItem"
            placeholder="Add sub todo?"
            type="text"
            v-on:keyup.enter="handleNewSubTodo"
        />
        <TodoSubItem
            v-for="(subItem, index) in subItems"
            :key="index"
            :todosIndex="todosIndex"
            :itemIndex="itemIndex"
            :subItemIndex="index"
        />
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import TodoSubItem from "./TodoSubItem";

export default {
    name: "TodoItemDropdown",
    components: { TodoSubItem },
    props: ["todosIndex", "itemIndex"],
    data: () => {
        return {
            date: "",
            subItems: {},
        };
    },
    mounted() {
        const itemRef = db.ref(
            "todos/" +
                auth.currentUser.uid +
                "/" +
                this.todosIndex +
                "/items/" +
                this.itemIndex
        );
        itemRef.on("value", (snapshot) => {
            const item = snapshot.val();
            this.date =
                item.targetDate === "" ? "No target date" : item.targetDate;
        });

        const subItemRef = db.ref(
            "todos/" +
                auth.currentUser.uid +
                "/" +
                this.todosIndex +
                "/subItems/" +
                this.itemIndex
        );

        subItemRef.on("value", (snapshot) => {
            this.subItems = snapshot.val();
        });
    },
    methods: {
        handleItemDelete() {
            const itemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/items/" +
                    this.itemIndex
            );
            itemRef.remove();
        },
        handleNewSubTodo(e) {
            const subItemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/subItems/" +
                    this.itemIndex
            );

            const subItem = {
                title: e.target.value.trim(),
                complete: false,
            };
            subItemRef.push(subItem);
            e.target.value = "";
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoItemDropdown {
    margin: 16px 58px;
    font-size: 16px;

    &__newSubItem {
        margin: 0;
        width: 100%;
        font-size: 16px;
        line-height: 1.4em;
        padding: 8px 8px 8px 2px;
        outline: none;
        border-bottom: 1px solid #f3f3f3;
    }
}

.TodoItemDropdownHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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
