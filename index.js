


//Récupération des données depuis l'URL 
function recupDonnees ()
{
 return fetch('https://ghibliapi.vercel.app/films')
.then(response => response.json());
}


//Affichage des films et mise en avant de ceux de Miyazakis
recupDonnees().then(
    donnees => {
        let filmDeMiyazaki = document.getElementById("filmsBy");

        donnees.forEach(film =>
            {
            let miyasaki = film.director === 'Hayao Miyazaki' ? 'miyasaki' : '';
            filmDeMiyazaki.insertAdjacentHTML('afterbegin', '<li class="' + miyasaki + '">' + film.title +':'+ film.director + '</li>');})
    } 
)

//Ecriture de la liste des directeurs 
recupDonnees().then(
    donnees=>{
        let nomsRealisateursUniques = new Set(donnees.map(film => film.director)); //Transformation du tableau en set pour éliminer les doublons
        let realisateurs = Array.from(nomsRealisateursUniques);
        let realisateursBalise = document.getElementById("directors");
        realisateurs.forEach( realisateur =>{
            realisateursBalise.insertAdjacentHTML('afterbegin', '<li>' + realisateur + '</li>');
          }
        )
    }
)


//Ecriture de la liste des films par directeur 
recupDonnees().then(
    donnees => {
        let filmsByRealisateurs =  donnees.reduce(function(acc, film) { //Grouper les films selon le réalisateur
            let realisateur = film.director;
            if (!acc[realisateur]) {
                acc[realisateur] = [];
            }
            acc[realisateur].push(film.title);
            return acc;
        }, {});

        for(director in filmsByRealisateurs){ //Obtention de tous les réalisateurs 
            let realisateur = '<li>' + director + '<ul>';

            filmsByRealisateurs[director].forEach(function (film) { //Films de chaque réalisateur en forme de sous liste
                realisateur += '<li>' + film + '</li>';
            });

            realisateur += '</ul></li>';

            //Insertion du bloc réalisateur et de ses films dans la balise appropriée
            document.getElementById("directorsfilmsList").insertAdjacentHTML('afterbegin', realisateur);
        }
    }
)


