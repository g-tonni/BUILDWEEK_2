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
    }:${obj.duration % 60}</td>
   </tr>

    `
}
