//URL dell'endpoint
const URL = 'https://striveschool-api.herokuapp.com/api/deezer/artist/'

//cerco un artista a CASO
const randomArt = function (){
   let artist = Math.ceil(Math.random()*100)
   return artist
}

console.log(randomArt())

//Recupera le informazioni dall'endpoint
const getArtist= function (id){
    fetch(URL + randomArt())
    .then((res) => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .then((artistDetails) => {
        console.log('Dettagli artista|', artistDetails)
        //Sostituisce l'immagine nell'header con quella dell'artista
        topRow = document.getElementById('artist-img').src = artistDetails.picture_xl

        const songs = document.querySelector('div.container.mt-4')
        console.log(songs)
    })
    .catch((err) => {
        console.log('Errore recupero dei dati', err)
    })
}

getArtist()