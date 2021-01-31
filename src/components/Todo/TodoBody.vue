<template>
    <div class="TodoBody">
        <h1>
            {{ "Hi !, " + this.userProfile.firstName }}
        </h1>
    </div>
</template>

<script>
// import { db, auth } from "@/firebase";
import { mapGetters } from "vuex";
export default {
    name: "TodoBody",

    computed: {
        ...mapGetters(["userProfile"]),
    },
};
</script>

<style lang="scss" scoped></style>
