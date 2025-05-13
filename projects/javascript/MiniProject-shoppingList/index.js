document.addEventListener('DOMContentLoaded', loadItems);

function addItem() {
    const itemInput = document.getElementById('item');
    const quantityInput = document.getElementById('quantity');
    const itemText = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value) || 1;

    if (itemText === '') {
        alert('Please enter an item name');
        return;
    }

    const item = {
        id: Date.now(),
        text: itemText,
        quantity: quantity,
        completed: false
    };

    // Add to DOM
    appendItemToDOM(item);

    // Save to local storage
    saveItem(item);

    // Update Clear All button visibility
    toggleClearAllButton();

    // Clear inputs
    itemInput.value = '';
    quantityInput.value = '1';
}

function appendItemToDOM(item) {
    const itemList = document.getElementById('itemList');
    const li = document.createElement('li');
    li.className = `flex items-center justify-between p-3 bg-white rounded-lg shadow ${item.completed ? 'opacity-50 line-through' : ''}`;
    li.dataset.id = item.id;
    li.innerHTML = `
        <span class="flex-1 cursor-pointer" onclick="toggleComplete(${item.id})">
            ${item.text} (Qty: ${item.quantity})
        </span>
        <button onclick="deleteItem(${item.id})" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
        </button>
    `;
    itemList.appendChild(li);
}

function saveItem(item) {
    let items = getItems();
    items.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function getItems() {
    return JSON.parse(localStorage.getItem('shoppingList')) || [];
}

function loadItems() {
    const items = getItems();
    items.forEach(item => appendItemToDOM(item));
    toggleClearAllButton();
}

function deleteItem(id) {
    let items = getItems();
    items = items.filter(item => item.id !== id);
    localStorage.setItem('shoppingList', JSON.stringify(items));
    document.querySelector(`li[data-id="${id}"]`).remove();
    toggleClearAllButton();
}

function toggleComplete(id) {
    let items = getItems();
    const item = items.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        localStorage.setItem('shoppingList', JSON.stringify(items));
        const li = document.querySelector(`li[data-id="${id}"]`);
        li.className = `flex items-center justify-between p-3 bg-white rounded-lg shadow ${item.completed ? 'opacity-50 line-through' : ''}`;
        li.querySelector('span').textContent = `${item.text} (Qty: ${item.quantity})`;
    }
}

function clearAllItems() {
    if (confirm('Are you sure you want to delete all items?')) {
        localStorage.removeItem('shoppingList');
        document.getElementById('itemList').innerHTML = '';
        toggleClearAllButton();
    }
}

function toggleClearAllButton() {
    const clearAllContainer = document.getElementById('clearAllContainer');
    const items = getItems();
    clearAllContainer.classList.toggle('hidden', items.length === 0);
}