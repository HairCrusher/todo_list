<template>
    <div id="app">
        <div class="container">
          <router-view/>
        </div>
        <Dialog/>
    </div>
</template>

<script>
    import Dialog from "./components/dialog";
    export default {
        name: 'App',
        components: {Dialog},
        async beforeMount() {
            await this.$store.dispatch('fetchLists');
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #ccc;
        padding-top: 100px;
        min-height: 100vh;
        background-color: #252525;
    }

    button {
        font-size: 16px;
        background: #ffffff1a;
        border: none;
        color: #ccc;
        padding: 7px;
        cursor: pointer;
    }

    button:hover {
        background: #ffffff30;
    }

    input {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #ccc;
    }

    .container {
      max-width: 500px;
      margin: auto;
    }

    .material-design-icon {
        font-size: 2em;
    }
    
    input[type="checkbox"] {
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.5);
    }
</style>
