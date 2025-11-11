const searchURL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q='

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
            }"><p class="m-0 fw-bold w-75 text-truncate">${obj.title}</p></a>
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
       <div class="w-100 overflow-hidden rounded-3 mb-2">
          <a href="albums.html?id=${obj[i].id}">
            <img
                src="${obj[i].cover_big}"
                alt="img"
                class="img-fluid"
                />
            </a>
        </div>
        <div>
            <a href="albums.html?id=${obj[i].id}"><p class="m-0 fw-bold fs-5">${obj[i].title}</p></a>
        </div>
    </div>
`
  }
}
