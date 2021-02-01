<template>
    <div class="TodoSubItem">
        <div class="TodoSubItem__left">
            <button
                class="TodoSubItem__checkbox"
                @click="handleSubItemComplete"
            >
                <v-icon v-if="!isCompleted" color="#e1e1e1"
                    >mdi-checkbox-blank-circle-outline</v-icon
                >
                <v-icon v-if="isCompleted" color="#4fb79f"
                    >mdi-checkbox-marked-circle-outline</v-icon
                >
            </button>
            <p
                class="TodoSubItem__title"
                :style="titleStyle"
                @click="handleSubItemComplete"
            >
                {{ title }}
            </p>
        </div>
        <div class="TodoSubItem__right">
            <button
                class="TodoSubItem__delete"
                v-on:click="handleSubItemDelete"
            >
                <v-icon color="#cc9a9a">mdi-close</v-icon>
            </button>
        </div>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";

export default {
    name: "TodoSubItem",
    props: ["todosIndex", "itemIndex", "subItemIndex"],
    data: () => {
        return {
            title: "",
            isCompleted: false,
        };
    },
    mounted() {
        const subItemRef = db.ref(
            "todos/" +
                auth.currentUser.uid +
                "/" +
                this.todosIndex +
                "/subItems/" +
                this.itemIndex +
                "/" +
                this.subItemIndex
        );

        subItemRef.on("value", (snapshot) => {
            const subItems = snapshot.val();
            this.title = subItems.title;
            this.isCompleted = subItems.complete;
        });
    },
    methods: {
        handleSubItemComplete() {
            const subItemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/subItems/" +
                    this.itemIndex +
                    "/" +
                    this.subItemIndex
            );

            subItemRef.update({ complete: !this.isCompleted });

            const itemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/items/" +
                    this.itemIndex
            );

            if (this.isCompleted == false) {
                itemRef.update({ complete: this.isCompleted });
            }

            // check if all completed
            const subItemsRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/subItems/" +
                    this.itemIndex
            );

            subItemsRef.once("value", (snapshot) => {
                let isAllComplete = true;
                snapshot.forEach((childSnapshot) => {
                    if (!childSnapshot.val().complete) {
                        isAllComplete = false;
                    }
                });

                if (isAllComplete) {
                    itemRef.update({ complete: true });
                }
            });
        },

        handleSubItemDelete() {
            const subItemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/subItems/" +
                    this.itemIndex +
                    "/" +
                    this.subItemIndex
            );
            subItemRef.remove();

            // check if all completed
            const itemRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/items/" +
                    this.itemIndex
            );

            const subItemsRef = db.ref(
                "todos/" +
                    auth.currentUser.uid +
                    "/" +
                    this.todosIndex +
                    "/subItems/" +
                    this.itemIndex
            );

            subItemsRef.once("value", (snapshot) => {
                let isAllComplete = true;
                let count = 0;
                snapshot.forEach((childSnapshot) => {
                    count = count + 1;
                    if (!childSnapshot.val().complete) {
                        isAllComplete = false;
                    }
                });
                console.log(snapshot);

                if (isAllComplete && count != 0) {
                    itemRef.update({ complete: true });
                }
                if (count == 0) {
                    itemRef.update({ complete: false });
                }
            });
        },
    },
    computed: {
        titleStyle() {
            return {
                "text-decoration": this.isCompleted ? "line-through" : "none",
                color: this.isCompleted ? "#d9d9d9" : "inherit",
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.TodoSubItem {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 0;
    border-bottom: 1px solid #f3f3f3;

    &__left {
        display: flex;
        align-items: center;
        margin-left: -2px;
    }

    &__checkbox {
        outline: none;
        margin-right: 16px;
        padding: 0;
    }

    &__title {
        cursor: default;
        transition: color 0.3s ease;
        margin-bottom: -3px;
    }

    &__toggleDetail {
        outline: none;
        padding: 0;
    }
    button {
        outline: 0;
    }
    &__right {
        opacity: 0;
        transform: translateX(3px);
        transition: opacity 0.2s, transform 0.3s ease;
    }
}
.TodoSubItem:hover .TodoSubItem__right {
    opacity: 1;
    transform: translateX(-3px);
}
</style>
