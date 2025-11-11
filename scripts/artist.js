//URL dell'endpoint
const URL = 'https://striveschool-api.herokuapp.com/api/deezer/artist/yellowcard'
//Recupera le informazioni dall'endpoint
const getArtist= function (){
    fetch(URL)
    .then((res) => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .then((artistDetails) => {
        console.log('Dettagli artista|', artistDetails)

        topRow = document.getElementById('artist-img').src = artistDetails.picture_xl
    })
    .catch((err) => {
        console.log('Errore recupero dei dati', err)
    })
}

getArtist()