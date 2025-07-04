import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NotesZodSchema, type NotesType } from "@/schemas/Notes.schema"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FileText, Link2, Tag } from "lucide-react"
import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { TagInput } from "@/components/tag-input"
import { FaRupeeSign, FaUpload } from "react-icons/fa"

export function UploadNotes() {
  const [uploadMethod, setUploadMethod] = useState<"link" | "file">("link")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm({
    resolver: zodResolver(NotesZodSchema),
    defaultValues: {
      isFree: true,
      likes: 0,
      views: 0,
      category: [],
      tags: [],
    },
  })

  const onSubmit = (data: NotesType) => {
    const formData = {
      ...data,
      file: selectedFile,
      uploadMethod,
    }
    console.log("Form data:", formData)
    alert("Notes uploaded successfully!")
    form.reset()
    setSelectedFile(null)
    setUploadMethod("link")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-22">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl flex items-center justify-center gap-2 font-bold tracking-tight">
          <FaUpload />
           Notes
           </h1>
        <p className="text-muted-foreground">Upload Your Notes</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Basic Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Provide the essential details about your notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter note title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mathematics, Physics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="des"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of your notes content"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Classes */}
              <FormField
                control={form.control}
                name="classes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class/Grade Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Grade 12, University Level" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Links & Media Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Links & Media
              </CardTitle>
              <CardDescription>Add your notes via link or upload a document file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Method Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">How would you like to add your notes?</Label>
                <RadioGroup
                  value={uploadMethod}
                  onValueChange={(value: "link" | "file") => setUploadMethod(value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="link" />
                    <Label htmlFor="link">Provide a link</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="file" id="file" />
                    <Label htmlFor="file">Upload a file</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Content Based on Upload Method */}
              {uploadMethod === "link" ? (
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Notes Link <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://example.com/notes.pdf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  <Label>
                    Upload Document <span className="text-destructive">*</span>
                  </Label>
                  <FileUpload onFileSelect={setSelectedFile} selectedFile={selectedFile} />
                </div>
              )}

              {/* Thumbnail - Always visible */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://example.com/thumbnail.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Optional: Add a preview image for your notes</p>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Categories & Tags Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categories & Tags
              </CardTitle>
              <CardDescription>Help others find your notes by adding relevant categories and tags</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Categories <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        tags={field.value}
                        onChange={field.onChange}
                        placeholder="Add categories (e.g., Mathematics, Physics)"
                        maxTags={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagInput
                        tags={field.value || []}
                        onChange={field.onChange}
                        placeholder="Add tags (e.g., exam, important, revision)"
                        maxTags={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Pricing Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaRupeeSign className="h-5 w-5" />
                Pricing & Access
              </CardTitle>
              <CardDescription>Set whether your notes are free or require payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Is Free Checkbox */}
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">Make these notes free to access</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Allow anyone to download your notes without payment
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* Price Field (only shown when not free) */}
              {!form.watch("isFree") && (
                <div className="rounded-md border p-4 bg-muted/50">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (Rs.)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            ₹
                            </span>
                            <Input
                              type="number"
                              min={0}
                              step={9}
                              placeholder="0.00"
                              className="pl-8"
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-muted-foreground">Set a fair price for your notes</p>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Uploading Notes...
                  </>
                ) : (
                  "Upload Notes"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
