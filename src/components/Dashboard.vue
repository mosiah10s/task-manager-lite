<template>
  <div class="client-list">
    <h2>Tasks</h2>
    <button type="button" @click="open = true">Add New Task</button>
    <transition-group name="fade" tag="ul" appear>
      <li v-for="task in computedTasks" :key="task.id" :class="{ completed: task.completed }">
        <!-- <router-link :to="{ name: 'ClientDetails', params: { id: task.id } }"> -->
        <div class="client-card">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>priority: {{ task.priority }}</p>
          <p>Date: {{ task.dueDate }}</p>
          <font-awesome-icon :icon="['fas', 'pen']" @click="editTask(task)" class="edit-icon" />
          <font-awesome-icon :icon="['fas', 'trash']" @click="deleteTask(task)" />
          <div>
            <p>Completed: </p><input type="checkbox" v-model="task.completed" />
          </div>
        </div>
        <!-- </router-link> -->
      </li>
    </transition-group>

    <TaskForm :visible="open" :isNew="isNew" @close="open = false" :task="currentTask" @create="addTask"
      @update="updateTask" />
  </div>


</template>

<script>
import taskService from '@/services/taskService.js'
import TaskForm from './TaskForm.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPen)

export default {
  name: 'Dashboard',
  components: { TaskForm, FontAwesomeIcon },
  data() {
    return {
      tasks: [],
      open: false,
      currentTask: {},
      isNew: true
    }
  },
  mounted() {

    this.tasks = taskService.getTasks()
    console.log('Loaded tasks:', this.tasks)
  },
  computed: {
    computedTasks() {
      return this.tasks.filter(x => !x.isDeleted).sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB; // ascending due date
        }

        return a.priority - b.priority
      })
    }
  },
  methods: {
    addTask(val) {

      console.log("addtask", val)
      this.tasks.push(taskService.addTask(val))
      this.open = false;
      this.currentTask = {}
      console.log('current', this.currentTask)

    },
    editTask(task) {
      this.currentTask = { ...task }
      this.isNew = false
      this.open = true

    },
    deleteTask(task) {
      task.isDeleted = true
      taskService.deleteTask(task.id)
    },
    updateTask(task) {
      this.open = false
      taskService.updateTask(task)
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {

        this.tasks.splice(index, 1, task);
      }
    }
  }
}
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

      &.completed .client-card {
        background-color: #d4fcd4; // light green for completed
        opacity: 0.7;
        text-decoration: line-through;
        transition: all 0.3s ease;
      }

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