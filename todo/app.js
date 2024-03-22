import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, set, push, ref, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAudb43Bz9eQY6ap25ZEbxUKNYHUPEdVSw",
  authDomain: "fmp-todo-app-c63af.firebaseapp.com",
  projectId: "fmp-todo-app-c63af",
  storageBucket: "fmp-todo-app-c63af.appspot.com",
  messagingSenderId: "450310694108",
  appId: "1:450310694108:web:d251ab333413d201f00019",
  measurementId: "G-XY93ZJ5L8Z"

  // Your configuration goes here
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
const itemList = document.getElementById('item-list');
const addBtn = document.getElementById('add-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const itemsRef = ref(db, 'items');

let items = [];

onChildAdded(itemsRef, snapshot => {
  items.push({text: snapshot.val().text, id: snapshot.key});
  renderItems();
});

function editItem(id) {
  const newText = prompt("Edit your item:");
  if (newText) {
    const editedItemRef = ref(db, 'items/' + id);
    set(editedItemRef, { text: newText });
    items.find(item => item.id == id).text = newText;
    renderItems();
  }
}

addBtn.addEventListener('click', () => {
  const newItem = document.getElementById('new-item').value.trim();
  if (!newItem) return;
  let itemRef = push(itemsRef);
  set(itemRef, { text: newItem });
  document.getElementById('new-item').value = '';
});

function deleteItem(id) {
  remove(ref(db, 'items/' + id));
  items = items.filter(item => item.id !== id);
  renderItems();
}

function renderItems() {
  itemList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = item.text;
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editItem(item.id));
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteItem(item.id));
    li.appendChild(deleteBtn);

    itemList.appendChild(li);
  });
}

deleteAllBtn.addEventListener('click', () => {
  const itemsRef = ref(db, 'items/');
  remove(itemsRef);
  items = [];
  renderItems();
});
