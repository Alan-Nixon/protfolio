"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageSlider({
  images = [],
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Ensure images is always an array
  const safeImages = Array.isArray(images) ? images : [];

  const navigateNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === safeImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [safeImages.length]);

  const navigatePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? safeImages.length - 1 : prevIndex - 1
    );
  }, [safeImages.length]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    // Ensure initialIndex is within bounds
    const validIndex = Math.min(
      Math.max(0, initialIndex),
      safeImages.length - 1
    );
    setCurrentIndex(safeImages.length > 0 ? validIndex : 0);
  }, [initialIndex, safeImages.length]);

  useEffect(() => {
    // Reset zoom and position when changing images
    setZoomLevel(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          navigatePrev();
          break;
        case "ArrowRight":
          navigateNext();
          break;
        case "Escape":
          onClose();
          break;
        case "+":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        default:
          break;
      }
    },
    [isOpen, onClose, navigateNext, navigatePrev, handleZoomIn, handleZoomOut]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY,
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    if (safeImages.length === 0 || currentIndex >= safeImages.length) return;

    const link = document.createElement("a");
    link.href = safeImages[currentIndex];
    link.download = `image-${currentIndex}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || safeImages.length === 0) return null;

  // Ensure currentIndex is within bounds
  const safeIndex = Math.min(Math.max(0, currentIndex), safeImages.length - 1);
  const currentImage = safeImages[safeIndex] || "/placeholder.svg";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : zoomLevel > 1 ? "grab" : "default",
        }}
      >
        <Image
          src={currentImage || "/placeholder.svg"}
          alt={`Image ${safeIndex + 1}`}
          width={800}
          height={600}
          className="max-h-[80vh] max-w-[80vw] object-contain transition-transform duration-200"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
          draggable={false}
        />
      </div>

      {/* Navigation arrows - only show if there's more than one image */}
      {safeImages.length > 1 && (
        <>
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          className="text-white hover:bg-white hover:bg-opacity-20"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          className="text-white hover:bg-white hover:bg-opacity-20"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRotate}
          className="text-white hover:bg-white hover:bg-opacity-20"
          aria-label="Rotate"
        >
          <RotateCw size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDownload}
          className="text-white hover:bg-white hover:bg-opacity-20"
          aria-label="Download"
        >
          <Download size={20} />
        </Button>
        <div className="text-white text-sm px-2">
          {safeIndex + 1} / {safeImages.length}
        </div>
      </div>
    </div>
  );
}
