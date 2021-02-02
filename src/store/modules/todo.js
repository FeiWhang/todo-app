import { fb, db, auth } from "@/firebase";

const states = {
    todosRef: [],
    itemsRef: [],
    subItemsRef: [],
};

const getters = {};

const actions = {
    initRef({ commit }) {
        commit("setRef");
    },

    createNewTodo({ commit }, name) {
        const todo = {
            name: name,
            complete: false,
            hideComplete: false,
        };

        commit("setNewTodo", todo);
    },
    removeTodo({ commit }, todosIndex) {
        commit("setRemoveTodo", todosIndex);
    },

    createNewItem({ commit }, form) {
        const item = {
            title: form.title,
            targetDate: form.targetDate,
            complete: false,
            shown: true,
            subItem: 0,
            activeSubItem: 0,
        };
        const todosIndex = form.todosIndex;
        commit("setNewItem", { item, todosIndex });
    },

    completeAllItem({ commit }, form) {
        const isCompleted = form.isCompleted;
        const todosIndex = form.todosIndex;
        commit("setCompleteAllItem", { isCompleted, todosIndex });
    },

    completeItem({ commit }, form) {
        const isCompleted = form.isCompleted;
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;
        commit("setCompleteItem", { isCompleted, todosIndex, itemIndex });
    },

    deleteItem({ commit }, form) {
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;
        commit("setDeleteItem", { todosIndex, itemIndex });
    },

    createNewSubItem({ commit }, form) {
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;
        const subItem = {
            title: form.title,
            complete: false,
        };
        commit("setNewSubItem", { subItem, todosIndex, itemIndex });
    },
};

const mutations = {
    setRef(state) {
        state.todosRef = db.ref("todos/" + auth.currentUser.uid);
        state.itemsRef = db.ref("items/" + auth.currentUser.uid);
        state.subItemsRef = db.ref("subItems/" + auth.currentUser.uid);
    },

    setNewTodo(state, todo) {
        state.todosRef.push(todo);
    },
    setRemoveTodo(state, todosIndex) {
        // remove from todos/
        state.todosRef.child(todosIndex).remove();

        // remove from items/
        state.itemsRef.child(todosIndex).remove();

        // remove from subItems/
        state.subItemsRef.child(todosIndex).remove();
    },

    setNewItem(state, { item, todosIndex }) {
        // add to items/
        state.itemsRef.child(todosIndex).push(item);

        // increment item count in todos/
        state.todosRef
            .child(todosIndex)
            .child("item")
            .set(fb.database.ServerValue.increment(1));
        state.todosRef
            .child(todosIndex)
            .child("activeItem")
            .set(fb.database.ServerValue.increment(1));
    },

    setCompleteAllItem(state, { isCompleted, todosIndex }) {
        // set complete in todos/
        state.todosRef.child(todosIndex).update({ complete: !isCompleted });

        // mark all item complete
        state.itemsRef.child(todosIndex).once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                state.itemsRef
                    .child(todosIndex)
                    .child(childSnapshot.key)
                    .update({ complete: !isCompleted });
            });
        });

        // set activeItem in todos/
        let itemCount = 0;
        state.todosRef
            .child(todosIndex)
            .child("item")
            .once("value", (snapshot) => {
                itemCount = snapshot.val();
            });

        state.todosRef
            .child(todosIndex)
            .child("activeItem")
            .set(isCompleted ? itemCount : 0);
    },

    setCompleteItem(state, { isCompleted, todosIndex, itemIndex }) {
        // update complete to true in items/
        state.itemsRef
            .child(todosIndex)
            .child(itemIndex)
            .update({ complete: !isCompleted });

        // update count in todos/
        state.todosRef
            .child(todosIndex)
            .update({ activeItem: fb.database.ServerValue.increment(-1) });

        // TODO: MARK ALL SUBITEMS COMPLETED
    },

    setDeleteItem(state, { todosIndex, itemIndex }) {
        // delete from items/
        state.itemsRef
            .child(todosIndex)
            .child(itemIndex)
            .remove();

        // delete from subItems/
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .remove();

        // update count in todos/
        state.todosRef
            .child(todosIndex)
            .update({ activeItem: fb.database.ServerValue.increment(-1) });
        state.todosRef
            .child(todosIndex)
            .update({ item: fb.database.ServerValue.increment(-1) });
    },

    setNewSubItem(state, { subItem, todosIndex, itemIndex }) {
        // add to subItems/
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .push(subItem);

        // update count on items/
        state.itemsRef
            .child(todosIndex)
            .child(itemIndex)
            .update();
    },
};

export default {
    states,
    actions,
    getters,
    mutations,
};
