import { createStore } from 'vuex';

const STORAGE_KEY = 'task-manager-lite-tasks';

export default createStore({
    state: {
        tasks: JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        addTask(state, tasks) {
            state.tasks.push(tasks);
        },
        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask);
            }
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(t => t.id !== id);
        }

    },
    actions: {
        saveTasks({ state }) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
        },
        addTask({ commit, dispatch }, task) {
            commit('addTask', task);
            dispatch('saveTasks')
        },
        updateTask({ commit, dispatch }, task) {
            commit('updateTask', task);
            dispatch('saveTasks');
        },
        deleteTask({ commit, dispatch }, id) {
            commit('deleteTask', id);
            dispatch('saveTasks');
        }
    },
    getters: {
        allTasks(state) {
            return state.tasks
        },
        activeTasks(state) {
            return state.tasks.filter(x => !x.isDeleted)
        }
    }






})