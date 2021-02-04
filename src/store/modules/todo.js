import { db, auth } from "@/firebase";

const states = {
    todosRef: [],
    itemsRef: [],
    subItemsRef: [],
};

const getters = {
    todosRef: (state) => state.todosRef,
    itemsRef: (state) => state.itemsRef,
    subItemsRef: (state) => state.subItemsRef,
};

const actions = {
    initRef({ commit }) {
        commit("setRef");
    },

    createNewTodo({ commit }, name) {
        const todo = {
            name: name,
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
        };
        const todosIndex = form.todosIndex;
        commit("setNewItem", { item, todosIndex });
    },

    completeAllItem({ state, dispatch }, form) {
        const isCompleted = form.markComplete;
        const todosIndex = form.todosIndex;

        state.itemsRef.child(todosIndex).once("value", (snapshot) => {
            // loop through all items
            snapshot.forEach((childSnapshot) => {
                const itemIndex = childSnapshot.key;
                const form = {
                    isCompleted: isCompleted,
                    todosIndex: todosIndex,
                    itemIndex: itemIndex,
                };
                dispatch("completeItem", form);
            });
        });
    },

    completeItem({ state, commit, dispatch }, form) {
        const isCompleted = form.isCompleted;
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;
        commit("setCompleteItem", {
            isCompleted,
            todosIndex,
            itemIndex,
        });

        // also complete all subItems
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .once("value", (snapshot) => {
                // loop through all subItems
                snapshot.forEach((childSnapshot) => {
                    const form = {
                        isCompleted: isCompleted,
                        todosIndex: todosIndex,
                        itemIndex: itemIndex,
                        subItemIndex: childSnapshot.key,
                    };
                    dispatch("completeSubItem", form);
                });
            });

        // also if todos currently set to
        // hide completed
        let isHideComplete = false;
        state.todosRef
            .child(todosIndex)
            .child("hideComplete")
            .once("value", (snapshot) => (isHideComplete = snapshot.val()));
        // now hide the item as well
        !isCompleted && isHideComplete
            ? commit("setHideItem", { todosIndex, itemIndex })
            : {};
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

        // make the item active again
        const isCompleted = true;
        commit("setCompleteItem", { isCompleted, todosIndex, itemIndex });
    },

    completeSubItem({ dispatch, commit }, form) {
        const isCompleted = form.isCompleted;
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;
        const subItemIndex = form.subItemIndex;
        commit("setCompleteSubItem", {
            isCompleted,
            todosIndex,
            itemIndex,
            subItemIndex,
        });

        // also set item to active again
        // if sub item is to set to active
        if (isCompleted) {
            commit("setCompleteItem", {
                isCompleted,
                todosIndex,
                itemIndex,
            });
        }

        dispatch("checkAllSubItem", { todosIndex, itemIndex });
    },

    checkAllSubItem({ state, commit }, form) {
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;

        // detect if all subitem is completed
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .once("value", (snapshot) => {
                let isAllComplete = true;
                snapshot.forEach((childSnapshot) => {
                    !childSnapshot.val().complete
                        ? (isAllComplete = false)
                        : {};
                });

                const complete = false;

                isAllComplete && snapshot.numChildren() > 0
                    ? commit("setCompleteItem", {
                          complete,
                          todosIndex,
                          itemIndex,
                      })
                    : {};

                // also if todos currently set to
                // hide completed
                let isHideComplete = false;
                state.todosRef
                    .child(todosIndex)
                    .child("hideComplete")
                    .once(
                        "value",
                        (snapshot) => (isHideComplete = snapshot.val())
                    );
                // now hide the item as well
                isAllComplete && isHideComplete
                    ? commit("setHideItem", { todosIndex, itemIndex })
                    : {};
            });
    },

    deleteSubItem({ dispatch, commit }, form) {
        const todosIndex = form.todosIndex;
        const itemIndex = form.itemIndex;
        const subItemIndex = form.subItemIndex;
        commit("setDeleteSubItem", { todosIndex, itemIndex, subItemIndex });

        // check if after delete subitem
        // the subitems are all complete
        // hence the item will be complete
        dispatch("checkAllSubItem", { todosIndex, itemIndex });
    },

    hideCompleted({ commit }, form) {
        const isHideComplete = form.isHideComplete;
        const todosIndex = form.todosIndex;
        commit("setHideCompleted", { isHideComplete, todosIndex });
    },

    clearCompleted({ state, dispatch }, todosIndex) {
        state.itemsRef.child(todosIndex).once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.complete
                    ? dispatch("deleteItem", {
                          todosIndex,
                          itemIndex: childSnapshot.key,
                      })
                    : {};
            });
        });
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
        state.itemsRef.child(todosIndex).push(item);
    },

    setCompleteItem(state, { isCompleted, todosIndex, itemIndex }) {
        // update complete to !current in items/
        state.itemsRef
            .child(todosIndex)
            .child(itemIndex)
            .update({ complete: !isCompleted });
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
    },

    setNewSubItem(state, { subItem, todosIndex, itemIndex }) {
        // add to subItems/
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .push(subItem);
    },

    setCompleteSubItem(
        state,
        { isCompleted, todosIndex, itemIndex, subItemIndex }
    ) {
        // update complete to !current in subItems/
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .child(subItemIndex)
            .update({ complete: !isCompleted });
    },

    setDeleteSubItem(state, { todosIndex, itemIndex, subItemIndex }) {
        // remove from subItems/
        state.subItemsRef
            .child(todosIndex)
            .child(itemIndex)
            .child(subItemIndex)
            .remove();
    },

    setHideCompleted(state, { isHideComplete, todosIndex }) {
        state.todosRef
            .child(todosIndex)
            .update({ hideComplete: isHideComplete });

        // also switch shown of each item in items/
        state.itemsRef.child(todosIndex).once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();

                item.complete
                    ? childSnapshot.ref.update({ shown: !item.shown })
                    : {};
            });
        });
    },

    setHideItem(state, { todosIndex, itemIndex }) {
        state.itemsRef
            .child(todosIndex)
            .child(itemIndex)
            .update({ shown: false });
    },
};

export default {
    states,
    actions,
    getters,
    mutations,
};
