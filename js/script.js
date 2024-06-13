let todos = [];
let counter = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('TodoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let title = document.getElementById('title').value;
        let beschreibung = document.getElementById('Beschreibung').value;
        let autor = document.getElementById('autor').value;
        let kategorie = document.getElementById('kategorie').value;
        let wichtig = document.getElementById('wichtig').checked;
        let dringend = document.getElementById('dringend').checked;
        let start = document.getElementById('start').value;
        let end = document.getElementById('end').value;

        let todo = {
            id: counter++, // add a unique id to each todo
            title: title,
            beschreibung: beschreibung,
            autor: autor,
            kategorie: kategorie,
            wichtig: wichtig,
            dringend: dringend,
            start: start,
            end: end
        };

        todos.push(todo);

        addToDoToList(todo);
    });

    function addToDoToList(todo) {
        let todoList = document.querySelector('.ToDo_List');

        let todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        let todoTitle = document.createElement('h3');
        todoTitle.textContent = "Titel: " + todo.title;

        let todoStart = document.createElement('p');
        todoStart.textContent = "Ende: " + todo.start;

        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoStart);

        todoList.appendChild(todoItem);
    }

    let todoItems = document.querySelectorAll('.todo-item');
    let detailsDiv = document.querySelector('.Details');

    todoItems.forEach(function(item) {
        item.addEventListener('click', function() {
            detailsDiv.style.display = 'felx';
                

            let id = item.dataset.id;
            let todo = todos.find(todo => todo.id == id);
        });
    });
});