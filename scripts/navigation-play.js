const backBtn = document.getElementById('backBtn')
const nextBtn = document.getElementById('nextBtn')

// Funzione per aggiornare lo stato dei pulsanti
const updateNavButtons = function () {
  // Controllo indietro
  if (navigation.canGoBack) {
    backBtn.classList.remove('nav-disabled')
  } else {
    backBtn.classList.add('nav-disabled')
  }

  // Controllo avanti
  if (navigation.canGoForward) {
    nextBtn.classList.remove('nav-disabled')
  } else {
    nextBtn.classList.add('nav-disabled')
  }
}

// Aggiorna pulsanti all'avvio
updateNavButtons()

// Quando avviene una navigazione, ricalcola
navigation.addEventListener('navigate', () => {
  // breve delay per far aggiornare lo stato
  setTimeout(updateNavButtons, 0)
})

// Pulsante indietro
backBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (navigation.canGoBack) {
    navigation.back()
  }
})

// Pulsante avanti
nextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (navigation.canGoForward) {
    navigation.forward()
  }
})

const syncPlayButtons = function (isPlaying) {
  const playButton = document.getElementById('play-album')
  const pauseButton = document.getElementById('pause-album')
  const playButtonMobile = document.getElementById('play-mobile')
  const pauseButtonMobile = document.getElementById('pause-mobile')

  if (isPlaying) {
    // Mostra PAUSE
    pauseButton.classList.remove('d-none')
    playButton.classList.add('d-none')

    pauseButtonMobile.classList.remove('d-none')
    playButtonMobile.classList.add('d-none')

    vinile.classList.add('vinile')
  } else {
    // Mostra PLAY
    pauseButton.classList.add('d-none')
    playButton.classList.remove('d-none')

    pauseButtonMobile.classList.add('d-none')
    playButtonMobile.classList.remove('d-none')

    vinile.classList.remove('vinile')
  }
}

const stopPreviousAudio = function () {
  if (audio) {
    audio.pause()
    audio.src = '' // scollega la sorgente
    audio = null // rimuovi riferimento
  }
}

const rangeInput = document.getElementById('volume')
const rangeOutput = document.getElementById('rangeValue')

const numVol = function (num) {
  return num / 100
}

let keyURL = 'urlAudio'
let keyCurrenTime = 'currentTimeAudio'
let keyTimeDuration = 'durationAudio'
let keyImg = 'imgAudio'
let keyTitle = 'titleAudio'
let keyArtist = 'artistAudio'
let keyPlay = 'playAudio'
let keyVolume = 'volumeAudio'

/* console.log('URL AUDIO', localStorage.getItem(keyURL))
console.log('URL AUDIO', localStorage.getItem(keyArtist)) */

const nomeCanz = document.getElementById('footerSongName')
const nomeArtist = document.getElementById('footerArtistName')
const albumImg = document.getElementById('footer-album-desktop')
const nomeCanzMobile = document.getElementById('footer-title-mobile')

nomeCanz.innerText = localStorage.getItem(keyTitle)
nomeArtist.innerText = localStorage.getItem(keyArtist)
albumImg.src = localStorage.getItem(keyImg)
nomeCanzMobile.innerText = localStorage.getItem(keyTitle)

let audio

const barraProgresso = document.getElementById('barra-progresso')
const vinile = document.getElementById('img-vinile')
let playButton = document.getElementById('play-album')
let pauseButton = document.getElementById('pause-album')
let playButtonMobile = document.getElementById('play-mobile')
let pauseButtonMobile = document.getElementById('pause-mobile')

// RIPRISTINO AUDIO SALVATO

