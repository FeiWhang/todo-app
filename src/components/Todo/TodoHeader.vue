<template>
    <div class="TodoHeader">
        <header>
            <h1 class="TodoHeader__title">
                {{ todosTitle }}
            </h1>
            <input
                type="checkbox"
                class="TodoHeader__completeAll"
                id="TodoHeader__completeAll"
            />
            <label
                for="TodoHeader__completeAll"
                @click="handleCompleteAll"
            ></label>

            <input
                class="TodoHeader__newTodo"
                placeholder="What needs to be done?"
                type="text"
                v-on:keyup.enter="handleNewTodo"
            />
            <button
                class="TodoHeader__toggleDatePicker"
                @click="toggleDataPicker"
            >
                <v-icon right color="#737373">
                    mdi-calendar-today
                </v-icon>
            </button>
            <div class="TodoHeader__datePicker">
                <v-scale-transition origin="top right">
                    <v-date-picker
                        v-if="showDatePicker"
                        v-model="pickedDate"
                        @click:date="handlePickedDate"
                        color="#2e94cf"
                        :no-title="true"
                        :show-current="false"
                    ></v-date-picker>
                </v-scale-transition>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "TodoHeader",
    data: () => {
        return {
            todosTitle: "Work out",
            pickedDate: "",
            showDatePicker: false,
        };
    },
    methods: {
        handleNewTodo() {
            console.log(this.pickedDate);
            console.log("new todo");
        },
        handleCompleteAll() {
            console.log("complete all");
        },
        toggleDataPicker() {
            this.showDatePicker = !this.showDatePicker;
        },
        handlePickedDate() {
            console.log(this.pickedDate);
            this.toggleDataPicker();
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoHeader {
    width: 100%;
    header {
        position: relative;
    }
    h1 {
        color: white;
        border-radius: 12px 12px 0 0;
        padding: 1rem 0;
        font-size: 32px;
        background-color: var(--regBlue);
    }

    &__newTodo {
        margin: 0;
        width: 88%;
        font-size: 20px;
        line-height: 1.4em;
        padding: 12px 12px 12px 32px;
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
        top: 88px;
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

    &__toggleDatePicker {
        outline: 0;
        border: 0;
    }

    &__datePicker {
        z-index: 100;
        position: absolute;
        top: 132px;
        right: 0;
    }
}
</style>
