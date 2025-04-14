<template>
  <div class="client-list">
    <h2>Tasks</h2>
    <button type="button" @click="open = true">Add New Task</button>
    <transition-group name="fade" tag="ul" appear>
      <li v-for="task in computedTasks" :key="task.id">

        <div class="client-card" :class="{ completed: task.completed }">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>priority: {{ task.priority }}</p>
          <p>Date: {{ task.dueDate }}</p>
          <font-awesome-icon :icon="['fas', 'pen']" @click="editTask(task)" class="edit-icon" />
          <font-awesome-icon :icon="['fas', 'trash']" @click="deleteTask(task)" />
          <div>
            <p>Completed: </p><input type="checkbox" :checked="task.completed" @change="toggleCompleted(task)" />
          </div>
        </div>

      </li>
    </transition-group>

    <TaskForm :visible="open" :isNew="isNew" :task="currentTask" @create="handleCreate" @update="handleUpdate"
      @close="open = false" />
  </div>


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskForm from './TaskForm.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faPen);

export default {
  name: 'Dashboard',
  components: { TaskForm, FontAwesomeIcon },
  data() {
    return {
      open: false,
      currentTask: {
        title: '',
        description: '',
        priority: 1,
        dueDate: '',
        duration: null
      },
      isNew: true
    };
  },
  computed: {
    ...mapGetters(['activeTasks']),
    computedTasks() {

      const now = new Date().getTime();
      return this.activeTasks.map(task => {
        const dueDate = new Date(task.dueDate).getTime() || Infinity;
        const daysUntilDue = Math.max(0, (dueDate - now) / (1000 * 60 * 60 * 24));
        const score =
          (4 - task.priority) * 2 +
          (1 / (daysUntilDue + 1)) * 3 +
          (1 / (task.duration || 1)) * 1;
        return { ...task, score };
      }).sort((a, b) => b.score - a.score);
    }
  },
  methods: {
    ...mapActions(['addTask', 'updateTask', 'deleteTask']),
    editTask(task) {
      this.currentTask = { ...task };
      this.isNew = false;
      this.open = true;
    },
    deleteTask(task) {
      this.$store.dispatch('deleteTask', task.id);
    },
    handleCreate(task) {
      this.addTask(task);
      this.resetModal();
    },
    handleUpdate(task) {
      this.updateTask(task);
      this.resetModal();
    },
    resetModal() {
      this.open = false;
      this.isNew = true;
      this.currentTask = {
        title: '',
        description: '',
        priority: 1,
        dueDate: '',
        duration: null
      };
    },
    toggleCompleted(task) {
      const updatedTask = { ...task, completed: !task.completed };
      this.updateTask(updatedTask); // Dispatch to Vuex to update + save
    }
  }
};
</script>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

a {
  text-decoration: none;
}

.client-card.completed {
  background-color: #d4fcd4; // light green for completed
  opacity: 0.7;
  text-decoration: line-through;
  transition: all 0.3s ease;
}

.client-list {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }


  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 1rem;

      display: flex;



      .client-card {
        border: 1px solid #ddd;
        border-left: 4px solid #42b983;
        padding: 1rem;
        border-radius: 8px;
        background-color: #f9f9f9;
        width: 500px;

        &:hover {
          background-color: #ccffd9;
        }

        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
          color: #2c3e50;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: #666;
        }
      }


    }




  }
}
</style>