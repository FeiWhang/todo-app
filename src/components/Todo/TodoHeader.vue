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
                class="TodoHeader__newItem"
                placeholder="What needs to be done?"
                type="text"
                v-on:keyup.enter="handleNewItem"
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
import { mapActions } from "vuex";

export default {
    name: "TodoHeader",
    props: ["todosIndex"],
    data: () => {
        return {
            isCompleted: false,
            todosTitle: "",
            pickedDate: "",
            showDatePicker: false,
            todosRef: db.ref("todos/" + auth.currentUser.uid),
            itemsRef: db.ref("items/" + auth.currentUser.uid),
        };
    },
    mounted() {
        this.todosRef.child(this.todosIndex).on("value", (snapshot) => {
            this.isCompleted = snapshot.val().complete;
        });

        db.ref(
            "todos/" + auth.currentUser.uid + "/" + this.todosIndex + "/name"
        ).on("value", (snapshot) => {
            this.todosTitle = snapshot.val();
        });
    },
    methods: {
        ...mapActions(["removeTodo", "createNewItem", "completeAllItem"]),
        handleRemoveTodo() {
            this.removeTodo(this.todosIndex);
        },
        handleNewItem(e) {
            this.createNewItem({
                title: e.target.value.trim(),
                targetDate: this.pickedDate,
                todosIndex: this.todosIndex,
            });

            this.pickedDate = "";
            e.target.value = "";
        },
        handleCompleteAll() {
            const form = {
                isCompleted: this.isCompleted,
                todosIndex: this.todosIndex,
            };

            this.completeAllItem(form);
        },
        toggleDatePicker() {
            this.showDatePicker = !this.showDatePicker;
        },
        handlePickedDate() {
            setTimeout(() => {
                this.toggleDatePicker();
            }, 100);
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

    &__newItem {
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
