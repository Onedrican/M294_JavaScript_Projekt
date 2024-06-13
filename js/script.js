let todos = [];
let counter = 0;

document.addEventListener('DOMContentLoaded', function() {
    let insertElement = document.querySelector('.Insert_Element');
    let detailsElement = document.querySelector('.Details');
    let todoList = document.querySelector('.ToDo_List');

    // Show Insert_Element and hide Details by default
    insertElement.style.display = 'flex';
    detailsElement.style.display = 'none';

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

        let todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.dataset.id = todo.id; // store the id in a data attribute

        let todoTitle = document.createElement('h3');
        todoTitle.textContent = "Titel: " + todo.title;

        let todoEnd = document.createElement('p');
        todoEnd.textContent = "Ende: " + todo.end;

        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoEnd);

        todoItem.addEventListener('click', function() {
            // Hide Insert_Element and show Details when a todo item is clicked
            insertElement.style.display = 'none';
            detailsElement.style.display = 'flex';

            // Fill the Details form with the data of the clicked todo item
            let id = this.dataset.id;
            let clickedTodo = todos.find(todo => todo.id == id);

            document.getElementById('title_detail').value = clickedTodo.title;
            document.getElementById('Beschreibung_detail').value = clickedTodo.beschreibung;
            document.getElementById('autor_detail').value = clickedTodo.autor;
            document.getElementById('kategorie_detail').value = clickedTodo.kategorie;
            document.getElementById('wichtig_detail').checked = clickedTodo.wichtig;
            document.getElementById('dringend_detail').checked = clickedTodo.dringend;
            document.getElementById('start_detail').value = clickedTodo.start;
            document.getElementById('end_detail').value = clickedTodo.end;
        });

        todoList.appendChild(todoItem);
    });
});