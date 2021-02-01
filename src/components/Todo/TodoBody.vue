<template>
    <div class="TodoBody">
        <h1 class="TodoBody__greeting">
            {{ "Hi, " + this.userProfile.firstName }}
        </h1>
        <TodoCard />
    </div>
</template>

<script>
import TodoCard from "./TodoCard";
import { mapGetters } from "vuex";
export default {
    name: "TodoBody",
    components: {
        TodoCard,
    },
    computed: {
        ...mapGetters(["userProfile"]),
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
</style>
