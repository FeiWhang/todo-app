<template>
    <v-app>
        <div id="app" :style="appStyle">
            <router-view />
        </div>
    </v-app>
</template>

<script>
export default {
    name: "App",
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "To do app for everyone",
    },
    computed: {
        appStyle() {
            return {
                "--lightBlue": "#90d3ef",
                "--regBlue": "#2e94cf",
                "--midBlue": "#1080c5",
                "--darkBlue": "#0e6396",
                "--blueHover": "#f5f8fc",
                "--layoutWidth": "1080px",
            };
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
