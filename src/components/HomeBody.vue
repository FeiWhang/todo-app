<template>
    <div class="HomeBody">
        <section class="HomeBody__hero">
            <div class="layout">
                <div class="Hero">
                    <div class="Hero__quote">
                        <h1>It's how you</h1>
                        <h1>prioritize in life</h1>
                        <LinkGo
                            to="/register"
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
        <section class="HomeBody__login">
            <div class="layout">
                <div class="Login">
                    <h1>Already have an account?</h1>
                    <LinkGo
                        to="/login"
                        title="Login now"
                        bgColor="#0e6396"
                        elemColor="white"
                    />
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
        padding: 6rem 0;
    }

    &__login {
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
        height: 388px;
        width: auto;
    }
}

.Login {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        margin: 0 0 2rem 0;
    }

    padding: 4rem 0;
}
</style>
