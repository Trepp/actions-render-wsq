import * as core from '@actions/core'
import {render} from './diagrams'
import {commitFiles} from './github'

async function run(): Promise<void> {
  try {
    const folder: string = core.getInput('folder')
    const style: string = core.getInput('style')
    const commitChanges: boolean = core.getBooleanInput('commitChanges')

    await render(folder, style)

    if (commitChanges) {
      // call gh to commit and push any changed files
      await commitFiles()
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
