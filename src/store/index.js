import { createStore } from 'vuex';

const STORAGE_KEY = 'task-manager-lite-tasks';
const seedTasks = () => ([
    {
        id: Date.now(),
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        priority: 2,
        dueDate: new Date().toISOString().slice(0, 10),
        duration: 30,
        completed: false,
        isDeleted: false
    },
    {
        id: Date.now() + 1,
        title: 'Workout',
        description: '30-min run, 15 mins to drive home',
        priority: 1,
        dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // tomorrow
        duration: 45,
        completed: false,
        isDeleted: false
    }
]);

export default createStore({
    state: {
        tasks: JSON.parse(localStorage.getItem(STORAGE_KEY)) || seedTasks()
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