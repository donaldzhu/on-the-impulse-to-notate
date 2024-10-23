const fs = require('fs')
const sharp = require('sharp')

const input = 'scripts/00_Originals'
const output = 'public/assets'
const subpaths = {
  img: ['01_Primary-Text', '04_Interviews'],
  visualEssay: ['03_Surface-Manipulation', '02_Blue-Insights'],
}

Array.prototype.forEachAsync = async function (fn) {
  let i = 0
  for (let t of this) {
    await fn(t, i)
    i++
  }
}

Array.prototype.forEachAsyncParallel = async function (fn) {
  await Promise.all(this.map(fn))
}

const joinPaths = (...subpaths) => subpaths.join('/')
const createSizes = (length, interval) => Array(length).fill(interval).map((size, i) => size * (1 + i))
const imgSizes = createSizes(5, 150)
const visualEssaySizes = createSizes(8, 125)

fs.rmSync(output, { recursive: true })
fs.mkdirSync(output)

const resizeGroup = async (subpaths, sizes) => {
  await subpaths.forEachAsync(async (subpath, i) => {
    const inputPath = joinPaths(input, subpath)
    const dir = fs.readdirSync(inputPath)
    const outputPath = joinPaths(output, subpath)
    fs.mkdirSync(outputPath)
    await sizes.forEachAsync(async size => {
      const sizeDir = joinPaths(outputPath, size)
      fs.mkdirSync(sizeDir)
      await dir.forEachAsync(async fileName => {
        if (!fileName.match(/\.tif$/)) return
        const path = joinPaths(inputPath, fileName)
        const img = sharp(path)
        const { width, height } = await img.metadata()

        sharp({
          create: {
            width,
            height,
            channels: 3,
            background: i ? '#3180C6' : '#9A6A12'
          }
        })
          .composite([{ input: path, blend: 'screen' }])
          .webp()
          .toColourspace('rgb16')
          .toFile(joinPaths(sizeDir, fileName.replace(/tif$/, 'webp')), err => {
            if (err) throw err
            console.log(size, fileName)
          })
      })
    })
  })
}

(async () => {
  await resizeGroup(subpaths.img, imgSizes)
  await resizeGroup(subpaths.visualEssay, visualEssaySizes)
})()