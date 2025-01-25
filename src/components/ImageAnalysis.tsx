import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

const ImageAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <Card className="p-6 backdrop-blur-lg bg-white/10 border-white/20">
        <h1 className="text-2xl font-bold mb-6">Image Analysis</h1>
        <div className="space-y-4">
          <div className="flex justify-center items-center border-2 border-dashed border-white/20 rounded-lg p-6">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Upload an image for analysis
                </span>
              </div>
            </label>
          </div>
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Uploaded"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageAnalysis;