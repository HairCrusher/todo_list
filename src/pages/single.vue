<template>
    <div>
        <div class="actions">
            <ArrowLeft @click="$router.push({path: '/'})"/>
            <Delete @click="remove" v-if="!isNew"/>
            <Refresh @click="refresh" v-if="!isNew && isEdit"/>
            <ContentSave @click="save" v-if="isEdit"/>
            <Pencil @click="edit" v-if="!isNew && !isEdit"/>
        </div>
        <input type="text" class="input" v-if="isEdit" v-model="title" placeholder="Title">
        <p class="input" v-else>{{title}}</p>
        <div class="todo-wrap">
            <todoItem
                    v-for="(item, i) in todos"
                    :key="i"
                    v-model="todos[i]"
                    :isEdit="isEdit"
                    :isNew="isNew"
                    :index="i"
                    @updateCB="update"
                    @remove="removeTodo"
            />
            <PlusCircle v-if="isEdit" @click="addTodo"/>
        </div>
    </div>
</template>

<script>
    import ArrowLeft from 'vue-material-design-icons/ArrowLeft';
    import Pencil from 'vue-material-design-icons/Pencil';
    import Delete from 'vue-material-design-icons/Delete';
    import ContentSave from 'vue-material-design-icons/ContentSave';
    import Refresh from 'vue-material-design-icons/Refresh';
    import PlusCircle from 'vue-material-design-icons/PlusCircle';

    import {mapGetters, mapActions} from 'vuex';
    import todoItem from "../components/todoItem";

    export default {
        name: "single",
        components: {
            todoItem,
            ArrowLeft,
            Pencil,
            Delete,
            ContentSave,
            Refresh,
            PlusCircle
        },
        data() {
            return {
                isNew: false,
                isEdit: false,
                id: null,
                title: '',
                todos: [],
            };
        },
        computed: {
            ...mapGetters({
                getListById: 'getListById'
            })
        },
        methods: {
            ...mapActions({
                updateList: 'updateList',
                createList: 'createList',
                removeList: 'removeList'
            }),
            async update() {
                if (!this.isNew)
                    await this.updateList({
                        id: this.id,
                        title: this.title,
                        todos: this.todos
                    });
            },
            edit() {
                this.isEdit = !this.isEdit
            },
            save() {
                this.$eventHub.$emit('open', {
                    text: 'Confirm save action', okFn: async () => {
                        if (this.isNew) {
                            const id = await this.createList({
                                title: this.title,
                                todos: this.todos
                            });
                            await this.$router.push({path: `/${id}`});
                            this.setData();
                            this.isNew = false;
                        } else {
                            await this.updateList({
                                id: this.id,
                                title: this.title,
                                todos: this.todos
                            });
                        }
                        this.isEdit = false;
                    }
                });
            },
            addTodo() {
                this.todos.push({checked: false, text: ''})
            },
            refresh() {
                this.$eventHub.$emit('open', {
                    text: 'Confirm refresh action', okFn: () => {
                        this.setData();
                    }
                });
            },
            setData() {
                let list = this.getListById(this.id);
                if (list) {
                    list = JSON.parse(JSON.stringify(list)); // remove vuex link
                    this.title = list.title;
                    this.todos = list.todos;
                }
            },
            remove() {
                this.$eventHub.$emit('open', {
                    text: 'Confirm remove action', okFn: async () => {
                        await this.removeList(this.id);
                        await this.$router.push({path: '/'})
                    }
                });
            },
            removeTodo(index) {
                this.todos = this.todos.filter((item, i) => i !== index);
            }
        },
        created() {
            this.id = this.$route.params.id;
            if (this.id !== 'create') {
                this.setData();
            } else {
                this.isNew = true;
                this.isEdit = true;
            }
        }
    }
</script>

<style scoped>
    .actions {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px #ffffff59 solid;
    }

    .actions > * {
        padding: 10px;
    }

    .todo-wrap {
        padding: 0 10px;
    }

    .input {
        border: none;
        border-bottom: 1px #ffffff59 solid;
        box-sizing: border-box;
        font-weight: bold;
        width: 100%;
        font-size: 16px;
        padding: 5px;
        margin: 0;
        outline: none;
    }
    input.input {
        background-color: #2f2f2f;
    }
</style>