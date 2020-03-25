<template>
    <div class="wrapper" v-if="isOpen" @click.self="close">
        <div class="inner">
            <p class="text">{{text}}</p>
            <div class="actions">
                <button @click="close">Cancel</button>
                <button @click="ok">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dialogcomp",
        data() {
            return {
                text: '',
                isOpen: false,
                okFn: null,
            };
        },
        methods: {
            ok() {
                this.okFn();
                this.close();
            },
            open({text, okFn}) {
                this.text = text;
                this.okFn = okFn;
                this.isOpen = true;
            },
            close() {
                this.isOpen = false;
            }
        },
        created() {
            this.$eventHub.$on('open', this.open)
        },
        beforeDestroy(){
            this.$eventHub.$off('open');
        },
    }
</script>

<style scoped>
    .wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: #00000073;
        display: flex;
    }

    .inner {
        width: 400px;
        padding: 15px;
        box-sizing: border-box;
        margin: auto;
        background-color: #3a3a3a;
        -webkit-box-shadow: 0 0 4px #000;
        box-shadow: 0 0 0 #000;
        border-radius: 4px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
    }
</style>