<template>
    <div class="TodoCard">
        <TodoHeader :todosIndex="todosIndex" />
        <TodoItem
            v-for="(itemKey, index) in itemKeys"
            :key="index"
            :todosIndex="todosIndex"
            :itemIndex="itemKey"
        />
        <TodoFooter :todosIndex="todosIndex" />
    </div>
</template>

<script>
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { mapGetters } from "vuex";

export default {
    name: "TodoCard",
    components: { TodoHeader, TodoItem, TodoFooter },
    props: ["todosIndex"],
    data: () => {
        return {
            itemKeys: [],
        };
    },
    computed: {
        ...mapGetters(["itemsRef"]),
    },
    mounted() {
        this.itemsRef
            .child(this.todosIndex)
            .orderByChild("targetDate")
            .on("value", (snapshot) => {
                let fetchedItemKeys = [];
                snapshot.forEach((childSnapshot) => {
                    fetchedItemKeys.push(childSnapshot.key);
                });
                this.itemKeys = fetchedItemKeys;
                console.log(this.itemKeys);
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
    margin-bottom: 8rem;
}
</style>
