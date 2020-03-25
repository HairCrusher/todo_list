<template>
    <p>

        <input
                type="checkbox"
                :checked="value.checked"
                @input="check"
                :disabled="isNew || isEdit"
                :id="index"
        >
        <input
                class="text"
                type="text"
                v-if="isEdit"
                :value="value.text"
                @input="$emit('input', {text: $event.target.value, checked: value.checked})"
        >
        <label class="text" :for="index" v-else>
            <span>{{value.text}}</span>
        </label>
        <MinusCircle v-if="isEdit" @click="$emit('remove', index)"/>
    </p>
</template>

<script>
    import MinusCircle from 'vue-material-design-icons/MinusCircle';

    export default {
        name: "todoItem",
        components: {
            MinusCircle
        },
        props: ['value', 'isEdit', 'isNew', 'index'],
        methods: {
            check($event) {
                this.$emit('input', {text: this.value.text, checked: $event.target.checked});
                if (!this.isNew)
                    this.$emit('updateCB');
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
        display: flex;
        .text {
            flex-grow: 2;
            border: none;
            margin: 0 10px;
            font-size: 14px;
            padding: 5px;
            outline: none;
        }
        input.text {
            background-color: #2f2f2f;
        }
        .minus-circle-icon {
            top: -3px;
        }
    }
</style>