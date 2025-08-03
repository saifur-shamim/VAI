// src/pages/Annotate.tsx
import React, { useRef, useState, useEffect } from 'react';

const IMAGES = Array.from({ length: 5 }, (_, i) => `/images/${i + 1}.jpg`);

type Point = { x: number; y: number };

const Annotate = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [polygons, setPolygons] = useState<Point[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imageSrc = IMAGES[currentImageIndex];

  const loadPolygons = () => {
    const saved = localStorage.getItem(`poly-${imageSrc}`);
    return saved ? JSON.parse(saved) : [];
  };

  const savePolygons = (data: Point[][]) => {
    localStorage.setItem(`poly-${imageSrc}`, JSON.stringify(data));
  };

  useEffect(() => {
    setPolygons(loadPolygons());
    setPoints([]);
  }, [currentImageIndex]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints((prev) => [...prev, { x, y }]);
  };

  const completePolygon = () => {
    if (points.length >= 3) {
      const updated = [...polygons, points];
      setPolygons(updated);
      savePolygons(updated);
      setPoints([]);
    }
  };

  const deleteLastPolygon = () => {
    const updated = polygons.slice(0, -1);
    setPolygons(updated);
    savePolygons(updated);
  };

  // Redraw canvas whenever points or polygons change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 2;

    // Draw completed polygons
    polygons.forEach((poly) => {
      ctx.beginPath();
      poly.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      );
      ctx.closePath();
      ctx.stroke();
    });

    // Draw in-progress polygon
    if (points.length > 0) {
      ctx.beginPath();
      points.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      );
      ctx.stroke();
    }
  }, [points, polygons]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🖍️ Annotate</h1>

      <div className="mb-4">
        <button
          onClick={() =>
            setCurrentImageIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)
          }
          className="mr-2 bg-gray-200 px-3 py-1 rounded"
        >
          ⬅ Prev
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex((i) => (i + 1) % IMAGES.length)
          }
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Next ➡
        </button>
      </div>

      <div className="relative inline-block">
        <img
          src={imageSrc}
          alt="Annotation"
          className="w-[600px] h-[400px] object-cover border"
        />
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="absolute top-0 left-0 border border-green-300"
          onClick={handleClick}
        />
      </div>

      <div className="mt-4">
        <button
          onClick={completePolygon}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Complete Polygon
        </button>
        <button
          onClick={deleteLastPolygon}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Last Polygon
        </button>
      </div>
    </div>
  );
};

export default Annotate;
