import {commitFiles} from '../src/github'

test('runs git commands', async () => {
  await expect(commitFiles()).resolves.not.toThrow()
})
