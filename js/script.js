// Initialisiere die Variablen
let todos = [];
let counter = 0;
let completed = 0; 

// Füge einen EventListener hinzu, der ausgeführt wird, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Definiere die Elemente
    let insertElement = document.querySelector('.Insert_Element');
    let detailsElement = document.querySelector('.Details');
    let todoList = document.querySelector('.ToDo_List');

    // Setze die Anfangsdisplay-Einstellungen
    insertElement.style.display = 'flex';
    detailsElement.style.display = 'none';

    // Füge einen EventListener zum Formular hinzu
    document.getElementById('TodoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Hole die Werte aus den Formularfeldern
        let title = document.getElementById('title').value;
        let beschreibung = document.getElementById('Beschreibung').value;
        let autor = document.getElementById('autor').value;
        let kategorie = document.getElementById('kategorie').value;
        let wichtig = document.getElementById('wichtig').checked;
        let dringend = document.getElementById('dringend').checked;
        let start = document.getElementById('start').value;
        let end = document.getElementById('end').value;

        // Überprüfe die Gültigkeit der Daten
        if (!validateDates(start, end)) {
            return;
        }

        // Erstelle das Todo-Objekt
        let todo = {
            id: counter++,
            title: title,
            beschreibung: beschreibung,
            autor: autor,
            kategorie: kategorie,
            wichtig: wichtig,
            dringend: dringend,
            start: start,
            end: end,
            completed: false
        };

        // Füge das Todo zur Liste hinzu
        todos.push(todo);

        // Erstelle das Todo-Element
        let todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.dataset.id = todo.id;

        // Erstelle die Elemente für den Titel und das Enddatum
        let todoTitle = document.createElement('h3');
        todoTitle.textContent = "Titel: " + todo.title;
        let todoEnd = document.createElement('p');
        todoEnd.textContent = "Ende: " + todo.end;

        // Erstelle das Label und die Checkbox für "Erledigt?"
        let todoCheckboxLabel = document.createElement('label');
        todoCheckboxLabel.textContent = "Erledigt?";
        let todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
        todoCheckbox.classList.add('todo-checkbox');
        todoCheckbox.addEventListener('change', function() {
            todo.completed = this.checked;
            if (this.checked) {
                completed++;
            } else {
                completed--;
            }
            updateTitle();
        });

        // Füge die Elemente zum Todo-Element hinzu
        todoItem.appendChild(todoCheckboxLabel);
        todoItem.appendChild(todoCheckbox);
        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoEnd);

        // Füge einen EventListener zum Todo-Element hinzu
        todoItem.addEventListener('click', function() {
            insertElement.style.display = 'none';
            detailsElement.style.display = 'flex';

            let id = Number(this.dataset.id);
            let clickedTodo = todos.find(todo => todo.id === id);

            // Setze die Werte in den Detailfeldern
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

        // Füge das Todo-Element zur Liste hinzu
        todoList.appendChild(todoItem);

        // Leere die Eingabefelder und aktualisiere den Titel
        clearInsertFields();
        updateTitle();
    });

    // Füge einen EventListener zum Detailformular hinzu
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
                // Lösche das Todo aus der Liste und aus dem DOM
                todos.splice(index, 1);
                let todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
                todoList.removeChild(todoItem);
            } else if (e.submitter.value == 'Update') {
                // Aktualisiere das Todo in der Liste und im DOM
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
                    end: end_detail,
                    completed: todos[index].completed
                };

                let todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
                todoItem.querySelector('h3').textContent = "Titel: " + todos[index].title;
                todoItem.querySelector('p').textContent = "Ende: " + todos[index].end;
            }

            // Wechsle zurück zur Eingabeansicht und aktualisiere den Titel
            detailsElement.style.display = 'none';
            insertElement.style.display = 'flex';
            updateTitle();
        }
    });
});

// Aktualisiere den Titel der Todo-Liste
function updateTitle() {
    let percentage = todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;
    document.querySelector('.ToDo_List h1').textContent = `ToDo List (${percentage}% completed)`;
}

// Überprüfe die Gültigkeit der Daten
function validateDates(start, end) {
    if (new Date(start) > new Date(end)) {
        alert("Das Startdatum darf nicht nach dem Enddatum liegen.");
        return false;
    }
    return true;
}

// Überprüfe die Gültigkeit der Daten beim Aktualisieren
function validateDatesUpdate(start_detail, end_detail) {
    if (new Date(start_detail) > new Date(end_detail)) {
        alert("Das Startdatum darf nicht nach dem Enddatum liegen.");
        return false;
    }
    return true;
}

// Leere die Eingabefelder
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