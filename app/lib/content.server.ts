import fs from 'fs/promises'
import path from 'path'
import {bundleMDX} from 'mdx-bundler'
import { existsSync } from 'fs'

type PostMeta = {
  title: string
  date: string
  tag: string
}

export type PostListItem = PostMeta & {
  slug: string
  body?: string
}

export async function getContentFolder(folder: string) {
  const basepath = path.join(process.cwd(), 'content', folder)
  if (!existsSync(basepath)) {
    return []
  }

  const directory = await fs.readdir(basepath)

  const posts = await Promise.all(
    directory
      .filter(file => {
        const extension = path.extname(file)
        return extension === '.md'
      })
      .map(async (file) => {
        const result = await getContentFile(path.join(folder, file))
        return {
          ...result,
          filename: file,
        }
      })
  )

  return posts.sort((a, b) => {
    return a.frontmatter.order - b.frontmatter.order
  })
}

export type ParsedMarkdown = Omit<Awaited<ReturnType<typeof bundleMDX>>, 'code'> & {
  body: string
  filename: string
}

export async function getContentFile(slug: string) {
  const filename = slug.replace(/^\//, '').replace(/\/$/, '')
  const fullPath = path.join(process.cwd(), 'content', filename)
  const text = await fs.readFile(fullPath)
  const result = await bundleMDX({ source: text.toString() })
  const { code, ...data } = result
  return {
    body: code,
    ...data,
  }
}
