<template>
    <div class="HomeBody">
        <section class="HomeBody__hero">
            <div class="layout">
                <div class="Hero">
                    <div class="Hero__quote">
                        <h1>It's how you</h1>
                        <h1>prioritize in life</h1>
                        <LinkGo
                            to="/login"
                            target="_blank"
                            title="Join us"
                            bgColor="#324558"
                            elemColor="white"
                        />
                    </div>
                    <img
                        src="@/assets/img/logo.png"
                        alt=""
                        class="Hero__logo"
                    />
                </div>
            </div>
        </section>
        <section class="HomeBody__register">
            <div class="layout">
                <div class="Register">
                    <h1>Register Now!</h1>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import LinkGo from "@/components/LinkGo";
export default {
    name: "HomeBody",
    components: { LinkGo },
};
</script>

<style lang="scss" scoped>
.HomeBody {
    .layout {
        width: var(--layoutWidth);
        margin: 0 auto;
    }

    &__register {
        height: 300px;
        background-color: var(--blueHover);
    }
}

.Hero {
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__quote {
        display: flex;
        flex-direction: column;
        h1 {
            font-size: 72px;
            margin: 0;
        }

        .LinkGo {
            margin-top: 1rem;
        }
    }

    &__logo {
        height: 380px;
        width: auto;
    }
}
</style>
