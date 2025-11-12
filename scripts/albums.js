let img

const linkAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/album/'

const url = location.search
// console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('id')
// console.log('ID', id)

fetch(linkAlbum + id)
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('ERRORE NELLA RISPOSTA')
    }
  })
  .then((dati) => {
    // console.log(dati)

    createIntestazione(dati)

    for (let i = 0; i < dati.tracks.data.length; i++) {
      crateCanzoni(dati.tracks.data[i], i + 1)
      // console.log(dati.tracks.data[i].preview)
    }

    let img = document.getElementById('img-details')
    const canvas = document.getElementById('imgCanvas')
    const ctx = canvas.getContext('2d')

    img.crossOrigin = 'Anonymous'

    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      let r = 0,
        g = 0,
        b = 0
      const pixelCount = data.length / 4

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      const avgR = Math.round(r / pixelCount)
      const avgG = Math.round(g / pixelCount)
      const avgB = Math.round(b / pixelCount)

      const averageColor = `rgb(${avgR}, ${avgG}, ${avgB})`

      // console.log('Colore medio:', averageColor)

      const col = document.getElementById('colonnaCentrale')
      col.style.backgroundColor = averageColor
    }
  })
  .catch((err) => {
    console.log('ERRORE', err)
  })

const contenitoreCanzoni = document.getElementById('elenco-canzoni')
const crateCanzoni = function (obj, i) {
  contenitoreCanzoni.innerHTML += `
    
    <tr>
      <td class="primaCol pt-4 pb-2">${i}</td>
    <td class="secondaCol pt-4 pb-2">
    <button onclick="playAudio('${
      obj.preview
    }')" class="border-0 bottoni-album">${
    obj.title
  }</button><br /><a href="artist.html?id=${
    obj.artist.id
  }" class="fs-7 artisti-album">${obj.artist.name}</a>
    </td>
    <td class="terzaCol pt-4 pb-2">${obj.rank}</td>
    <td class="quartaCol pt-4 pb-2">${
      (obj.duration - (obj.duration % 60)) / 60
    }:${num(obj.duration % 60)}</td>
   </tr>
    `
}

const num = function (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

const primoContenitore = document.getElementById('album')
const createIntestazione = function (obj) {
  primoContenitore.innerHTML += `
    <div class="col col-12 col-md-4 d-flex flex-column justify-content-end">
      <img src="${obj.cover_big}" class="img-fluid shadow" id="img-details"/>
    </div>
    <div
    class="col col-12 col-md-8 mt-4 d-flex flex-column justify-content-end"
    >
         <p class="fs-6 m-0">ALBUM</p>
         <h1 class="text-white fs-big fs-lg-big-s mb-4 text-truncate fw-bolder">${obj.title}</h1>

        <p class="m-0">
            <img
            src="${obj.artist.picture_medium}"
            id="imgYellowBottom"
            />
            ${obj.artist.name} · ${obj.tracks.data.length} brani
        </p>
    </div>

    `
}

let audio
const vinile = document.getElementById('img-vinile')

const playAudio = function (url) {
  const audioURL = url

  audio = new Audio(audioURL)

  const playButton = document.getElementById('play')
  const pauseButton = document.getElementById('pause')
  const playButtonMobile = document.getElementById('play-mobile')
  const pauseButtonMobile = document.getElementById('pause-mobile')
  // console.log(playButton)
  // console.log(audio)

  audio.play()

  vinile.classList.add('vinile')

  pauseButton.classList.remove('d-none')
  playButton.classList.add('d-none')
  pauseButtonMobile.classList.remove('d-none')
  playButtonMobile.classList.add('d-none')
  playButton.innerHTML = ''
  playButton.appendChild(audio)
  audio.addEventListener('canplaythrough', (event) => {
    playButton.addEventListener('click', () => {
      pauseButton.classList.remove('d-none')
      playButton.classList.add('d-none')
      audio.play()
    })
    pauseButton.addEventListener('click', () => {
      pauseButton.classList.add('d-none')
      playButton.classList.remove('d-none')
      console.log('AUDIO PAUSA', audio)
      audio.pause()
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
      console.log('AUDIO PAUSA', audio)
      audio.pause()
    })
  })
}
