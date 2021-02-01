<template>
    <div class="TodoHeader">
        <header>
            <input
                type="checkbox"
                class="TodoHeader__completeAll"
                id="TodoHeader__completeAll"
            />
            <label
                for="TodoHeader__completeAll"
                @click="handleCompleteAll"
            ></label>
            <h1>
                Work out
            </h1>
            <input
                class="TodoHeader__newTodo"
                placeholder="What needs to be done?"
                type="text"
                v-on:keyup.enter="handleNewTodo"
            />
        </header>
    </div>
</template>

<script>
export default {
    name: "TodoHeader",
    methods: {
        handleNewTodo() {
            console.log("new todo");
        },
        handleCompleteAll() {
            console.log("complete all");
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoHeader {
    width: 100%;
    border-radius: 12px 12px 0 0;
    background-color: var(--regBlue);
    header {
        position: relative;
    }
    h1 {
        color: white;
        margin: 1rem 0;
        font-size: 32px;
    }

    &__newTodo {
        margin: 0;
        width: 88%;
        font-size: 20px;
        line-height: 1.4em;
        padding: 12px 12px 12px 60px;
        outline: none;
        border: none;
    }

    &__completeAll {
        width: 0;
        height: 0;
        border: none;
        opacity: 0;
        position: absolute;
        right: 100%;
        bottom: 100%;
    }

    &__completeAll + label {
        cursor: pointer;
        position: absolute;
        opacity: 100;
        left: 18px;
        top: 73px;
        transform: rotate(90deg);
    }

    label:before {
        content: "❯";
        font-size: 22px;
        color: #e6e6e6;
    }

    &__completeAll:checked + label:before {
        color: #737373;
    }
}
</style>
