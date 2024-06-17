let todos = [];
let counter = 0;

document.addEventListener('DOMContentLoaded', function() {
    let insertElement = document.querySelector('.Insert_Element');
    let detailsElement = document.querySelector('.Details');
    let todoList = document.querySelector('.ToDo_List');

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

        if (!validateDates(start, end)) {
            return;
        }

        let todo = {
            id: counter++,
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
        todoItem.dataset.id = todo.id;

        let todoTitle = document.createElement('h3');
        todoTitle.textContent = "Titel: " + todo.title;

        let todoEnd = document.createElement('p');
        todoEnd.textContent = "Ende: " + todo.end;

        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoEnd);

        todoItem.addEventListener('click', function() {
            insertElement.style.display = 'none';
            detailsElement.style.display = 'flex';

            let id = Number(this.dataset.id);
            let clickedTodo = todos.find(todo => todo.id === id);

            document.getElementById('title_detail').value = clickedTodo.title;
            document.getElementById('Beschreibung_detail').value = clickedTodo.beschreibung;
            document.getElementById('autor_detail').value = clickedTodo.autor;
            document.getElementById('kategorie_detail').value = clickedTodo.kategorie;
            document.getElementById('wichtig_detail').checked = clickedTodo.wichtig;
            document.getElementById('dringend_detail').checked = clickedTodo.dringend;
            document.getElementById('start_detail').value = clickedTodo.start;
            document.getElementById('end_detail').value = clickedTodo.end;

            document.getElementById('ToDos').dataset.id = this.dataset.id;
        });

        todoList.appendChild(todoItem);

        clearInsertFields();
    });

    document.getElementById('ToDos').addEventListener('submit', function(e) {
        if (e.submitter.id === 'showInsert') {
            e.preventDefault();
            detailsElement.style.display = 'none';
            insertElement.style.display = 'flex';
            clearInsertFields();
        } else {
            e.preventDefault();

            let id = Number(this.dataset.id);
            let index = todos.findIndex(todo => todo.id === id);

            if (e.submitter.value == 'Delete') {
                todos.splice(index, 1);

                let todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
                todoList.removeChild(todoItem);
            } else if (e.submitter.value == 'Update') {
                let start_detail = document.getElementById('start_detail').value;
                let end_detail = document.getElementById('end_detail').value;

                if (!validateDatesUpdate(start_detail, end_detail)) {
                    return;
                }

                todos[index] = {
                    id: id,
                    title: document.getElementById('title_detail').value,
                    beschreibung: document.getElementById('Beschreibung_detail').value,
                    autor: document.getElementById('autor_detail').value,
                    kategorie: document.getElementById('kategorie_detail').value,
                    wichtig: document.getElementById('wichtig_detail').checked,
                    dringend: document.getElementById('dringend_detail').checked,
                    start: start_detail,
                    end: end_detail
                };

                let todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
                todoItem.querySelector('h3').textContent = "Titel: " + todos[index].title;
                todoItem.querySelector('p').textContent = "Ende: " + todos[index].end;
            }

            detailsElement.style.display = 'none';
            insertElement.style.display = 'flex';
        }
    });
});

function validateDates(start, end) {
    if (new Date(start) > new Date(end)) {
        alert("Das Startdatum darf nicht nach dem Enddatum liegen.");
        return false;
    }
    return true;
}

function validateDatesUpdate(start_detail, end_detail) {
    if (new Date(start_detail) > new Date(end_detail)) {
        alert("Das Startdatum darf nicht nach dem Enddatum liegen.");
        return false;
    }
    return true;
}

function clearInsertFields() {
    document.getElementById('title').value = '';
    document.getElementById('Beschreibung').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('kategorie').value = '';
    document.getElementById('wichtig').checked = false;
    document.getElementById('dringend').checked = false;
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
}