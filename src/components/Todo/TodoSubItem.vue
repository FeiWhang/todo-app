<template>
    <div class="TodoSubItem">
        <div class="TodoSubItem__left">
            <button
                class="TodoSubItem__checkbox"
                @click="handleSubItemComplete"
            >
                <v-icon v-if="!isCompleted" color="#e1e1e1"
                    >mdi-checkbox-blank-circle-outline</v-icon
                >
                <v-icon v-if="isCompleted" color="#4fb79f"
                    >mdi-checkbox-marked-circle-outline</v-icon
                >
            </button>
            <p
                class="TodoSubItem__title"
                :style="titleStyle"
                @click="handleSubItemComplete"
            >
                {{ title }}
            </p>
        </div>
        <div class="TodoSubItem__right">
            <button
                class="TodoSubItem__delete"
                v-on:click="handleSubItemDelete"
            >
                <v-icon color="#cc9a9a">mdi-close</v-icon>
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "TodoSubItem",
    props: ["todosIndex", "itemIndex", "subItemIndex"],

    data: () => {
        return {
            title: "",
            isCompleted: false,
        };
    },
    mounted() {
        // fetch subitem info
        this.subItemsRef
            .child(this.todosIndex)
            .child(this.itemIndex)
            .child(this.subItemIndex)
            .on("value", (snapshot) => {
                const subItems = snapshot.val();
                this.title = subItems.title;
                this.isCompleted = subItems.complete;
            });
    },
    methods: {
        ...mapActions(["completeSubItem", "deleteSubItem"]),
        handleSubItemComplete() {
            this.completeSubItem({
                isCompleted: this.isCompleted,
                todosIndex: this.todosIndex,
                itemIndex: this.itemIndex,
                subItemIndex: this.subItemIndex,
            });
        },

        handleSubItemDelete() {
            this.deleteSubItem({
                todosIndex: this.todosIndex,
                itemIndex: this.itemIndex,
                subItemIndex: this.subItemIndex,
            });
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
    },
};
</script>

<style lang="scss" scoped>
.TodoSubItem {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 0;
    border-bottom: 1px solid #f3f3f3;

    &__left {
        display: flex;
        align-items: center;
        margin-left: -2px;
    }

    &__checkbox {
        outline: none;
        margin-right: 16px;
        padding: 0;
    }

    &__title {
        cursor: default;
        transition: color 0.3s ease;
        margin-bottom: -3px;
    }

    &__toggleDetail {
        outline: none;
        padding: 0;
    }
    button {
        outline: 0;
    }
    &__right {
        opacity: 0;
        transform: translateX(3px);
        transition: opacity 0.2s, transform 0.3s ease;
    }
}
.TodoSubItem:hover .TodoSubItem__right {
    opacity: 1;
    transform: translateX(-3px);
}
</style>
