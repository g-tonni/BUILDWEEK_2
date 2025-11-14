let img = document.getElementById('artist-img')
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

      console.log('Colore medio:', averageColor)

      const col = document.querySelector('.gradation')
      console.log(col);
      col.style.backgroundColor = averageColor}