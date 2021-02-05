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
            <button class="TodoHeader__completeAll" @click="handleCompleteAll">
                <v-icon right color="#c8c8c8">
                    mdi-chevron-down
                </v-icon>
            </button>

            <input
                class="TodoHeader__newTodo"
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
import { mapGetters, mapActions } from "vuex";
export default {
    name: "TodoHeader",
    props: ["todosIndex"],
    data: () => {
        return {
            todosTitle: "",
            pickedDate: "",
            showDatePicker: false,
            markComplete: false,
        };
    },
    computed: {
        ...mapGetters(["todosRef"]),
    },
    mounted() {
        // get todo name from db
        this.todosRef
            .child(this.todosIndex)
            .child("name")
            .on("value", (snapshot) => {
                this.todosTitle = snapshot.val();
            });
    },
    methods: {
        ...mapActions([
            "initRef",
            "removeTodo",
            "createNewItem",
            "completeAllItem",
        ]),
        handleRemoveTodo() {
            this.removeTodo(this.todosIndex);
        },
        handleNewItem(e) {
            const title = e.target.value.trim();
            const d = new Date(this.pickedDate);
            const timestamp = this.pickedDate === "" ? "" : d.getTime();
            if (title !== "") {
                const form = {
                    title: title,
                    targetDate: timestamp,
                    todosIndex: this.todosIndex,
                };
                this.createNewItem(form);
                this.pickedDate = "";
                e.target.value = "";
            }
            this.$emit("newItem");
            // for some reason have to refresh the page
            // other wise the ordering is messed up
            this.$router.go(this.$router.currentRoute);
        },
        handleCompleteAll() {
            const form = {
                markComplete: this.markComplete,
                todosIndex: this.todosIndex,
            };
            this.completeAllItem(form);
            this.markComplete = !this.markComplete;
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

    button {
        outline: 0;
    }

    &__remove {
        position: absolute;
        top: 27px;
        right: 20px;
        outline: none;
        border: none;
    }

    &__completeAll {
        position: absolute;
        left: 8px;
        top: 94px;
    }

    &__newTodo {
        margin: 0;
        width: 88%;
        font-size: 20px;
        line-height: 1.4em;
        padding: 12px 12px 12px 40px;
        outline: none;
        border: none;
    }

    &__toggleDatePicker {
        outline: 0;
        border: 0;
        margin-right: 8px;
    }

    &__datePicker {
        z-index: 100;
        position: absolute;

        top: 132px;
        right: 0;
    }
}
</style>
