<template>
    <div class="TodoCard">
        <TodoHeader />
        <!-- <section class="Todo">
            <ul class="TodoList">
                <li
                    :class="{ completed: todo.completed }"
                    v-for="(todo, index) in todos"
                    :key="index"
                >
                    <div
                        class="view"
                        v-if="
                            currentViewIndex == 0
                                ? true
                                : currentViewIndex == 1
                                ? !todo.completed
                                : todo.completed
                        "
                    >
                        <input
                            class="toggle"
                            type="checkbox"
                            :checked="todo.completed"
                            v-on:click="handleTodoCheck(index)"
                        />
                        <label>{{ todo.label }}</label>
                        <button
                            class="destroy"
                            v-on:click="handleTodoDelete(index)"
                        ></button>
                    </div>
                    <input class="edit" value="Create a TodoMVC template" />
                </li>
            </ul>
        </section> -->
    </div>
</template>

<script>
import TodoHeader from "./TodoHeader";
export default {
    name: "TodoCard",
    components: { TodoHeader },
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
