import React, { useEffect, useRef } from 'react';

// Curated library of authentic multi-line Code Blocks
const CODE_BLOCKS: { filename?: string; lines: string[] }[] = [
  {
    filename: 'auth.service.ts',
    lines: [
      'export async function verifySession(token: string): Promise<Session> {',
      '  const decoded = await jwt.verify(token, process.env.SECRET_KEY);',
      '  if (!decoded.active) throw new UnauthorizedException("Session revoked");',
      '  return { user: decoded.sub, roles: decoded.roles, ttl: decoded.exp };',
      '}'
    ]
  },
  {
    filename: 'types/engine.d.ts',
    lines: [
      'export interface ClusterNode<T = unknown> {',
      '  readonly id: UUID;',
      '  status: "ONLINE" | "DRAINING" | "IDLE";',
      '  metrics: { latency: number; cpuUsage: Float32Array };',
      '  dispatch: (command: NodeCommand<T>) => Promise<Result>;',
      '}'
    ]
  },
  {
    filename: 'useWebSocket.ts',
    lines: [
      'export const useStream = (url: string) => {',
      '  const socketRef = useRef<WebSocket | null>(null);',
      '  useEffect(() => {',
      '    socketRef.current = new WebSocket(url);',
      '    socketRef.current.onmessage = (e) => handlePacket(e.data);',
      '    return () => socketRef.current?.close();',
      '  }, [url]);',
      '};'
    ]
  },
  {
    filename: 'kernel.c',
    lines: [
      'static inline void* mmap_alloc(size_t len, int prot) {',
      '  void *addr = sys_mmap(0x0, len, prot, MAP_ANON | MAP_PRIVATE, -1, 0);',
      '  if (addr == MAP_FAILED) return NULL;',
      '  memset(addr, 0, len);',
      '  return addr;',
      '}'
    ]
  },
  {
    filename: 'pipeline.rs',
    lines: [
      'pub async fn process_events<T: EventStream>(stream: &mut T) -> Result<Stats> {',
      '  let mut total = 0u64;',
      '  while let Some(batch) = stream.next_batch().await? {',
      '    total += batch.len() as u64;',
      '    emit_telemetry(&batch).await;',
      '  }',
      '  Ok(Stats { count: total, state: "COMPLETE" })',
      '}'
    ]
  },
  {
    filename: 'tailwind.config.ts',
    lines: [
      'export default {',
      '  theme: {',
      '    extend: {',
      '      colors: { brand: "#818cf8", surface: "#0a0f1d" },',
      '      fontFamily: { mono: ["Roboto Mono", "monospace"] }',
      '    }',
      '  }',
      '};'
    ]
  },
  {
    filename: 'renderTree.ts',
    lines: [
      'const computeDAG = (nodes: NodeMap, edges: Edge[]): RenderGraph => {',
      '  const visited = new Set<string>();',
      '  const sorted = topologicalSort(nodes, edges);',
      '  return sorted.map((id) => compileShaders(nodes[id]));',
      '};'
    ]
  },
  {
    filename: 'schema.sql',
    lines: [
      'CREATE TABLE deployment_runs (',
      '  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),',
      '  commit_sha VARCHAR(40) NOT NULL,',
      '  status VARCHAR(20) CHECK (status IN (\'PENDING\', \'SUCCESS\')),',
      '  duration_ms INT NOT NULL DEFAULT 0',
      ');'
    ]
  },
  {
    filename: 'docker-compose.yml',
    lines: [
      'services:',
      '  api-gateway:',
      '    image: registry.local/gateway:v2.4.0',
      '    ports: ["3000:3000"]',
      '    environment:',
      '      - NODE_ENV=production'
    ]
  },
  {
    filename: 'store.ts',
    lines: [
      'type Action = { type: "SET_THEME"; payload: "indigo" } | { type: "RESET" };',
      'export const rootReducer = (state = initialState, action: Action) => {',
      '  switch (action.type) {',
      '    case "SET_THEME": return { ...state, theme: action.payload };',
      '    default: return state;',
      '  }',
      '};'
    ]
  },
  {
    filename: 'telemetry.ts',
    lines: [
      'window.addEventListener("unhandledrejection", (event) => {',
      '  logger.error("FATAL_PROMISE_REJECTION", {',
      '    reason: event.reason,',
      '    timestamp: performance.now()',
      '  });',
      '});'
    ]
  },
  {
    filename: '0x004F_dump.hex',
    lines: [
      '0x0010: 48 89 E5 48 83 EC 20 48 89 7D F8 48 8B 45 F8',
      '0x0020: 48 8B 00 48 89 C7 E8 00 00 00 00 C9 C3 90 90',
      '0x0030: 55 48 89 E5 48 83 EC 10 C7 45 FC 00 00 00 00'
    ]
  }
];

interface GeneratedBlock {
  filename?: string;
  lines: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  lineNumOffset: number;
}

