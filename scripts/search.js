const searchURL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q='
const albumURL = 'https://striveschool-api.herokuapp.com/api/deezer/album/'

const rowBase = document.getElementById('row-base-search')
const secondaRow = document.getElementById('seconda-row-search')
const titoloAlbum = document.getElementById('titolo-album')
const rowAlbum = document.getElementById('row-album')

const albumIDs = [
  302127, 1262014, 217795, 12047952, 582140742, 249141, 12114242, 14879699,
  693008911, 423368, 81457652, 75233,
]

const createBase = function (id) {
  fetch(albumURL + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('ERRORE NELLA RISPOSTA')
      }
    })
    .then((dati) => {
      console.log(dati)

      rowBase.innerHTML += `
  
  <div class="col-6 col-md-4 col-lg-3 altro-cards">
    <a href="albums.html?id=${dati.id}"
      ><div class="bg-dark-unlight rounded p-2">
        <img
          src="${dati.cover_big}"
          class="img-fluid rounded mb-2 w-100"
          alt=""
        />
        <h6 class="text-white mb-1 text-truncate">${dati.title}</h6>
        <p class="text-secondary small mb-0">
          ${dati.artist.name}
        </p>
      </div></a>
  </div>
  
  `
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

for (let i = 0; i < albumIDs.length; i++) {
  createBase(albumIDs[i])
}

const inputSearch = document.getElementById('cerca')

const form = document.getElementById('form-search')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const ricerca = inputSearch.value
  console.log(ricerca)

  fetch(searchURL + ricerca)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('ERRORE NELLA RISPOSTA')
      }
    })
    .then((dati) => {
      console.log(dati)

      rowBase.classList.add('d-none')
      secondaRow.classList.remove('d-none')
      titoloAlbum.classList.remove('d-none')
      rowAlbum.classList.remove('d-none')

      // console.log(dati.data[0].album)
      createPrimaCanz(dati)

      contenitoreBrani.innerHTML = '<h3 class="text-light">Brani</h3>'

      for (let i = 1; i < 5; i++) {
        createBrani(dati.data[i])
      }

      const albumFiltrati = [
        ...new Map(
          dati.data.map((item) => [item.album.id, item.album])
        ).values(),
      ]
      console.log('ALBUM FILTRATI', albumFiltrati)

      createAlbum(albumFiltrati)
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })

  form.reset()
})

const contenitorePrimaCanz = document.getElementById('prima-canzone')

const createPrimaCanz = function (obj) {
  contenitorePrimaCanz.innerHTML = ''
  contenitorePrimaCanz.innerHTML += `
    <a href="albums.html?id=${obj.data[0].album.id}">
  <img
        src="${obj.data[0].album.cover_big}"
        alt="img"
        class="img-fluid w-50 rounded-circle"
    /></a>
    <a href="albums.html?id=${obj.data[0].album.id}"><p class="fs-2 fw-bold m-0 text-truncate">${obj.data[0].title}</p></a
    >
    <a href="artist.html?id=${obj.data[0].artist.id}" class="text-decoration-none"><p class="m-0">${obj.data[0].artist.name}</p></a>`
}

const contenitoreBrani = document.getElementById('contenitore-brani')

const createBrani = function (obj) {
  contenitoreBrani.innerHTML += `   
    <div
        class="d-flex flex-column justify-content-around flex-grow-1 h-100"
    >
        <div class="d-flex justify-content-between">
        <div class="d-flex">
            <div
            style="width: 50px; height: 50px"
            class="rounded-3 overflow-hidden me-3"
            >
            <img
                src="${obj.album.cover_big}"
                alt="img"
                class="img-fluid"
            />
            </div>
            <div class="mb-3">
            <a href="albums.html?id=${
              obj.album.id
            }" class="w-75"><p class="m-0 fw-bold text-truncate w-100">${
    obj.title
  }</p></a>
             <a href="artist.html?id=${
               obj.artist.id
             }" class="text-decoration-none"><p class="m-0">${
    obj.artist.name
  }</p></a>
            </div>
        </div>
        <div>
            <p>${(obj.duration - (obj.duration % 60)) / 60}:${num(
    obj.duration % 60
  )}</p>
        </div>
    </div>
    `
}

const num = function (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

const album = document.getElementById('row-album')
const createAlbum = function (obj) {
  album.innerHTML = ''
  for (let i = 0; i < obj.length; i++) {
    album.innerHTML += `
    <div class="col col-12 col-md-4 col-lg-2">
      <div class="bg-dark-unlight p-2 rounded-3">
       <div class="w-100 overflow-hidden rounded-3 mb-2">
          <a href="albums.html?id=${obj[i].id}">
            <img
                src="${obj[i].cover_big}"
                alt="img"
                class="img-fluid"
                />
            </a>
        </div>
        <div class="mt-3">
            <a href="albums.html?id=${obj[i].id}"><p class="m-0 fw-bold fs-6 text-truncate">${obj[i].title}</p></a>
        </div>
      </div>
    </div>
`
  }
}
