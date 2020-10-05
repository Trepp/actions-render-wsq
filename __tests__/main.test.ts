import {render} from '../src/diagrams'
import * as path from 'path'
import {promises as fs} from 'fs'

test('renders a diagram', async () => {
  await render(__dirname, 'modern-blue')
  await fs.unlink(path.join(__dirname, 'test1.png'))
})

test('renders files using local path', async () => {
  await render('./__tests__', 'modern-blue')
  await fs.unlink(path.join(__dirname, 'test1.png'))
})

test('throws unknown style', async () => {
  await expect(render(__dirname, 'modern-blue1111')).rejects.toThrow(
    'Unknown style: modern-blue1111'
  )
})
