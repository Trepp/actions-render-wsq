import * as core from '@actions/core'
import {render} from './diagrams'

async function run(): Promise<void> {
  try {
    const folder: string = core.getInput('folder')
    const style: string = core.getInput('style')

    await render(folder, style)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
