const   addBtn = document.querySelector('.addform__button'),
        todo = document.querySelector('.todo-list__items'),
        btnDelAll = document.querySelector('.delete-all-btn'),
        btnDelSel = document.querySelector('.delete-selected-btn'),
        importantTasksBtn = document.querySelector('.important-tasks'),
        showAllTasksBtn = document.querySelector('.all-tasks-btn')
 
let     btnDelItems = document.querySelectorAll('.todo-list__delete-btn'),
        input = document.querySelector('.addform__input')

let     toDoList = []

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('ToDoList')){
        toDoList = JSON.parse(localStorage.getItem('ToDoList'))
        displayTasks()
    }
    hideButtons()
})

function hideButtons() {
    if (toDoList.length === 0) {
        document.querySelector('.delete-all-btn').classList.add('btn-hide')
        document.querySelector('.delete-selected-btn').classList.add('btn-hide')
    } else {
        document.querySelector('.delete-all-btn').classList.remove('btn-hide')
        document.querySelector('.delete-selected-btn').classList.remove('btn-hide')
    }
}

function addTask () {
    let newToDo = {
        inputValue: input.value,
        checked: false,
    }

    if (input.value.trim() !== '') {
        toDoList.push(newToDo)
        todo.innerHTML = ''
        displayTasks()
    } else {
        alert ('Enter the task please!...')
    }
    findBtnDel()
}

function findBtnDel() {
    btnDelItems = document.querySelectorAll('.todo-list__delete-btn')
    btnDelItems.forEach(function(item, i){
        item.addEventListener('click', function(){
            deleteItem(item, i)
        })
    })
}

function displayTasks(){
    todo.innerHTML = ''
    toDoList.forEach(function(item, i) {
        todo.innerHTML += `<li class="todo-list__item">
        <label>
            <input id="item_${i}" class="checkbox__input" type="checkbox">
            <span class="checkbox"></span>
        </label>
        <p>${item.inputValue}</p>
        <button class="todo-list__delete-btn"></button>
        <button class="todo-list__favorite-btn">
        <label>
            <input id="item-fav_${i}" ${item.checked ? 'checked' : ''} class="checkbox__input-fav" type="checkbox">
            <span class="checkbox-favorite"></span>
        </label>
        </button>
    </li>`
    document.getElementById('input-field').value = ""
    document.querySelector('.todo-list__title').innerHTML = "All tasks"
    hideButtons()
    })
    localStorage.setItem('ToDoList', JSON.stringify(toDoList))
}

function displayImpTasks(){
    todo.innerHTML = ''
    toDoList.forEach(function(item, i) {
        if (item.checked === true) {
        todo.innerHTML += `<li class="todo-list__item">
        <span class="favorite-task-icon"></span>
        <p>${item.inputValue}</p>
    </li>`
    }
    document.getElementById('input-field').value = ""
    })
}

function deleteItem(item, i) {
    toDoList.splice(i, 1)
    displayTasks()
    findBtnDel()
    hideButtons()
}

function deleteAllTasks() {
    toDoList = []
    displayTasks()
}

function deleteSelected() {
    let uncheckedList = []
    toDoList.forEach(function(item, i){
        if (!document.querySelector(`#item_${i}`).checked) {
            uncheckedList.push(item)
        }
    })
    toDoList = uncheckedList
    displayTasks()
    findBtnDel()
    hideButtons()  
}

function findAndDispImpTasks() {
    toDoList.forEach(function(item, i){
        if (document.querySelector(`#item-fav_${i}`).checked) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
    displayImpTasks()
    document.querySelector('.todo-list__title').innerHTML = "Important tasks" 
}

addBtn.addEventListener('click', function(){
    addTask()
    hideButtons()
})

btnDelAll.addEventListener('click', function() {
    deleteAllTasks()
    hideButtons()
})

btnDelSel.addEventListener('click', deleteSelected)

importantTasksBtn.addEventListener('click', function(){
    findAndDispImpTasks()
    document.querySelector('.important-tasks').classList.add('btn-hide')
    document.querySelector('.delete-all-btn').classList.add('btn-hide')
    document.querySelector('.delete-selected-btn').classList.add('btn-hide')
    document.querySelector('.all-tasks-btn').classList.remove('btn-hide')
})

showAllTasksBtn.addEventListener('click', function(){
    document.querySelector('.todo-list__title').innerHTML = "All tasks"
    displayTasks()
    findBtnDel()
    document.querySelector('.important-tasks').classList.remove('btn-hide')
    document.querySelector('.delete-all-btn').classList.remove('btn-hide')
    document.querySelector('.delete-selected-btn').classList.remove('btn-hide')
    document.querySelector('.all-tasks-btn').classList.add('btn-hide')
    hideButtons()
})
















