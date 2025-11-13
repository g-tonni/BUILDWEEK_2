//URL dell'endpoint
const URL = 'https://striveschool-api.herokuapp.com/api/deezer/artist/'

//cerco un artista a CASO
const randomArt = function () {
  let artist = Math.ceil(Math.random() * 100)
  return artist
}

// console.log(randomArt())

//Recupero l'id dell'artista dall'URL
const url = location.search
// console.log(url)
const allSearchPar = new URLSearchParams(url)
const id = allSearchPar.get('id').toString()
// console.log('ID', id)

//Recupera le informazioni dall'endpoint
const getArtist = function () {
  fetch(URL + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((artistDetails) => {
      // console.log('Dettagli artista|', artistDetails)
      //Sostituisce l'immagine nell'header con quella dell'artista
      const topRow = (document.getElementById('artist-img').src =
        artistDetails.picture_xl)
      const likedSongs = (document.querySelector('img.rounded-circle').src =
        artistDetails.picture_medium)

      const likes = document.querySelector('div.col > p:last-of-type')
      likes.innerText += ` ${artistDetails.name}`

      //Sostituisco il nome dell'artista nell'elemento partendo da id='headers'
      const artist = document.querySelector('h2')
      artist.innerText = artistDetails.name
      // console.log('NOME ARTISTA', (artist.innerText = artistDetails.name))

      //Sostituisco il numero dei fan nell'elemento partendo da id='headers'
      const fans = header.querySelector('p')
      //Trasformo in un array ed inserisco il '.' ogni 3 numeri
      const arrFans = artistDetails.nb_fan.toString().split('')
      const dotArr = []
      for (let i = 1; arrFans.length - i >= 0; i++) {
        if (i % 3 !== 0) {
          dotArr.unshift(arrFans[arrFans.length - i])
        } else {
          dotArr.unshift(arrFans[arrFans.length - i])
          dotArr.unshift('.')
        }
      }
      //Controllo che non inizi con un punto e ritrasformo in stringa
      if (dotArr[0] === '.') {
        dotArr.shift()
      }
      //Inserisco nel HTML
      fans.innerText = dotArr.join('') + ' ascoltatori mensili'

      //Recupero una lista di canzoni dell'artista

      const bestOfArtist = artistDetails.tracklist
      // console.log(bestOfArtist)

      const bestOf = function (url) {
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            } else {
              throw new Error(res.status)
            }
          })
          .then((bestSongs) => {
            //creo la classe Songs
            class Song {
              constructor(
                _songName,
                _albumImage,
                _nListeners,
                _songLength,
                _preview
              ) {
                this.songName = _songName
                this.albumImage = _albumImage
                this.nListeners = _nListeners
                this.songLength = _songLength
                this.preview = _preview
              }
            }
            console.log('SONG', bestSongs)

            for (let i = 0; i < bestSongs.total; i++) {
              //Converto la durata in secondi a mm:ss
              let duration
              if (bestSongs.data[i].duration % 60 > 9) {
                const seconds = bestSongs.data[i].duration % 60
                const minutes = Math.ceil(bestSongs.data[i].duration / 60)
                duration = minutes + ':' + seconds
                // console.log('DURATA', duration)
              } else {
                const seconds = bestSongs.data[i].duration % 60
                const minutes = Math.ceil(bestSongs.data[i].duration / 60)
                duration = minutes + ':0' + seconds
              }

              const songName = bestSongs.data[i].title
              const albumImage = bestSongs.data[i].album.cover_medium
              const nListeners = bestSongs.data[i].rank
              const preview = bestSongs.data[i].preview
              const songLength = duration

              //SERVONO SOLO PER DEBUG
              // console.log('TITOLO CANZONE',songName);
              // console.log('album', albumImage);
              // console.log('Rank',nListeners);
              // console.log('Durata',songLength);

              const newSong = new Song(
                songName,
                albumImage,
                nListeners,
                songLength
              )
              // console.log('Nuova canzone', newSong)

              //Inserisco titolo, cover album, visualizzazioni e durata del brano
              //Recupero la posizione del container
              const songs = document.querySelector('div.container.mt-4')
              // console.log(songs)
              //Creo un div e gli aggiungo 2 classi
              const songInfo = document.createElement('div')
              // console.log(songInfo)
              songInfo.classList.add('row')
              songInfo.classList.add('align-items-baseline')
              songInfo.innerHTML = `
                                    <div class="col col-8 pe-0">
                                        <div class="d-flex hstack gap-3 mb-2">
                                        <p class="m-0">${i + 1}</p>
                                        <img src="${albumImage}" alt="" width="50">
                                        <button class="bottoni-album border-0" onclick="playAudio('${preview}', event)"><p class="m-0" id="songTitle${i}">${songName}</p></button>
                                        </div>
                                    </div>
                                    <div class="col col-2">  
                                        <div class="gap-3 mb-2">
                                        <p class="">${nListeners}</p>
                                        </div>
                                    </div>
                                    <div class="col col-2">  
                                        <div class="gap-3 mb-2">
                                        <p id="songLength${i}">${songLength}</p>
                                        </div>
                                    </div>
                                    `
              songs.appendChild(songInfo)
            }

            document.querySelector('footer > a:last-of-type')
            //console.log('CERCO IL FOOTER', footer.querySelector('a'))
          })
          .catch((err) => {
            console.log('Errore recupero del best of', err)
          })
      }

      bestOf(bestOfArtist)
    })
    .catch((err) => {
      console.log('Errore recupero dei dati', err)
    })
}

