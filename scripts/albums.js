const linkAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/album/'

const url = location.search
// console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('id')
console.log('ID', id)

fetch(linkAlbum + id)
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('ERRORE NELLA RISPOSTA')
    }
  })
  .then((dati) => {
    console.log(dati)

    createIntestazione(dati)

    for (let i = 0; i < dati.tracks.data.length; i++) {
      crateCanzoni(dati.tracks.data[i], i + 1)
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
    ${obj.title}<br />${obj.artist.name}
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
    <div class="text-center w-100 p-4 p-sm-0 pe-sm-3 d-flex d-md-none">
    <img src="${obj.cover_big}" class="img-fluid"/>
    </div>
    <div class="text-center w-50 p-4 p-sm-0 pe-sm-3 d-none d-md-flex">
    <img src="${obj.cover_big}" class="img-fluid"/>
    </div>
    <div
    id="albumText"
    class="d-flex flex-column flex-grow-1 justify-content-end p-4 p-sm-0"
    >
         <p class="fs-6 m-0">ALBUM</p>
         <h1 class="text-white fs-big fs-lg-big-s mb-4">${obj.title}</h1>

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
