<template>
    <div class="LoginBody">
        <div class="LoginCard">
            <h1>Login</h1>
            <div class="LoginCard__email">
                <img src="@/assets/img/user.png" alt="" />
                <input type="text" placeholder="Email" />
            </div>
            <div class="LoginCard__password">
                <img src="@/assets/img/lock.png" alt="" />
                <input type="password" placeholder="Password" />
            </div>
            <button class="LoginCard__loginButton">LOG IN</button>

            <div class="LoginCard__footer">
                <p>
                    Not a member? <span><a href="">Sign up now</a></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginBody",
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
        margin-bottom: 2.5rem;
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
        margin-bottom: 3rem;
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
        font-size: 18px;
        background-image: linear-gradient(
            to bottom right,
            var(--lightBlue),
            var(--darkBlue)
        );
        border: none;
        padding: 10px 24px;
        border-radius: 32px;
        color: white;
        outline: none;
        margin-bottom: 4rem;
    }

    &__footer {
        margin-left: 8px;
        a {
            text-decoration: none;
            color: var(--regBlue);
            padding: 5px 16px;
            margin-left: 6px;
            border-radius: 16px;
        }
        a:hover {
            background-color: var(--blueHover);
        }
    }
}
</style>
