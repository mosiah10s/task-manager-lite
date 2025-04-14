const STORAGE_KEY = 'task-manager-lite-tasks';

const mockTask = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, eggs, bread, and fruits",
      priority: 1,
      duration: 30,
      dueDate: new Date(2025, 4, 23),
      completed: false
    },
    {
      id: 2,
      title: "Call dentist",
      description: "Schedule cleaning appointment",
      priority: 2,
      duration: 10,
      dueDate: new Date(2025, 5, 5),
      completed: false
    },
    {
      id: 3,
      title: "Plan family barbecue",
      description: "Pick a date, invite relatives, and buy supplies",
      priority: 2,
      duration: 90,
      dueDate: new Date(2025, 5, 17),
      completed: false
    },
    {
      id: 4,
      title: "Deep clean bathroom",
      description: "Scrub tiles, toilet, and mop floor",
      priority: 3,
      duration: 45,
      dueDate: new Date(2025, 4, 30),
      completed: false
    },
    {
      id: 5,
      title: "Renew car registration",
      description: "Complete online renewal and print sticker",
      priority: 3,
      duration: 15,
      dueDate: new Date(2025, 6, 3),
      completed: false
    },
    {
      id: 6,
      title: "Organize closet",
      description: "Sort out clothes to donate",
      priority: 1,
      duration: 60,
      dueDate: new Date(2025, 5, 10),
      completed: false
    },
    {
      id: 7,
      title: "Water backyard plants",
      description: "Includes front yard if time permits",
      priority: 2,
      duration: 20,
      dueDate: new Date(2025, 6, 1),
      completed: false
    },
    {
      id: 8,
      title: "Buy birthday gift for Mom",
      description: "Find something thoughtful before her birthday",
      priority: 3,
      duration: 30,
      dueDate: new Date(2025, 5, 22),
      completed: false
    },
    {
      id: 9,
      title: "Clean out garage",
      description: "Throw out old paint cans and organize tools",
      priority: 2,
      duration: 120,
      dueDate: new Date(2025, 6, 15),
      completed: false
    }
  ];
  

// Load all tasks
function getTasks() {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

// Save task list
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Add a new task
function addTask(task) {
  const tasks = getTasks();
  task.id = Date.now();
  task.completed = false;
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

// Update an existing task
function updateTask(updatedTask) {
  const tasks = getTasks();
  const updated = tasks.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(updated);
}

// Delete task by ID
function deleteTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);
  saveTasks(tasks);
}

// Toggle task's completed state
function toggleTask(id) {
  const tasks = getTasks().map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasks(tasks);
}

// Seed data for testing
function addSeedData() {
  saveTasks(mockTask);
}

export default {
  getTasks,
  saveTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  addSeedData
};
