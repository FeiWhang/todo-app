<template>
    <div class="registersuccess">
        <Header />
        <img src="@/assets/check.png" alt="" />
        <h1>You have successfully registered !</h1>
        <LinkGo to="/todo" title="Create your first todo" elemColor="#0e6396" />
    </div>
</template>

<script>
import LinkGo from "@/components/LinkGo.vue";
import Header from "@/components/Header.vue";

export default {
    name: "RegisterSuccess",
    metaInfo: {
        title: "Registered",
    },
    components: {
        Header,
        LinkGo,
    },
};
</script>

<style lang="scss" scoped>
.registersuccess {
    display: flex;
    width: var(--layoutWidth);
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-top: 8rem;
    }
}
</style>
