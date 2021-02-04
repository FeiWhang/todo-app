<template>
    <div class="TodoFooter">
        <v-switch
            v-model="hideComplete"
            label="Hide completed"
            color="#2e94cf"
            v-on:click="handleHideCompleted"
        ></v-switch>

        <button class="TodoFooter__clear" v-on:click="handleClearCompleted">
            <v-icon color="#cc9a9a">mdi-notification-clear-all</v-icon>
            <span>Clear completed</span>
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "TodoFooter",
    props: ["todosIndex"],
    computed: {
        ...mapGetters(["todosRef"]),
    },
    data: () => {
        return {
            hideComplete: false,
        };
    },
    mounted() {
        this.todosRef
            .child(this.todosIndex)
            .child("hideComplete")
            .on("value", (snapshot) => {
                this.hideComplete = snapshot.val();
            });
    },
    methods: {
        ...mapActions(["hideCompleted", "clearCompleted"]),
        handleHideCompleted() {
            this.hideCompleted({
                isHideComplete: this.hideComplete,
                todosIndex: this.todosIndex,
            });
        },
        handleClearCompleted() {
            this.clearCompleted(this.todosIndex);
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoFooter {
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 0 18px;

    button {
        display: inline-flex;
        outline: none;
        align-items: center;
        span {
            margin-left: 4px;
            color: #737373;
        }
    }
}
</style>
