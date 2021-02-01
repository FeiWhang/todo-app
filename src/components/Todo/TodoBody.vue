<template>
    <div class="TodoBody">
        <h1 class="TodoBody__greeting">
            {{ "Hi, " + this.userProfile.firstName }}
        </h1>

        <TodoCard
            v-for="(todo, index) in this.todos"
            :key="index"
            :todosIndex="index"
        />

        <div class="NewTodo">
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
</template>

<script>
import TodoCard from "./TodoCard";
import { db, auth } from "@/firebase";
import { mapGetters } from "vuex";

export default {
    name: "TodoBody",
    components: {
        TodoCard,
    },
    data: () => {
        return {
            todos: {},
            showNew: false,
            contactRef: db.ref("todos/" + auth.currentUser.uid),
        };
    },
    mounted() {
        this.contactRef.on("value", (snapshot) => {
            this.todos = snapshot.val();
        });
    },
    computed: {
        ...mapGetters(["userProfile"]),
    },
    methods: {
        toggleNew() {
            this.showNew = !this.showNew;
        },
        handleNew(e) {
            const todo = {
                name: e.target.value.trim(),
                hideComplete: false,
            };
            this.contactRef.push(todo);
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
        position: absolute;
        top: 59px;
        left: 39.5%;
        padding: 8px 16px;
        border-radius: 16px;
        box-shadow: 0 0 10px #b8b8b8;

        input {
            font-size: 20px;
            outline: none;
        }
    }
}
</style>
