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
import { db, auth } from "@/firebase";

export default {
    name: "TodoFooter",
    props: ["todosIndex"],
    data: () => {
        return {
            hideComplete: false,
        };
    },
    mounted() {
        const todoRef = db.ref(
            "todos/" + auth.currentUser.uid + "/" + this.todosIndex
        );
        todoRef.on("value", (snapshot) => {
            const todo = snapshot.val();
            this.hideComplete = todo.hideComplete;
        });
    },
    methods: {
        handleHideCompleted() {
            const todoRef = db.ref(
                "todos/" + auth.currentUser.uid + "/" + this.todosIndex
            );

            todoRef.update({ hideComplete: this.hideComplete });

            const itemsRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/items"
            );

            itemsRef.once("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const item = childSnapshot.val();
                    if (item.complete) {
                        childSnapshot.ref.update({ shown: !item.shown });
                    }
                });
            });
        },
        handleClearCompleted() {},
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
