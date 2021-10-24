import * as core from '@actions/core'
import cp from 'child_process'
import util from 'util'

const exec = util.promisify(cp.exec)

export async function commitFiles(): Promise<void> {
  // Configure git cli client
  const {stdout: ghout, stderr: gherr} = await exec(
    'git config --local user.email "action@github.com" && git config --local user.name "GitHub Action"'
  )
  core.debug(`Output from git config is: ${ghout}`)
  core.debug(`Error response from git config is: ${gherr}`)

  // Try to add any changed png files
  try {
    const {stdout: gitout, stderr: giterr} = await exec(
      `git branch
      git add *png`
    )
    core.debug(`Output from git add is: ${gitout}`)
    core.debug(`Error response from git add is: ${giterr}`)
  } catch (err) {
    // no files changed, just return
    core.debug(`Error adding png files: ${err.stderr}`)
    return
  }

  const {stdout: pushout, stderr: pusherr} = await exec(
    `git commit -m "chore: Updating rendered web sequence diagrams" || true
    git push`
  )
  core.debug(`Output from git push is: ${pushout}`)
  core.debug(`Error response from git push is: ${pusherr}`)
}
