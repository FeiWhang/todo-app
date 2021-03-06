<template>
    <div class="TodoBody">
        <div class="TodoBody__greeting">
            <h1>
                {{ "Hi, " + this.userProfile.firstName + " !" }}
            </h1>
            <h1>
                {{ "you have completed " + this.completed + " tasks" }}
            </h1>
            <h1>
                {{ "only " + this.active + " to go" }}
            </h1>
        </div>

        <TodoCard
            v-for="(todo, index) in this.todos"
            :key="index"
            :todosIndex="index"
        />

        <div class="NewTodo">
            <div class="NewTodo__container">
                <button class="NewTodo__toggleNew" @click="toggleNew">
                    <v-icon color="#1080c5">mdi-plus</v-icon>
                    <span>Create new todo</span>
                </button>
                <v-scale-transition origin="top center">
                    <div class="NewTodo__new" v-if="showNew">
                        <input
                            type="text"
                            placeholder="todo name"
                            maxlength="18"
                            v-on:keyup.enter="handleNew"
                        />
                    </div>
                </v-scale-transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoCard from "./TodoCard";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "TodoBody",
    components: {
        TodoCard,
    },
    data: () => {
        return {
            todos: {},
            showNew: false,
            active: 0,
            completed: 0,
        };
    },
    mounted() {
        this.initRef();
        this.todosRef.on("value", (snapshot) => {
            this.todos = snapshot.val();
        });

        // count active and completed
        this.itemsRef.on("value", (snapshot) => {
            let activeCount = 0;
            let completedCount = 0;
            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((itemSnapshot) => {
                    const item = itemSnapshot.val();
                    item.complete
                        ? (completedCount = completedCount + 1)
                        : (activeCount = activeCount + 1);
                });
            });

            this.active = activeCount;
            this.completed = completedCount;
        });
    },
    computed: {
        ...mapGetters(["userProfile", "todosRef", "itemsRef"]),
    },
    methods: {
        ...mapActions(["initRef", "createNewTodo"]),
        toggleNew() {
            this.showNew = !this.showNew;
        },
        handleNew(e) {
            const name = e.target.value.trim();
            this.createNewTodo(name);
            e.target.value = "";
            this.toggleNew();
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoBody {
    margin-top: 6rem;

    &__greeting {
        margin-bottom: 4rem;
    }
}

.NewTodo {
    position: relative;
    margin-top: 6rem;
    &__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__toggleNew {
        border-radius: 32px;
        display: inline-flex;
        outline: 0;
        padding: 8px 16px;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        transition: background-color 0.3s ease;
        span {
            margin-left: 6px;
        }
    }

    &__toggleNew:hover {
        background-color: #f8f8f8;
    }

    &__new {
        padding: 8px 16px;
        border-radius: 16px;
        box-shadow: 0 0 10px #b8b8b8;
        margin-top: 28px;

        input {
            font-size: 20px;
            outline: none;
        }
    }
}
</style>
