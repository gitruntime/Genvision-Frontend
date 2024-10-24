import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, ImageDown, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC, useCallback, useState } from "react";

export const CertificateTab: FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(e.target.files as FileList),
      ]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const safeFiles = Array.isArray(files) ? files : [];

  const onDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Certificates</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setModalOpen(true)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Certificate</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-y-4">
                      <div>
                        <Label className="text-xs mb-0" htmlFor="title">
                          Title<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          placeholder="Certificate Name"
                        />
                      </div>
                      <div>
                        <Label className="text-xs mb-0" htmlFor="issued_by">
                          Issued by<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="issued_by"
                          placeholder="Issued By"
                        />
                      </div>
                      <div
                        className={`relative flex flex-1 items-center justify-center h-100 rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out ${
                          isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <Input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center gap-2 text-center">
                          <ImageDown className="w-8 h-8 text-gray-400" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">
                              {file ? file.name : "Upload a file"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Drag and drop your files here or click to upload
                            </p>
                          </div>
                        </div>
                      </div>
                      {safeFiles.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-h-60 overflow-y-auto scrollbar">
                          {safeFiles.map((file, index) => (
                            <Card key={index} className="overflow-hidden">
                              <div className="relative aspect-video">
                                {file.type?.startsWith("image/") ? (
                                  <a
                                    href={URL.createObjectURL(file)}
                                    target="_blank"
                                  >
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </a>
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">
                                      No Preview
                                    </span>
                                  </div>
                                )}
                              </div>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-white hover:bg-red-600"
                                    onClick={() => onDelete(index)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  Amazon Junior Software Developer Professional Certificate
                </h3>
                <p className="text-sm text-gray-600">Issued by Amazon</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <img
                    src="https://media.istockphoto.com/id/1135148181/vector/certificate-template-diploma-of-modern-design-or-gift-certificate.jpg?s=1024x1024&w=is&k=20&c=4zK5ZjLdkA6r7BWy53bA8asuGPiV5p_Ak7SdfbyBpZ8="
                    alt="Best Performer Award"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-grow pt-2">
                  <h4 className="font-medium">
                    Amazon-Junior-Software-Developer-Professional-Certificate.png
                  </h4>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  Amazon Senior Software Developer Professional Certificate
                </h3>
                <p className="text-sm text-gray-600">Issued by Amazon</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <img
                    src="https://media.istockphoto.com/id/1135148181/vector/certificate-template-diploma-of-modern-design-or-gift-certificate.jpg?s=1024x1024&w=is&k=20&c=4zK5ZjLdkA6r7BWy53bA8asuGPiV5p_Ak7SdfbyBpZ8="
                    alt="Best Performer Award"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-grow pt-2">
                  <h4 className="font-medium">
                    Amazon-Senior-Software-Developer-Professional-Certificate.png
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
