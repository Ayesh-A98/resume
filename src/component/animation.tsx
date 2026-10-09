import { useRef, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface Block {
  col: number;
  row: number;
}

export function IntroBlocks({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize(): void {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
    }
    resize();
    window.addEventListener("resize", resize);

    const blockSize = 22;
    const pattern: number[][] = [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ];

    const blocks: Block[] = [];
    function addLetter(colOffset: number): void {
      pattern.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell) blocks.push({ col: c + colOffset, row: r });
        });
      });
    }
    addLetter(0);
    addLetter(6);

    const totalCols = 10;
    const totalRows = 7;
    const shapeWidth = totalCols * blockSize;
    const shapeHeight = totalRows * blockSize;

    let progress = 0;
    let raf: number;
    let holdTimeout: ReturnType<typeof setTimeout>;

    function draw(): void {
      ctx!.clearRect(0, 0, w, h);

      // 50/50 horizontal split gradient (left red-600 / right zinc-950)
      const gradient = ctx!.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, "#FFC309");
      gradient.addColorStop(0.5, "#FFC309");
      gradient.addColorStop(0.5, "#FF9400");
      gradient.addColorStop(1, "#FF9400");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, w, h);

      const offsetX = (w - shapeWidth) / 2;
      const offsetY = (h - shapeHeight) / 2;

      const revealCount = Math.floor(progress * blocks.length * 1.6);

      for (let i = 0; i < blocks.length && i < revealCount; i++) {
        const b = blocks[i];
        ctx!.fillStyle = "#ffffff";
        ctx!.fillRect(
          offsetX + b.col * blockSize,
          offsetY + b.row * blockSize,
          blockSize - 2,
          blockSize - 2
        );
      }

      progress += 0.03;
      if (progress < 1.3) {
        raf = requestAnimationFrame(draw);
      } else {
        // fully revealed — hold here for a bit before moving on
        holdTimeout = setTimeout(onDone, 1200); // 1.2s pause on the intro
      }
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimeout);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}