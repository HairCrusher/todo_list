import Vue from 'vue';
import Vuex from 'vuex';
import {IRootState} from './types'

Vue.use(Vuex);

const storageKey = 'todo-list';

export default new Vuex.Store({
    state: {
        lists: [],
    },
    getters: {
        getListById: (state: IRootState) => id => state.lists.find(item => item.id == id),
    },
    mutations: {
        setLists(state: IRootState, list) {
            state.lists = list;
        },
        createList(state: IRootState, newList) {
            state.lists.push(newList);
        },
        updateList(state: IRootState, newList) {
            state.lists = state.lists.map(item => {
                return item.id == newList.id ? newList : item;
            });
        },
        removeList(state: IRootState, id) {
            state.lists = state.lists.filter(item => item.id != id);
        }
    },
    actions: {
        fetchLists({commit}) {
            try {

                const list = JSON.parse(localStorage.getItem(storageKey));

                if (list)
                    commit('setLists', list);

            } catch (e) {
                console.log(e);
            }
        },
        saveLists({state}) {
            localStorage.setItem(storageKey, JSON.stringify(state.lists));
        },
        async createList({commit, dispatch}, list){
            list.id = Date.now(); //TODO hash+timestamp
            commit('createList', list);

            await dispatch('saveLists');

            return list.id;
        },
        async updateList({commit, dispatch}, list){
            commit('updateList', list);

            await dispatch('saveLists');
        },
        async removeList({commit, dispatch}, id){
            commit('removeList', id);

            await dispatch('saveLists');
        }
    }
});