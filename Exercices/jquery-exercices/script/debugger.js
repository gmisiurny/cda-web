/*
 *	Formation jQuery
 *	Débugger*/

// Pop up avant le chargement de la page
// alert("Appel du script debugger.js") ;

// Encapsulation :
(function ($) {

	// Au chargement de la page :
	$(document).ready(function(){
		
		
		// Pop up après le chargement de la page
		// alert("jQuery actif, page chargée et appel du script debugger.js") ;	
		console.log("Scripts du fichier debugger.js :") ;
		
		
		// Exemple de transformation simple est bien visible, mettre le titre en rouge
		$("h1").css("color","red") ;
		
		
		// Ecrire du texte libre dans la console
		console.log("Scripts du fichier debugger.js :") ;
		
		// Enregistrer des objets dans la console
		$("table tbody tr").each(function(){
			var $this = $(this) ;
			console.log($this) ;
		});
	
	}); // Fin des instructions envoyées au chargement de la page
	
})(jQuery); // Fin de l'encapsulation