window.addEventListener('load', () => {
  stopPreviousAudio()

  const savedURL = localStorage.getItem(keyURL)
  const savedTime = localStorage.getItem(keyCurrenTime)

  if (savedURL) {
    audio = new Audio(savedURL)
    playButton.appendChild(audio)

    audio.addEventListener('loadedmetadata', () => {
      if (savedTime) {
        audio.currentTime = parseFloat(savedTime)
      }
      audio.volume = localStorage.getItem(keyVolume)
      audio.addEventListener('volumechange', () => {
        rangeInput.value = audio.volume * 100
      })
    })

    audio.addEventListener('canplay', () => {
      vinile.classList.add('vinile')

      rangeInput.addEventListener('input', function () {
        // console.log(numVol(this.value))
        const volumeCorrente = numVol(this.value)
        audio.volume = volumeCorrente
        localStorage.setItem(keyVolume, volumeCorrente)
      })

      document.getElementById('pause-album').classList.remove('d-none')
      document.getElementById('play-album').classList.add('d-none')
      document.getElementById('pause-mobile').classList.remove('d-none')
      document.getElementById('play-mobile').classList.add('d-none')

      if (localStorage.getItem(keyPlay) === 'true') {
        pauseButton.classList.remove('d-none')
        playButton.classList.add('d-none')
        pauseButtonMobile.classList.remove('d-none')
        playButtonMobile.classList.add('d-none')
        audio.play()
      } else {
        pauseButton.classList.add('d-none')
        playButton.classList.remove('d-none')
        pauseButtonMobile.classList.add('d-none')
        playButtonMobile.classList.remove('d-none')
        audio.pause()
      }

      playButton.addEventListener('click', () => {
        pauseButton.classList.remove('d-none')
        playButton.classList.add('d-none')
        localStorage.setItem(keyPlay, 'true')
        audio.play()
      })
      pauseButton.addEventListener('click', () => {
        pauseButton.classList.add('d-none')
        playButton.classList.remove('d-none')
        localStorage.setItem(keyPlay, 'false')
        /*   console.log(
          'PERCENTUALE',
          Math.ceil((audio.currentTime / audio.duration) * 100)
        ) */
        // console.log('AUDIO PAUSA', audio)
        audio.pause()
        /*         console.log(audio.currentTime) */
      })
      playButtonMobile.addEventListener('click', () => {
        vinile.classList.add('vinile')
        pauseButtonMobile.classList.remove('d-none')
        playButtonMobile.classList.add('d-none')
        localStorage.setItem(keyPlay, 'true')
        audio.play()
      })
      pauseButtonMobile.addEventListener('click', () => {
        vinile.classList.remove('vinile')
        pauseButtonMobile.classList.add('d-none')
        playButtonMobile.classList.remove('d-none')
        localStorage.setItem(keyPlay, 'false')
        // console.log('AUDIO PAUSA', audio)
        audio.pause()
      })
    })

    // Aggiorna barra mentre suona
    audio.ontimeupdate = function () {
      barraProgressoFunz(audio)
    }
  }
})

const playAudio = function (url, artist, img, title) {
  // Stoppa la canzone precedente prima di suonarne una nuova
  stopPreviousAudio()

  localStorage.setItem(keyPlay, 'true')

  const audioURL = url

  nomeCanz.innerText = title //Sostituisce il nome della canzone
  nomeArtist.innerText = artist //Sostituisce il nome artista
  albumImg.src = img //Sostituisce l'immagine dell'album
  nomeCanzMobile.innerText = title + ' by ' + artist

  audio = new Audio(audioURL)

  playButton = document.getElementById('play-album')
  pauseButton = document.getElementById('pause-album')
  playButtonMobile = document.getElementById('play-mobile')
  pauseButtonMobile = document.getElementById('pause-mobile')
  // console.log(playButton)
  // console.log(audio)

  audio.volume = localStorage.getItem(keyVolume)

  localStorage.setItem(keyArtist, artist)
  localStorage.setItem(keyTitle, title)
  localStorage.setItem(keyImg, img)
  localStorage.setItem(keyURL, url)

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
    localStorage.setItem(keyTimeDuration, audio.duration)
    /* console.log('DURATA', audio.duration)
     */

    audio.ontimeupdate = function () {
      barraProgressoFunz(audio)
    }

    playButton.addEventListener('click', () => {
      pauseButton.classList.remove('d-none')
      playButton.classList.add('d-none')
      localStorage.setItem(keyPlay, 'true')
      audio.play()
    })
    pauseButton.addEventListener('click', () => {
      pauseButton.classList.add('d-none')
      playButton.classList.remove('d-none')
      localStorage.setItem(keyPlay, 'false')
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

  localStorage.setItem(keyCurrenTime, aud.currentTime)

  const elapsedTime = document.querySelector('footer>div:nth-of-type(2) p.m-0')
  elapsedSec = Math.floor(aud.currentTime % 60)
  elapsedTime.innerText =
    elapsedSec > 9 ? '0:' + elapsedSec : '0:0' + elapsedSec
  // console.log('TEMPO TRASCORSO', elapsedTime.innerText)
}
