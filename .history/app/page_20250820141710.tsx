'use client'

import { useState } from 'react'
import { Upload, Smartphone, Globe, Download, FileText, Settings } from 'lucide-react'

interface FileInfo {
  id: string
  name: string
  size: string
  platform: 'ios' | 'android' | 'universal'
  uploadDate: string
  downloadUrl: string
}

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'universal'>('universal')
  const [files, setFiles] = useState<FileInfo[]>([
    {
      id: '1',
      name: 'app-config.json',
      size: '2.3 KB',
      platform: 'universal',
      uploadDate: '2024-01-15',
      downloadUrl: '/files/app-config.json'
    },
    {
      id: '2',
      name: 'ios-assets.zip',
      size: '15.7 MB',
      platform: 'ios',
      uploadDate: '2024-01-14',
      downloadUrl: '/files/ios-assets.zip'
    },
    {
      id: '3',
      name: 'android-assets.zip',
      size: '12.1 MB',
      platform: 'android',
      uploadDate: '2024-01-13',
      downloadUrl: '/files/android-assets.zip'
    }
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFile: FileInfo = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        platform: selectedPlatform,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadUrl: `/files/${file.name}`
      }
      setFiles([newFile, ...files])
    }
  }

  const filteredFiles = files.filter(file => 
    selectedPlatform === 'universal' || file.platform === selectedPlatform
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Universal Links Test
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Modern file hosting platform for iOS and Android applications with universal link support
        </p>
      </div>

      {/* Platform Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'universal', name: 'Universal', icon: Globe, color: 'bg-purple-500' },
            { id: 'ios', name: 'iOS', icon: Smartphone, color: 'bg-blue-500' },
            { id: 'android', name: 'Android', icon: Smartphone, color: 'bg-green-500' }
          ].map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id as any)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedPlatform === platform.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${platform.color} text-white`}>
                  <platform.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">
                    {platform.id === 'universal' ? 'Cross-platform files' : `${platform.name} specific files`}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Drag and drop files here, or click to select
          </p>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors cursor-pointer inline-block"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* File List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hosted Files</h2>
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No files found for the selected platform</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">
                      {file.size} • {file.platform} • {file.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={file.downloadUrl}
                    download
                    className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">File Access</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm text-gray-700">
                GET /files/[filename]
              </code>
            </div>
            <p className="text-sm text-gray-600">
              Access any hosted file directly via URL
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Universal Links</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm text-gray-700">
                https://your-domain.vercel.app/files/[filename]
              </code>
            </div>
            <p className="text-sm text-gray-600">
              Use these URLs in your iOS and Android apps
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
