<template>
    <div class="TodoHeader">
        <header>
            <h1 class="TodoHeader__title">
                {{ todosTitle }}
            </h1>
            <button class="TodoHeader__remove" @click="handleRemoveTodo">
                <v-icon right color="#f1f1f1">
                    mdi-trash-can-outline
                </v-icon>
            </button>
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
                maxlength="45"
            />
            <button
                class="TodoHeader__toggleDatePicker"
                @click="toggleDatePicker"
            >
                <v-icon right color="#c8c8c8">
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
import { db, auth } from "@/firebase";

export default {
    name: "TodoHeader",
    props: ["todosIndex"],
    data: () => {
        return {
            todosTitle: "",
            pickedDate: "",
            showDatePicker: false,
        };
    },
    mounted() {
        // get todo name from db
        db.ref(
            "todos/" + auth.currentUser.uid + "/" + this.todosIndex + "/name"
        ).on("value", (snapshot) => {
            this.todosTitle = snapshot.val();
        });
    },
    methods: {
        handleRemoveTodo() {
            const todoRef = db.ref(
                "todos/" + auth.currentUser.uid + "/" + this.todosIndex
            );
            todoRef.remove();
        },
        handleNewTodo(e) {
            const item = {
                title: e.target.value.trim(),
                targetDate: this.pickedDate,
                complete: false,
            };
            db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/items"
            ).push(item);
            this.pickedDate = "";
            e.target.value = "";
        },
        handleCompleteAll() {
            console.log("complete all");
        },
        toggleDatePicker() {
            this.showDatePicker = !this.showDatePicker;
        },
        handlePickedDate() {
            setTimeout(() => {
                this.toggleDatePicker();
            }, 250);
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoHeader {
    width: 100%;
    border-bottom: 1px solid #ededed;
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

    &__remove {
        position: absolute;
        top: 27px;
        right: 20px;
        outline: none;
        border: none;
    }

    &__newTodo {
        margin: 0;
        width: 88%;
        font-size: 20px;
        line-height: 1.4em;
        padding: 12px 12px 12px 38px;
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
        left: 24px;
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
