import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const filesDir = path.join(process.cwd(), 'public', 'files')
    
    // Ensure files directory exists
    try {
      await fs.access(filesDir)
    } catch {
      await fs.mkdir(filesDir, { recursive: true })
    }

    const files = await fs.readdir(filesDir)
    const fileStats = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(filesDir, filename)
        const stats = await fs.stat(filePath)
        return {
          name: filename,
          size: stats.size,
          modified: stats.mtime,
          url: `/files/${filename}`
        }
      })
    )

    return NextResponse.json({
      success: true,
      files: fileStats
    })
  } catch (error) {
    console.error('Error reading files:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read files' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    const filesDir = path.join(process.cwd(), 'public', 'files')
    await fs.mkdir(filesDir, { recursive: true })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(filesDir, file.name)
    
    await fs.writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      file: {
        name: file.name,
        size: file.size,
        url: `/files/${file.name}`
      }
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
