<template>
    <Teleport to="body">
        <div v-if="visible" class="modal-overlay">

            <div v-if="visible" class="modal">

                <form @submit.prevent="handleSubmit" class="container">
                    <label>Title</label>
                    <input v-model="editableTask.title" placeholder="Title *" required />
                    <label>Description</label>
                    <input v-model="editableTask.description" placeholder="Description" />
                    <label>Priority</label>
                    <select v-model.number="editableTask.priority">
                        <option disabled value="">Please select one</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>

                    <label>Date</label>
                    <input type="date" v-model="editableTask.dueDate" />
                    <label>Duration in minutes</label>
                    <input type="number" v-model.number="editableTask.duration" min="1" placeholder="Duration" />
                    <div class="actions">
                        <button type="submit">{{ isNew ? 'Add Task' : 'Save' }}</button>
                        <button type="button" @click="close">Cancel</button>
                    </div>
                </form>
                <!-- <button @click="$emit('close')">Close</button> -->
            </div>

        </div>

    </Teleport>
</template>

<script>
export default {
    name: 'TaskForm',
    props: {
        visible: Boolean,
        task: Object,
        isNew: Boolean
    },
    emits: ["close", "create", "update"],
    data() {
        return {
            editableTask: { ...this.task }
        }
    }, watch: {
        task: {
            immediate: true,
            handler(newTask) {
                this.editableTask = { ...newTask };
            }
        },
        visible(val) {
            if (val && this.isNew) {
                // Reset form when opening a new task
                this.editableTask = {
                    title: '',
                    description: '',
                    priority: 1,
                    dueDate: '',
                    duration: null
                };
            }
        }
    },
    methods: {
        handleSubmit() {
            if (!this.editableTask.title.trim()) return;
            if (this.isNew) {
                console.log("CREATE")
                this.$emit('create', { ...this.editableTask, id: Date.now(), completed: false });
            } else {
                this.$emit('update', this.editableTask);
            }
        },
        close() {
            this.$emit('close', this.editableTask.id);
        }
    }

}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
}

.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.container {
    display: grid;
    row-gap: 5px;

}
</style>