import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FlowerBouquetApp() {
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleGenerate = async () => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("quantity", quantity);

    const res = await fetch("http://localhost:8000/generate", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    setPreview(URL.createObjectURL(blob));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Flower Bouquet Generator</h1>
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="images">Upload Flower Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
            />
          </div>
          <div>
            <Label htmlFor="quantity">Number of Flowers</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerate}>Generate Bouquet</Button>
          {preview && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Generated Bouquet:</h2>
              <img src={preview} alt="Bouquet" className="rounded-xl shadow-lg mt-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
