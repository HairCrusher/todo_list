<template>
    <div>
        <div class="actions">
            <PlusCircle  @click="$router.push({path:'/create'})"/>
        </div>
        <div class="list-wrap">
            <div
                    class="list"
                    v-for="(item, i) in lists"
                    :key="i"
                    @click="$router.push({path: `/${item.id}`})"
            >
                <div class="inner">
                    <div class="title"><p>{{item.title}}</p></div>
                    <div class="todos">
                        <ul>
                            <li v-if="item.todos[0]"><input type="checkbox" :checked="item.todos[0].checked" disabled>
                                {{item.todos[0].text}}
                            </li>
                            <li v-if="item.todos[1]"><input type="checkbox" :checked="item.todos[1].checked" disabled>
                                {{item.todos[1].text}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PlusCircle from 'vue-material-design-icons/PlusCircle';
    import {mapState} from 'vuex';

    export default {
        name: "index",
        components: {
            PlusCircle
        },
        computed: {
            ...mapState({
                lists: state => state.lists,
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .list-wrap {
        display: flex;
        flex-wrap: wrap;

        .list {
            width: 50%;
            padding: 10px;
            box-sizing: border-box;
            cursor: pointer;

            .inner {
                border: 1px #ffffff59 solid;
                border-radius: 4px;
                padding: 10px;
                position: relative;

                &:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 35px;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(0deg, #252524, 76%, transparent);
                }
            }

            .title {
                font-weight: bold;

                p {
                    margin: 5px 0;
                }
            }
        }
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .actions {
        padding: 0 10px;
    }
</style>