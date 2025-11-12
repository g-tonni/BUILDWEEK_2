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
        const topRow = document.getElementById('artist-img').src = artistDetails.picture_xl
        const likedSongs = document.querySelector('img.rounded-circle').src = artistDetails.picture_medium
        
        const likes = document.querySelector('div.col > p:last-of-type')
        likes.innerText += ` ${artistDetails.name}`
        

        //Sostituisco il nome dell'artista nell'elemento partendo da id='headers'
        const artist = document.querySelector('h2')
        console.log("NOME ARTISTA", artist.innerText = artistDetails.name)

        //Sostituisco il numero dei fan nell'elemento partendo da id='headers'
        const fans = header.querySelector('p')
            //Trasformo in un array ed inserisco il '.' ogni 3 numeri
        const arrFans = artistDetails.nb_fan.toString().split('')
        const dotArr = []
        for(let i = 1; (arrFans.length - i) >= 0; i++){
            if( i%3 !== 0){
                dotArr.unshift(arrFans[(arrFans.length - i)])                
            } else {
                dotArr.unshift(arrFans[(arrFans.length - i)])
                dotArr.unshift('.')
            }
        }
            //Controllo che non inizi con un punto e ritrasformo in stringa
        if(dotArr[0]==='.'){
            dotArr.shift()
        }
            //Inserisco nel HTML
        fans.innerText = dotArr.join('') + ' ascoltatori mensili'




        //Inserisco titolo, cover album, visualizzazioni e durata del brano
            //Recupero la posizione del container
        const songs = document.querySelector('div.container.mt-4')
        console.log(songs)
        const songInfo = document.createElement('div')
        console.log(songInfo)
        songInfo.classList.add('row')
        songInfo.classList.add('align-items-baseline')
        songInfo.innerHTML = `
                        <div class="col col-6 pe-0">
                            <div class="d-flex hstack gap-3 mb-2">
                              <p class="m-0">1</p>
                              <img src="https://placehold.co/60x60/545464/FFFFFF/png" alt="" width="50">
                              <p class="m-0">Ocean Avenue</p>
                            </div>
                          </div>
                          <div class="col col-3">  
                            <div class="gap-3 mb-2">
                              <p class="">1249102</p>
                            </div>
                          </div>
                          <div class="col col-3">  
                            <div class="gap-3 mb-2">
                              <p class="">3.50</p>
                            </div>
                          </div>
                        `
    })
    .catch((err) => {
        console.log('Errore recupero dei dati', err)
    })
}

getArtist()