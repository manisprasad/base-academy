
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  accept?: Record<string, string[]>
  maxSize?: number
}

export function FileUpload({ onFileSelect, selectedFile, accept, maxSize }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
      setIsDragActive(false)
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: accept || {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: maxSize || 10 * 1024 * 1024, // 10MB default
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  const removeFile = () => {
    onFileSelect(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (selectedFile) {
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center gap-3">
          <File className="h-8 w-8 text-blue-500" />
          <div>
            <p className="font-medium text-sm">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={removeFile}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive && !isDragReject && "border-primary bg-primary/5",
        isDragReject && "border-destructive bg-destructive/5",
        !isDragActive && "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
    >
      <input {...getInputProps()} />
      <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
      {isDragActive ? (
        isDragReject ? (
          <p className="text-destructive">File type not supported</p>
        ) : (
          <p className="text-primary">Drop your file here...</p>
        )
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-medium">Drag & drop your notes here</p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOC, DOCX, TXT files up to 10MB
          </p>
          <Button variant="secondary" size="sm" className="mt-2">
            Browse Files
          </Button>
        </div>
      )}
    </div>
  )
}
