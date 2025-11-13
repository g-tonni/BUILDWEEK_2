const backBtn = document.getElementById("backBtn")
const nextBtn = document.getElementById("nextBtn")

// Funzione per aggiornare lo stato dei pulsanti
function updateNavButtons() {
  // Controllo indietro
  if (navigation.canGoBack) {
    backBtn.classList.remove("nav-disabled")
  } else {
    backBtn.classList.add("nav-disabled")
  }

  // Controllo avanti
  if (navigation.canGoForward) {
    nextBtn.classList.remove("nav-disabled")
  } else {
    nextBtn.classList.add("nav-disabled")
  }
}

// Aggiorna pulsanti all'avvio
updateNavButtons()

// Quando avviene una navigazione, ricalcola
navigation.addEventListener("navigate", () => {
  // breve delay per far aggiornare lo stato
  setTimeout(updateNavButtons, 0)
})

// Pulsante indietro
backBtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (navigation.canGoBack) {
    navigation.back()
  }
})

// Pulsante avanti
nextBtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (navigation.canGoForward) {
    navigation.forward()
  }
})

const albumIDs = [75621062, 302127, 119606, 121157, 103248, 302139]

const loadBuonaseraAlbums = function () {
  const cards = document.querySelectorAll(".buonasera-cards")

  cards.forEach((card, i) => {
    const img = card.querySelector("img")
    const title = card.querySelector("span")
    const link = card.querySelector("a")

    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${albumIDs[i]}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.status)
        }
      })
      .then((album) => {
        img.src = album.cover_medium
        title.innerText = album.title
        link.setAttribute("href", `albums.html?id=${albumIDs[i]}`)
      })
      .catch((err) => console.log("Errore API:", err))
  })
}

loadBuonaseraAlbums()

const artistID = [412, 13, 2296, 3312, 6050984, 145]

const loadAltroArtists = function () {
  const cards = document.querySelectorAll(".altro-cards")

  cards.forEach((card, i) => {
    const img = card.querySelector("img")
    const title = card.querySelector("h6")
    const description = card.querySelector("p")
    const link = card.querySelector("a")

    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID[i]}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.status)
        }
      })
      .then((artist) => {
        img.src = artist.picture_medium
        title.innerText = artist.name
        description.innerText = "Le migliori HIT"
        link.setAttribute("href", `artist.html?id=${artistID[i]}`)
      })
      .catch((err) => console.log("Errore API:", err))
  })
}

loadAltroArtists()

const playAudio = function (url) {
  const audioURL = url

  const audio = new Audio(audioURL)

  const playButton = document.getElementById("play")
  const pauseButton = document.getElementById("pause")
  console.log(playButton)
  console.log(audio)

  playButton.appendChild(audio)
  audio.addEventListener("canplaythrough", (event) => {
    playButton.addEventListener("click", () => {
      pauseButton.classList.remove("d-none")
      playButton.classList.add("d-none")
      audio.play()
    })
    pauseButton.addEventListener("click", () => {
      pauseButton.classList.add("d-none")
      playButton.classList.remove("d-none")
      audio.pause()
    })
  })
}
