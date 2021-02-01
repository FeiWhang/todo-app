<template>
    <div class="TodoCard">
        <TodoHeader :todosIndex="todosIndex" />
        <TodoItem
            v-for="(item, index) in items"
            :key="index"
            :todosIndex="todosIndex"
            :itemIndex="index"
        />
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";

export default {
    name: "TodoCard",
    components: { TodoHeader, TodoItem },
    props: ["todosIndex"],
    data: () => {
        return {
            items: {},
        };
    },
    mounted() {
        db.ref(
            "todos/" + auth.currentUser.uid + "/" + this.todosIndex + "/items"
        ).on("value", (snapshot) => {
            this.items = snapshot.val();
        });
    },
};
</script>

<style lang="scss" scoped>
.TodoCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);
}
</style>