const BackgroundCode: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let cachedBlocks: GeneratedBlock[] = [];

    // Configuration applied from user's selection:
    // - Density: Dense (4x4 on desktop, 3x5 on mobile)
    // - Line Numbers: true
    // - File Headers: true
    // - Reveal Opacity: 0.02 (2.0%)
    const revealOpacity = 0.02; // 2.0% opacity on hover reveal
    const spotlightRadius = 320; // Soft proximity flashlight radius around cursor

    // Mouse tracking with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      intensity: 0,
      targetIntensity: 0,
    };

    const generateLayout = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const isMobile = canvas.width < 768;
      // Dense layout: 4 columns x 4 rows on desktop
      const numCols = isMobile ? 3 : 4;
      const numRows = isMobile ? 5 : 4;

      const cellW = canvas.width / numCols;
      const cellH = canvas.height / numRows;

      const fontSize = 11;
      const lineHeight = 17;
      ctx.font = `${fontSize}px "Roboto Mono", "Fira Code", monospace`;

      const blocks: GeneratedBlock[] = [];

      for (let c = 0; c < numCols; c++) {
        for (let r = 0; r < numRows; r++) {
          const seed1 = Math.sin(c * 27.1828 + r * 41.932) * 43758.5453;
          const seed2 = Math.sin(c * 63.819 + r * 19.341) * 23421.6312;
          const rand1 = Math.abs(seed1) % 1;
          const rand2 = Math.abs(seed2) % 1;

          const blockIdx = Math.floor((c * numRows + r + Math.floor(rand1 * CODE_BLOCKS.length)) % CODE_BLOCKS.length);
          const blockData = CODE_BLOCKS[blockIdx];

          let maxLineWidth = 0;
          blockData.lines.forEach((line) => {
            const w = ctx.measureText(line).width;
            if (w > maxLineWidth) maxLineWidth = w;
          });

          const lineNumOffset = 28; // Line numbers enabled
          const totalBlockW = maxLineWidth + lineNumOffset + 24;
          const totalBlockH = (blockData.lines.length + 1.5) * lineHeight + 18;

          const maxJitterX = Math.max(0, cellW - totalBlockW - 16);
          const maxJitterY = Math.max(0, cellH - totalBlockH - 16);

          const startX = c * cellW + 12 + rand1 * maxJitterX;
          const startY = r * cellH + 12 + rand2 * maxJitterY;

          blocks.push({
            filename: blockData.filename,
            lines: blockData.lines,
            x: startX,
            y: startY,
            width: totalBlockW,
            height: totalBlockH,
            lineNumOffset,
          });
        }
      }

      cachedBlocks = blocks;
    };

    const draw = () => {
      // Smooth lerp mouse coordinates and intensity
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
      mouse.intensity += (mouse.targetIntensity - mouse.intensity) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only render when hovered/active to maximize performance
      if (mouse.intensity > 0.005) {
        const baseColor = '129, 140, 248'; // Primary Indigo
        const accentSky = '147, 197, 253'; // Soft Sky
        const lineHeight = 17;
        const fontSize = 11;
        const pad = 8;

        // 1. Draw all code blocks
        cachedBlocks.forEach((block) => {
          // Block border
          ctx.strokeStyle = `rgba(${baseColor}, ${revealOpacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(block.x - pad, block.y - pad, block.width + pad * 2, block.height + pad * 2);

          let currentY = block.y;

          // File header
          if (block.filename) {
            ctx.fillStyle = `rgba(${accentSky}, ${revealOpacity * 1.3})`;
            ctx.font = `bold 10px "Roboto Mono", "Fira Code", monospace`;
            ctx.fillText(`// ${block.filename}`, block.x, currentY);
            currentY += lineHeight * 1.3;
          }

          // Lines and Line Numbers
          ctx.font = `${fontSize}px "Roboto Mono", "Fira Code", monospace`;
          block.lines.forEach((line, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            ctx.fillStyle = `rgba(${baseColor}, ${revealOpacity * 0.5})`;
            ctx.fillText(numStr, block.x, currentY);

            ctx.fillStyle = `rgba(${baseColor}, ${revealOpacity})`;
            ctx.fillText(line, block.x + block.lineNumOffset, currentY);

            currentY += lineHeight;
          });
        });

        // 2. Apply smooth radial spotlight mask at the cursor location (only appears when hovered)
        ctx.globalCompositeOperation = 'destination-in';
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );
        gradient.addColorStop(0, `rgba(0, 0, 0, ${mouse.intensity})`);
        gradient.addColorStop(0.65, `rgba(0, 0, 0, ${mouse.intensity * 0.6})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
      }

      animFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.targetIntensity = 1;
    };

    const handleMouseLeave = () => {
      mouse.targetIntensity = 0;
    };

    generateLayout();
    draw();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', generateLayout);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', generateLayout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hover-code-blocks-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};

export default BackgroundCode;
