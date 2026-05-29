// ============================================================
//  Ma ToDo — point de départ
//  Écran unique, sans routage.
// ============================================================

var $$ = Dom7; // utilitaire DOM intégré à Framework7

var app = new Framework7({
    el: '#app',
    name: 'MaToDo',
    theme: 'auto',
    routes: routes,
});

var mainView = app.views.create('.view-main', { url: '/' });

// ============================================================
//  SÉANCE 2 — déclarer le tableau des tâches, puis :
//    - une fonction afficher() qui construit la liste
//    - une fonction ajouterTache(texte)
//    - une fonction supprimerTache(id)
// ============================================================
let taches = [
    { id: 1, texte: "Module F7 - Introduction", fait: true },
    { id: 2, texte: "Module F7 - Session 1", fait: true },
    { id: 3, texte: "Module F7 - Session 2", fait: false },
    { id: 4, texte: "Module F7 - Session 3", fait: false },
];

function ligneTache(t) {
    return `
        <li class="item-content" data-id="${t.id}">
            <div class="item-media">
                <label class="checkbox">
                    <input type="checkbox" ${t.fait ? 'checked' : ''} />
                    <i class="icon-checkbox"></i>
                </label>
            </div>
            <div class="item-inner">
                <div class="item-title">
                    ${t.texte}
                </div>
                <div class="item-after">
                    <a href="#" class="btn-suppr"><i class="icon f7-icons">trash</i></a>
                </div>
            </div>
        </li>
    `;
}

function afficherTaches() {
    $$('.liste-taches').empty();

    taches.map(tache => {
        const li = ligneTache(tache);
        $$('.liste-taches').append(li);
    });
}

function ajouterTache() {
    const champTache = $$('#saisie-tache');
    const saisieTache = champTache.val()

    if (saisieTache.trim() === '') return;

    const newId = taches.reduce(function (m, t) { return Math.max(m, t.id); }, 0) + 1;

    const newTache = {
        id: newId,
        texte: saisieTache.trim(),
        fait: false,
    }

    taches.push(newTache);

    afficherTaches();

    champTache.val('');
}

function supprimerTache(id) {
    taches = taches.filter(function (t) { return t.id !== parseInt(id, 10); });
    afficherTaches();
}

$$(document).on('click', '#btn-ajouter', function () {
    ajouterTache();
});

// Ajout en appuyant sur Entrée
$$(document).on('keypress', '#saisie-tache', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();

        ajouterTache();
    }
});

$$(document).on('click', '.btn-suppr', function (e) {
    e.preventDefault();

    const id = $$(this).parents('.item-content').attr('data-id');
    supprimerTache(id);
});

$$(document).on('page:init', '.page[data-name="taches"]', function () {
    afficherTaches(); // premier appel de la fonction
});

//  SÉANCE 3 — ajouter :
//    - basculerTache(id) pour cocher / décocher
//    - le compteur de tâches restantes
//    - les filtres (Toutes / À faire / Faites)
//    - chargerTaches() et sauvegarder() avec localStorage
// ------------------------------------------------------------

// Exemple de structure de données (à activer en séance 2) :
// var taches = [
//   { id: 1, texte: "Réviser l'algorithmique", fait: false },
// ];
