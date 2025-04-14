<template>
    <li class="task-card">
      <form @submit.prevent="handleSubmit">
        <input v-model="editableTask.title" placeholder="Title *" required />
        <input v-model="editableTask.description" placeholder="Description" />
        <input type="number" v-model.number="editableTask.priority" min="1" max="3" />
        <input type="date" v-model="editableTask.dueDate" />
        <input type="number" v-model.number="editableTask.duration" min="1" />
        <div class="actions">
          <button type="submit">{{ isNew ? 'Add Task' : 'Save' }}</button>
          <button type="button" @click="cancel">Cancel</button>
        </div>
      </form>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      task: Object,
      isNew: Boolean
    },
    data() {
      return {
        editableTask: { ...this.task }
      };
    },
    methods: {
      handleSubmit() {
        if (!this.editableTask.title.trim()) return;
        if (this.isNew) {
          this.$emit('create', { ...this.editableTask, id: Date.now(), completed: false });
        } else {
          this.$emit('update', this.editableTask);
        }
      },
      cancel() {
        this.$emit('cancel', this.editableTask.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .task-card {
    margin-bottom: 1rem;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  </style>
  