getArtist()

//PLAYER FUNZIONANTE

let audio

const barraProgresso = document.getElementById('barra-progresso')
const vinile = document.getElementById('img-vinile')

const playAudio = function (url, e) {
  const audioURL = url

//SOSTITUISCO LA DURATA DEL BRANO 
  //Recupero l'id del button che ha scatenato l'evento,
  //lo converto in array e lo filtro per recuperare 
  //solo il numero finale e lo uso per ottenere 
  //l'id della durata del brano.
  //Recupero solo il testo della durata del brano
  //e lo sostituisco nella durata della progressbar

const songTitleId = e.target.id
const onlyNumber = songTitleId.split('').filter(c => !isNaN(c))
const onlyIdNumber = "songLength" + onlyNumber.join('')
const timeValue = document.getElementById(`${onlyIdNumber}`)
document.querySelector('footer>div:nth-of-type(2) p:nth-of-type(2)').innerText = timeValue.innerText

//Sostituisco il titolo della canzone, il nome dell'artista e l'immagina
document.getElementById('footerSongName').innerText = e.target.innerText
console.log(document.getElementById('footerArtistName').innerText = document.querySelector('h2').innerText)

  
  audio = new Audio(audioURL)

  const playButton = document.getElementById('play-album')
  const pauseButton = document.getElementById('pause-album')
  const playButtonMobile = document.getElementById('play-mobile')
  const pauseButtonMobile = document.getElementById('pause-mobile')
  // console.log(playButton)
  // console.log(audio)

  audio.play()

  console.log(audio.currentTime)

  vinile.classList.add('vinile')

  pauseButton.classList.remove('d-none')
  playButton.classList.add('d-none')
  pauseButtonMobile.classList.remove('d-none')
  playButtonMobile.classList.add('d-none')
  playButton.innerHTML = ''
  playButton.appendChild(audio)

  audio.addEventListener('canplaythrough', (event) => {
    /* console.log('DURATA', audio.duration)
     */
    audio.ontimeupdate = function () {
      barraProgressoFunz(audio)
    }

    playButton.addEventListener('click', () => {
      pauseButton.classList.remove('d-none')
      playButton.classList.add('d-none')
      audio.play()
    })
    pauseButton.addEventListener('click', () => {
      pauseButton.classList.add('d-none')
      playButton.classList.remove('d-none')
      console.log(
        'PERCENTUALE',
        Math.ceil((audio.currentTime / audio.duration) * 100)
      )
      // console.log('AUDIO PAUSA', audio)
      audio.pause()
      console.log(audio.currentTime)
    })
    playButtonMobile.addEventListener('click', () => {
      vinile.classList.add('vinile')
      pauseButtonMobile.classList.remove('d-none')
      playButtonMobile.classList.add('d-none')
      audio.play()
    })
    pauseButtonMobile.addEventListener('click', () => {
      vinile.classList.remove('vinile')
      pauseButtonMobile.classList.add('d-none')
      playButtonMobile.classList.remove('d-none')
      // console.log('AUDIO PAUSA', audio)
      audio.pause()
    })
  })
}

const barraProgressoFunz = function (aud) {
  barraProgresso.style.width = `${Math.ceil(
    (aud.currentTime / aud.duration) * 100
  )}%`

  const elapsedTime = document.querySelector('footer>div:nth-of-type(2) p.m-0')
  elapsedSec = Math.floor(aud.currentTime % 60)
  elapsedTime.innerText = elapsedSec > 9 ? ("0:" + elapsedSec) : ("0:0" + elapsedSec) 
  // console.log('TEMPO TRASCORSO', elapsedTime.innerText)
}