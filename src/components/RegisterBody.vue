<template>
    <div class="RegisterBody">
        <div class="RegisterCard">
            <h1>Get Started</h1>
            <div class="RegisterCardForm">
                <div class="RegisterCardForm__name">
                    <input
                        v-model.trim="firstName"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        v-model.trim="lastName"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <div class="RegisterCardForm__email">
                    <input
                        v-model.trim="email"
                        type="text"
                        placeholder="Email"
                        @keyup.enter="handleLogin"
                    />
                </div>
                <div class="RegisterCardForm__password">
                    <input
                        v-model.trim="password"
                        type="password"
                        placeholder="Password"
                        @keyup.enter="handleRegister"
                    />
                </div>
                <div class="RegisterCardForm__confirmPassword">
                    <input
                        v-model.trim="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        @keyup.enter="handleRegister"
                    />
                </div>
            </div>

            <button
                class="RegisterCard__registerButton"
                @click="handleRegister"
            >
                Sign Up
            </button>

            <p class="RegisterCard__error" if="this.registerErrorMessage">
                {{ this.registerErrorMessage }}
            </p>
            <div class="RegisterCard__footer">
                <p>
                    Already have an account?
                </p>
                <LinkGo
                    to="/login"
                    title="Log in"
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
    name: "RegisterBody",
    components: { LinkGo },
    data: () => {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    },
    methods: {
        ...mapActions(["register"]),
        handleRegister() {
            this.register({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
            });
        },
    },
    computed: {
        ...mapGetters(["registerErrorMessage"]),
    },
};
</script>

<style lang="scss" scoped>
.RegisterBody {
    display: flex;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-top: 8rem;
}
.RegisterCard {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);

    h1 {
        margin-bottom: 3rem;
        font-size: 32px;
    }

    &__registerButton {
        cursor: pointer;
        font-size: 16px;
        background-color: var(--darkBlue);
        border: none;
        padding: 8px 24px;
        font-weight: 500;
        width: 120px;
        border-radius: 32px;
        color: white;
        outline: none;
        margin-bottom: 6rem;
        transition: opacity 0.3s ease;
    }

    &__registerButton:hover {
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

.RegisterCardForm {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    input {
        padding: 12px 24px;
        margin: 0.5rem 1rem;
        width: 500px;
        font-size: 20px;
        border-radius: 16px;
        background-color: var(--blueHover);
        border: none;
        outline: none;
    }

    input::placeholder {
        color: rgba(0, 0, 0, 0.18);
    }

    input:focus {
        box-shadow: 0 0 5px var(--midBlue);
    }

    &__confirmPassword {
        margin-bottom: 2.5rem;
    }

    &__name {
        display: flex;
        input {
            margin: 0.5rem;
            width: 218px;
        }
    }
}
</style>
