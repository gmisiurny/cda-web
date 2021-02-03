"use strict";

var livres = [
    ['*Choisissez votre livre', '', 0], // pour le premier choix du select
    ['Blockchain for Business', 'R44', 10],
    ['Bio-Inspired Computing Models and Algorithms', 'R2', 13],
    ['Machine Learning with Spark and Python', 'R4RT', 44]
];

// mise de la variable prixTotal en global, vu que l'input est toujours le même dans la page
var prixTotalInput;

// copie d'un select avec toutes les options
// pour faire des copies d'option
var selectDeReference;

// copie d'une ligne de commande
var ligneDeReference;

// au chargement de la page
(function () {
    // initialisation prix total
    prixTotalInput = document.querySelector('#total_ligne > input');

    // récuperer tous les select
    document.querySelectorAll('select').forEach(selectElement => {
        initialiserEvenementsDUnSelect(selectElement);
    });

    // pour chaque input saisie de quantité
    document.querySelectorAll('.quantite > input').forEach(quantiteElement => {
        initialiserEvenementDeLInputQuantite(quantiteElement);
    });

    // garder une copie/un clone d'un select, sans l'integrer à la page
    selectDeReference = document.querySelector('select').cloneNode(true);

    // garder une copie/un clone d'une ligne de commandes, sans l'integrer à la page 
    ligneDeReference = document.querySelector('.livre_ligne').cloneNode(true);

    document.querySelector('#ajoutLigneBtn').addEventListener('click', function () {
        // 
        var laNouvelleLigneAInserer = ligneDeReference.cloneNode(true);

        initialiserEvenementsDUnSelect(laNouvelleLigneAInserer.querySelector('select'));
        initialiserEvenementDeLInputQuantite(laNouvelleLigneAInserer.querySelector('.quantite > input'));
        initialiserEvenementsDUnBouttonDeSuppression(laNouvelleLigneAInserer.querySelector('.suppressionLigneBtn'))

        document.querySelector('body').insertBefore(
            laNouvelleLigneAInserer,
            document.querySelector('#total_ligne')
        );
    });

    document.querySelectorAll('.suppressionLigneBtn').forEach(suppressionLigneBtn => {
        initialiserEvenementsDUnBouttonDeSuppression(suppressionLigneBtn);

    });

})();

function miseAjourPrixTotal() {
    // remise à zéro du prix total
    prixTotalInput.value = 0;

    // parcourir les prix par ligne pour les ajouter au prix total
    document.querySelectorAll('.prix-total > input').forEach(inputTotalLigne => {
        prixTotalInput.value = parseInt(inputTotalLigne.value) + parseInt(prixTotalInput.value);
    });

}

function traitementUniciteDesSelect(leSelectMiseAJour) {
    // récuperer l'indice du nouveau livre choisi
    var nouvelleValeur = leSelectMiseAJour.value.substr(leSelectMiseAJour.value.indexOf('_') + 1);

    // récuperer l'indice de l'ancien livre
    var ancienneValeur = leSelectMiseAJour.ancienneValeur.substr(leSelectMiseAJour.ancienneValeur.indexOf('_') + 1);

    if (nouvelleValeur == 0) { // si aucun livre n'est choisi
        // il faut remettre l'ancien livre disponible dans tous les autres select

        if (ancienneValeur != 0) {
            // il faut remettre l'ancienne valeur, qui n'est plus selectionnée
            // dans les autres select
            remettreLOptionDansLesAutresSelect(ancienneValeur, leSelectMiseAJour)
        }

    } else { // un nouveau livre est choisi

        // il faut supprimer le nouveau livre des autres select
        document.querySelectorAll('select').forEach(unSelect => {
            if (unSelect != leSelectMiseAJour) {
                for (var indice = 0; indice < unSelect.options.length; indice++) {
                    if (unSelect[indice].value == 'val_' + nouvelleValeur) {
                        unSelect.remove(indice);
                    }
                }
            }
        });

        if (ancienneValeur != 0) {
            // il faut remettre l'ancienne valeur, qui n'est plus selectionnée
            // dans les autres select
            remettreLOptionDansLesAutresSelect(ancienneValeur, leSelectMiseAJour);
        }
    }
}

