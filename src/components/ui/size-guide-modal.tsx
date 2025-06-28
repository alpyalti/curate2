import React from "react";
import { X, Ruler } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

const sizeGuides = {
  women: {
    title: "Women's Size Guide",
    measurements: [
      { size: "XS", bust: "32", waist: "24", hips: "34" },
      { size: "S", bust: "34", waist: "26", hips: "36" },
      { size: "M", bust: "36", waist: "28", hips: "38" },
      { size: "L", bust: "38", waist: "30", hips: "40" },
      { size: "XL", bust: "40", waist: "32", hips: "42" }
    ],
    headers: ["Size", "Bust (inches)", "Waist (inches)", "Hips (inches)"]
  },
  men: {
    title: "Men's Size Guide",
    measurements: [
      { size: "XS", chest: "34", waist: "28", shoulders: "17" },
      { size: "S", chest: "36", waist: "30", shoulders: "18" },
      { size: "M", chest: "38", waist: "32", shoulders: "19" },
      { size: "L", chest: "40", waist: "34", shoulders: "20" },
      { size: "XL", chest: "42", waist: "36", shoulders: "21" },
      { size: "XXL", chest: "44", waist: "38", shoulders: "22" }
    ],
    headers: ["Size", "Chest (inches)", "Waist (inches)", "Shoulders (inches)"]
  },
  sports: {
    title: "Sports & Activewear Size Guide",
    measurements: [
      { size: "XS", bust: "30-32", waist: "22-24", hips: "32-34" },
      { size: "S", bust: "32-34", waist: "24-26", hips: "34-36" },
      { size: "M", bust: "34-36", waist: "26-28", hips: "36-38" },
      { size: "L", bust: "36-38", waist: "28-30", hips: "38-40" },
      { size: "XL", bust: "38-40", waist: "30-32", hips: "40-42" }
    ],
    headers: ["Size", "Bust (inches)", "Waist (inches)", "Hips (inches)"]
  },
  jewellery: {
    title: "Jewellery Size Guide",
    measurements: [
      { size: "XS", ring: "4-5", bracelet: "6-6.5", necklace: "14-16" },
      { size: "S", ring: "5-6", bracelet: "6.5-7", necklace: "16-18" },
      { size: "M", ring: "6-7", bracelet: "7-7.5", necklace: "18-20" },
      { size: "L", ring: "7-8", bracelet: "7.5-8", necklace: "20-22" },
      { size: "XL", ring: "8-9", bracelet: "8-8.5", necklace: "22-24" }
    ],
    headers: ["Size", "Ring", "Bracelet (inches)", "Necklace (inches)"]
  },
  bags: {
    title: "Bags Size Guide",
    measurements: [
      { size: "Mini", width: "6-8", height: "4-6", depth: "2-3" },
      { size: "Small", width: "8-10", height: "6-8", depth: "3-4" },
      { size: "Medium", width: "10-12", height: "8-10", depth: "4-5" },
      { size: "Large", width: "12-14", height: "10-12", depth: "5-6" },
      { size: "XL", width: "14+", height: "12+", depth: "6+" }
    ],
    headers: ["Size", "Width (inches)", "Height (inches)", "Depth (inches)"]
  }
};

export function SizeGuideModal({ isOpen, onClose, category = "women" }: SizeGuideModalProps) {
  const guide = sizeGuides[category as keyof typeof sizeGuides] || sizeGuides.women;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-background border rounded-lg shadow-lg m-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{guide.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Measurement Instructions */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">How to Measure</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                {category === "women" || category === "sports" ? (
                  <>
                    <p><strong>Bust:</strong> Measure around the fullest part of your chest</p>
                    <p><strong>Waist:</strong> Measure around your natural waistline</p>
                    <p><strong>Hips:</strong> Measure around the fullest part of your hips</p>
                  </>
                ) : category === "men" ? (
                  <>
                    <p><strong>Chest:</strong> Measure around the fullest part of your chest</p>
                    <p><strong>Waist:</strong> Measure around your natural waistline</p>
                    <p><strong>Shoulders:</strong> Measure from shoulder point to shoulder point</p>
                  </>
                ) : category === "jewellery" ? (
                  <>
                    <p><strong>Ring:</strong> Measure the inner diameter of a ring that fits</p>
                    <p><strong>Bracelet:</strong> Measure around your wrist</p>
                    <p><strong>Necklace:</strong> Desired length from base of neck</p>
                  </>
                ) : category === "bags" ? (
                  <>
                    <p><strong>Width:</strong> Measured across the widest point</p>
                    <p><strong>Height:</strong> Measured from top to bottom</p>
                    <p><strong>Depth:</strong> Measured from front to back</p>
                  </>
                ) : null}
              </div>
            </div>

            {/* Size Chart Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    {guide.headers.map((header, index) => (
                      <th key={index} className="text-left py-3 px-4 font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.measurements.map((measurement, index) => (
                    <tr key={index} className={cn("border-b", index % 2 === 0 && "bg-muted/20")}>
                      <td className="py-3 px-4 font-medium">{measurement.size}</td>
                      {Object.entries(measurement).slice(1).map(([key, value], cellIndex) => (
                        <td key={cellIndex} className="py-3 px-4 text-muted-foreground">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Size Conversion Tips</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• All measurements are in inches</p>
                <p>• For the best fit, compare your measurements to our size chart</p>
                <p>• If you're between sizes, we recommend sizing up</p>
                <p>• Contact our customer service for personalized fit advice</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="flex justify-end">
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 