<template>
    <div class="LoginBody">
        <div class="LoginCard">
            <h1>Login</h1>
            <div class="LoginCard__email">
                <img src="@/assets/img/user.png" alt="" />
                <input
                    v-model.trim="email"
                    type="text"
                    placeholder="Email"
                    @keyup.enter="handleLogin"
                />
            </div>
            <div class="LoginCard__password">
                <img src="@/assets/img/lock.png" alt="" />
                <input
                    v-model.trim="password"
                    type="password"
                    placeholder="Password"
                    @keyup.enter="handleLogin"
                />
            </div>
            <button class="LoginCard__loginButton" @click="handleLogin">
                Log in
            </button>

            <p class="LoginCard__error" if="this.loginErrorMessage">
                {{ this.loginErrorMessage }}
            </p>

            <div class="LoginCard__footer">
                <p>
                    Not a member?
                </p>
                <LinkGo
                    to="/register"
                    title="Sign up"
                    bgColor="transparent"
                    padding="0"
                    elemColor="#0e6396"
                />
            </div>
        </div>
    </div>
</template>

<script>
import LinkGo from "@/components/LinkGo";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "LoginBody",
    components: { LinkGo },
    data: () => {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions(["login"]),
        handleLogin() {
            this.login({
                email: this.email,
                password: this.password,
            });
        },
    },
    computed: {
        ...mapGetters(["loginErrorMessage"]),
    },
};
</script>

<style lang="scss" scoped>
.LoginBody {
    display: flex;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-top: 8rem;
}
.LoginCard {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);

    h1 {
        margin-bottom: 3rem;
        font-size: 32px;
    }

    input {
        padding: 10px 16px 10px 56px;
        font-size: 20px;
        border-radius: 16px;
        background-color: var(--blueHover);
        border: none;
        outline: none;
    }

    input::placeholder {
        color: rgba(0, 0, 0, 0.18);
    }

    &__email {
        position: relative;
        margin-bottom: 1rem;
        img {
            position: absolute;
            top: 11px;
            left: 18px;
            height: 19px;
            width: auto;
        }
    }

    &__password {
        position: relative;
        margin-bottom: 2rem;
        img {
            position: absolute;
            top: 11px;
            left: 16px;
            height: 22px;
            width: auto;
        }
    }

    input:focus {
        box-shadow: 0 0 5px var(--midBlue);
    }

    &__loginButton {
        cursor: pointer;
        font-size: 16px;
        background-color: var(--darkBlue);
        border: none;
        padding: 8px 24px;
        font-weight: 500;
        border-radius: 32px;
        color: white;
        outline: none;
        margin-bottom: 6rem;
        transition: opacity 0.3s ease;
    }

    &__loginButton:hover {
        opacity: 0.75;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;

        p {
            margin-right: 16px;
        }
    }

    &__error {
        color: red;
    }
}
</style>
