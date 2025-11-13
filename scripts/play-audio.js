let keyURL = 'urlAudio'
let keyCurrenTime = 'currentTimeAudio'
let keyTimeDuration = 'durationAudio'
let keyImg = 'imgAudio'
let keyTitle = 'titleAudio'
let keyArtist = 'artistAudio'

let audio

const barraProgresso = document.getElementById('barra-progresso')
const vinile = document.getElementById('img-vinile')

const playAudio = function (url, artist, img, title) {
  const audioURL = url

  document.getElementById('footerSongName').innerText = title //Sostituisce il nome della canzone
  document.getElementById('footerArtistName').innerText = artist //Sostituisce il nome artista
  document.getElementById('footer-album-desktop').src = img //Sostituisce l'immagine dell'album
  document.getElementById('footer-title-mobile').innerText =
    title + ' by ' + artist

  audio = new Audio(audioURL)

  const playButton = document.getElementById('play-album')
  const pauseButton = document.getElementById('pause-album')
  const playButtonMobile = document.getElementById('play-mobile')
  const pauseButtonMobile = document.getElementById('pause-mobile')
  // console.log(playButton)
  // console.log(audio)

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

  localStorage.setItem(keyCurrenTime, aud.currentTime)

  const elapsedTime = document.querySelector('footer>div:nth-of-type(2) p.m-0')
  elapsedSec = Math.floor(aud.currentTime % 60)
  elapsedTime.innerText =
    elapsedSec > 9 ? '0:' + elapsedSec : '0:0' + elapsedSec
  // console.log('TEMPO TRASCORSO', elapsedTime.innerText)
}
