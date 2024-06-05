todoForm = document.getElementById("TodoForm")

const el = document.getElementById('TodoForm');
if (el) {
    el.addEventListener('click', swapper, false);
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementsByName("title");
    let beschreibung = document.getElementsByName("beschreibung");
    let autor = document.getElementsByName("autor");
    let kategorie = document.getElementsByName("kategorie");
    let wichtigkeit = document.getElementsByName("wichtigkeit");
    let dringend = document.getElementsByName("dringend");
    let datum = document.getElementsByName("datum");
    let enddatum = document.getElementsByName("enddatum");
});

console.log(title + beschreibung + autor + kategorie + wichtigkeit + dringend + datum + enddatum);