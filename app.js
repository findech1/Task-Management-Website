// Initialize Firebase with your config
firebase.initializeApp({
  apiKey: "AIzaSyA5rOEITB2SnSlyyu1jOKOMSGJipEqVD_w",
  authDomain: "task-management-website-fa8b6.firebaseapp.com",
  databaseURL: "https://task-management-website-fa8b6-default-rtdb.firebaseio.com",
  projectId: "task-management-website-fa8b6",
  storageBucket: "task-management-website-fa8b6.appspot.com",
  messagingSenderId: "853724467149",
  appId: "1:853724467149:web:e660bdb83cad43a2183e84",
  measurementId: "G-RH5DMBBXC4"
  });
  
  const db = firebase.firestore();
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
  }