
import { Texture, settings, Rectangle, SCALE_MODES } from 'pixi.js'

// import ship from '../assets/alien1.png'
import sheet from '../assets/cp437@2x.png'

settings.SCALE_MODE = SCALE_MODES.NEAREST
const texSize = [16, 16]
const texCellSize = [20, 20]

export const baseTexture = Texture.from(sheet)
export const frames = []

for (let v = 0; v < texSize[1]; v++) {
  for (let u = 0; u < texSize[0]; u++) {
    frames.push(new Texture(
      baseTexture,
      new Rectangle(
        u * texCellSize[0],
        v * texCellSize[1],
        texCellSize[0],
        texCellSize[1]
      )
    ))
  }
}
