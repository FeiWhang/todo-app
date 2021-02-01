<template>
    <div class="TodoItemMain">
        <div class="TodoItemMain__left">
            <button class="TodoItemMain__checkbox" @click="handleItemComplete">
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
                v-on:click="toggleDetail"
            >
                <v-icon color="#c8c8c8">mdi-chevron-down</v-icon>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TodoItemMain",
    data: () => {
        return {
            isCompleted: false,
            title: "Upper chest",
        };
    },
    methods: {
        handleItemComplete() {
            this.isCompleted = !this.isCompleted;
        },

        toggleDetail() {
            console.log("toggle detail");
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
