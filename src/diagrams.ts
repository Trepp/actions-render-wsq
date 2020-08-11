import * as core from '@actions/core'
import wsd from 'websequencediagrams'
import {promises as fs} from 'fs'
import path from 'path'

export async function render(folder: string, style: string): Promise<void> {
  let filename = null
  const files = await fs.readdir(folder)
  const diagramFiles = files.filter(s => {
    return s.endsWith('.wsq')
  })

  for (filename of diagramFiles) {
    core.debug(`Rendering ${filename}`)
    core.debug(`Full path of file is ${path.join(folder, filename)}`)
    const graph = await fs.readFile(path.join(folder, filename))
    const diagram = (await wsd.diagram(graph, style, 'png'))[0]
    await fs.writeFile(
      path.join(folder, filename.replace('.wsq', '.png')),
      diagram
    )
  }
}
