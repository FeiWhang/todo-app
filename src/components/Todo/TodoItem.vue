<template>
    <div class="TodoItem" :style="hideStyle">
        <div class="TodoItem__container" v-if="isShown">
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
                    <v-progress-circular
                        :value="progress"
                        color="#90d3ef"
                        :size="32"
                        rotate="180"
                    >
                        <p>{{ progress }}</p>
                    </v-progress-circular>
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
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
            isShown: false,
            progress: 0,
        };
    },

    mounted() {
        // fetched the item
        this.itemsRef
            .child(this.todosIndex)
            .child(this.itemIndex)
            .on("value", (snapshot) => {
                const item = snapshot.val();

                this.title = item.title;
                this.isCompleted = item.complete;
                this.isShown = item.shown;

                this.isCompleted ? (this.progress = 100) : (this.progress = 0);
            });

        // calculate the progress
        this.subItemsRef
            .child(this.todosIndex)
            .child(this.itemIndex)
            .on("value", (snapshot) => {
                let completeCount = 0;
                let totalCount = 0;
                snapshot.forEach((childSnapshot) => {
                    const subItem = childSnapshot.val();

                    subItem.complete ? (completeCount = completeCount + 1) : {};
                    totalCount = totalCount + 1;
                });

                this.progress =
                    totalCount == 0
                        ? 0
                        : Math.floor((completeCount * 100) / totalCount);
            });
    },
    methods: {
        ...mapActions(["completeItem"]),
        handleItemComplete() {
            this.completeItem({
                isCompleted: this.isCompleted,
                todosIndex: this.todosIndex,
                itemIndex: this.itemIndex,
            });
        },
        toggleDropdown() {
            this.isDropdown = !this.isDropdown;
        },
    },
    computed: {
        ...mapGetters(["itemsRef", "subItemsRef"]),

        titleStyle() {
            return {
                "text-decoration": this.isCompleted ? "line-through" : "none",
                color: this.isCompleted ? "#d9d9d9" : "inherit",
            };
        },
        hideStyle() {
            return {
                padding: this.isShown ? "12px 0" : "0",
                "border-bottom": this.isShown ? "1px solid #ededed" : "none",
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoItem {
    position: relative;
    font-size: 18px;

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
        justify-self: center;
        margin-left: 18px;
        p {
            margin-bottom: -3px;
        }
    }

    &__right {
        margin-right: 18px;
        p {
            font-size: 11px;
            font-weight: 600;
            margin: 0;
        }
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
        margin-left: 8px;
    }
}
</style>