function remettreLOptionDansLesAutresSelect(laValeurAReinserer, leSelectMiseAJour) {
    // on cherche d'abord l'option selectionnée
    var lOptionAAjouter;
    for (var indice = 0; indice < selectDeReference.options.length; indice++) {
        if (selectDeReference[indice].value == 'val_' + laValeurAReinserer) {
            // l'option à ajouter pointe vers une copie depuis le select de reference
            lOptionAAjouter = selectDeReference[indice];
            break;
        }
    }

    if (lOptionAAjouter) { // si l'option existe
        var indiceLivre = lOptionAAjouter.value.substr(lOptionAAjouter.value.indexOf('_') + 1);

        // parcourir les select, en évitant le select sur lequel l'evenement est déclenché
        document.querySelectorAll('select').forEach(unSelect => {
            if (unSelect != leSelectMiseAJour) {
                // ajouter une copie de l'option au select
                unSelect.add(lOptionAAjouter.cloneNode(true), indiceLivre);
            }
        });
    }
}

function initialiserEvenementsDUnSelect(selectElement) {
    // ajouter un listener au changement de la valeur du select
    selectElement.addEventListener('change', function () {
        // => ce qu'on fait suite au changement de la valeur d'un select

        // on recupere la nouvelle valeur
        var valeurEnCours = selectElement.value;

        // on recupere le numero de la valeur apres le '_' qui correspond à l'indice dans le tableau livres
        valeurEnCours = valeurEnCours.substr(valeurEnCours.indexOf('_') + 1);

        // on recupere le livre qui correspond
        var leLivreSelectionne = livres[valeurEnCours];

        // on charge une reference sur la div (la ligne) qui contient le select en cours
        var ligneLivreEnCours = this.parentElement;

        // on renseigne les input avec les valeurs contenu dans le livre
        ligneLivreEnCours.querySelector('.reference > input').value = leLivreSelectionne[1];
        ligneLivreEnCours.querySelector('.prix-unitaire > input').value = leLivreSelectionne[2];
        ligneLivreEnCours.querySelector('.quantite > input').value = 0;
        ligneLivreEnCours.querySelector('.prix-total > input').value = 0;


        if (valeurEnCours == 0) { // si aucun livre n'est choisi 
            ligneLivreEnCours.querySelector('.quantite > input').readOnly = true;
        } else { // si un livre est choisi
            ligneLivreEnCours.querySelector('.quantite > input').readOnly = false;
        }

        miseAjourPrixTotal();

        traitementUniciteDesSelect(selectElement);
        selectElement.ancienneValeur = selectElement.value;
    });

    selectElement.addEventListener('focus', function () {
        selectElement.ancienneValeur = selectElement.value;
    });
}

function initialiserEvenementDeLInputQuantite(quantiteElement) {
    // gestion de l'evenement suite modification quantité
    quantiteElement.addEventListener('change', function () {

        // remonter au parent(la ligne contenant l'input) puis modifier l'input prix total de la ligne
        var elementParent = quantiteElement.parentElement.parentElement;
        elementParent.querySelector('.prix-total > input').value =
            elementParent.querySelector('.prix-unitaire > input').value *
            quantiteElement.value;

        miseAjourPrixTotal();
    });
}

function initialiserEvenementsDUnBouttonDeSuppression(suppressionLigneBtn) {
    suppressionLigneBtn.addEventListener('click', function () {

        var selectDeLaLigneASupprimer = suppressionLigneBtn
            .parentElement.parentElement.querySelector('select');
        var valeurDuSelect = selectDeLaLigneASupprimer.value
            .substr(selectDeLaLigneASupprimer.value.indexOf('_') + 1);

        // si le select de la ligne à supprimer a la valeur d'un livre
        if (valeurDuSelect != 0) {
            remettreLOptionDansLesAutresSelect(
                valeurDuSelect,
                selectDeLaLigneASupprimer
            );
        }
        
        // le parent == le div cellule
        // le parent du parent == le div ligne qu'il faut supprimer
        document.body.removeChild(suppressionLigneBtn.parentElement.parentElement);
        miseAjourPrixTotal();
    });
}