//Recupera le informazioni dall'endpoint

const getArtist= function (){
    fetch( 'https://striveschool-api.herokuapp.com/api/deezer/search?q=asking+alexandria')
    .then((res) => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .then((artistDetails) => {
        console.log('Dettagli artista|', artistDetails.artist())
    })
    .catch(
        console.log('Errore recupero dei dati', err)
    )
}