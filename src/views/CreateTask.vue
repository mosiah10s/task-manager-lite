<template>
  <div class="about">
    <h1>Create a Task</h1>
    <form @submit.prevent="createClient">
      <p>
        <label>First Name:</label>
        <input type="text" required v-model="firstName" />
      </p>
      <p>
        <label>Last Name:</label>
        <input type="text" required v-model="lastName" />
      </p>
      <p>
        <label>Email:</label>
        <input type="email" required v-model="email" />
      </p>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import clientService from '@/services/clientService.js'

export default {
  name: 'CreateTask',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: ''
    }
  },
  methods: {
    async createClient() {
      try {
        const response = await clientService.create({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        })

        console.log('Client created:', response.data)

        // Reset form
        this.firstName = ''
        this.lastName = ''
        this.email = ''

        // Redirect to home
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error creating client:', error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
form {
  button {
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    border: none;
    text-align: center;
    background-color: #42b983;
    color: white;
  }

  p {
    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      font-size: 0.9rem;
      padding-bottom: 10px;
    }

    input {
      padding: 10px;
      font-size: 1rem;
      margin-bottom: 10px;
    }
  }
}
</style>

