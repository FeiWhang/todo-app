<template>
    <div class="TodoItem">
        <div class="TodoItemMain">
            <div class="TodoItemMain__left">
                <button
                    class="TodoItemMain__checkbox"
                    @click="handleItemComplete"
                >
                    <v-icon v-if="!isCompleted" color="#e1e1e1"
                        >mdi-checkbox-blank-circle-outline</v-icon
                    >
                    <v-icon v-if="isCompleted" color="#4fb79f"
                        >mdi-checkbox-marked-circle-outline</v-icon
                    >
                </button>
                <p
                    class="TodoItemMain__title"
                    :style="titleStyle"
                    @click="handleItemComplete"
                >
                    {{ title }}
                </p>
            </div>
            <div class="TodoItemMain__right">
                <button
                    class="TodoItemMain__toggleDetail"
                    v-on:click="toggleDropdown"
                >
                    <v-icon color="#c8c8c8">mdi-chevron-down</v-icon>
                </button>
            </div>
        </div>
        <v-expand-transition>
            <TodoItemDropdown
                v-if="isDropdown"
                :todosIndex="todosIndex"
                :itemIndex="itemIndex"
            />
        </v-expand-transition>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import TodoItemDropdown from "./TodoItemDropdown";

export default {
    name: "TodoItem",
    components: { TodoItemDropdown },
    props: ["todosIndex", "itemIndex"],
    data: () => {
        return {
            title: "",
            isCompleted: false,
            isDropdown: false,
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
            this.title = item.title;
            this.isCompleted = item.complete;
        });
    },
    methods: {
        handleItemComplete() {
            const itemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/items/" +
                    this.itemIndex
            );
            itemRef.update({ complete: !this.isCompleted });
        },

        toggleDropdown() {
            this.isDropdown = !this.isDropdown;
        },
    },
    computed: {
        titleStyle() {
            return {
                "text-decoration": this.isCompleted ? "line-through" : "none",
                color: this.isCompleted ? "#d9d9d9" : "inherit",
            };
        },
    },
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

.TodoItemMain {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__left {
        display: flex;
        align-items: center;
        margin-left: 18px;
    }

    &__right {
        margin-right: 18px;
    }

    &__checkbox {
        outline: none;
        margin-right: 16px;
        padding: 0;
    }

    &__title {
        cursor: default;
        transition: color 0.3s ease;
    }

    &__toggleDetail {
        outline: none;
        padding: 0;
    }
}
</style>
