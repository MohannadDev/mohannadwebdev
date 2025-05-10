// // 
// import React, { useEffect, useRef, useState } from "react";
// import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

// interface ThreadsProps {
//   color?: [number, number, number];
//   amplitude?: number;
//   distance?: number;
//   enableMouseInteraction?: boolean;
//   width?: number | string;
//   height?: number | string;
//   quality?: 'low' | 'medium' | 'high';
//   paused?: boolean;
// }

// const vertexShader = `
// attribute vec2 position;
// attribute vec2 uv;
// varying vec2 vUv;
// void main() {
//   vUv = uv;
//   gl_Position = vec4(position, 0.0, 1.0);
// }
// `;

// const fragmentShader = `
// precision highp float;

// uniform float iTime;
// uniform vec3 iResolution;
// uniform vec3 uColor;
// uniform float uAmplitude;
// uniform float uDistance;
// uniform vec2 uMouse;
// uniform float uQuality;

// #define PI 3.1415926538

// // Dynamic line count based on quality
// float getLineCount() {
//   return uQuality;
// }

// // Optimized noise function for better performance and smoother results
// float simpleNoise(vec2 p) {
//   vec2 ip = floor(p);
//   vec2 u = fract(p);
//   u = u * u * (3.0 - 2.0 * u); // Improved smoothing
  
//   float res = mix(
//     mix(sin(dot(ip, vec2(12.9898, 78.233))),
//         sin(dot(ip + vec2(1.0, 0.0), vec2(12.9898, 78.233))), u.x),
//     mix(sin(dot(ip + vec2(0.0, 1.0), vec2(12.9898, 78.233))),
//         sin(dot(ip + vec2(1.0, 1.0), vec2(12.9898, 78.233))), u.x), u.y);
//   return 0.5 + 0.5 * res;
// }

// // Secondary noise function for additional detail
// float detailNoise(vec2 p) {
//   // Smoother mixing of frequencies for more natural flow
//   float largeFeat = simpleNoise(p * 2.0) * 0.6;
//   float mediumFeat = simpleNoise(p * 4.0) * 0.3;
//   float smallFeat = simpleNoise(p * 8.0) * 0.1;
  
//   // Blend the frequencies more harmoniously
//   return largeFeat + mediumFeat + smallFeat;
// }

// float pixel(float count, vec2 resolution) {
//   return (1.0 / max(resolution.x, resolution.y)) * count;
// }

// float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
//   float split_offset = (perc * 0.4);
//   float split_point = 0.1 + split_offset;

//   float amplitude_normal = smoothstep(split_point, 0.7, st.x);
//   float amplitude_strength = 0.5;
//   float finalAmplitude = amplitude_normal * amplitude_strength
//                          * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

//   // Slow down the time scale for smoother wave motion
//   float time_scaled = time / 15.0 + (mouse.x - 0.5) * 0.5;
//   float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

//   // Use optimized noise with additional detail layer
//   float xnoise = simpleNoise(vec2(time_scaled, st.x + perc) * 2.0) * 2.0 - 1.0;
  
//   // Add subtle detail but reduce its impact to maintain wave smoothness
//   float detail = detailNoise(vec2(time_scaled * 1.2, st.x * 1.8 + perc * 2.0)) * 0.08 * (1.0 - perc) * finalAmplitude;
  
//   // Smoother blending of y-position components
//   float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;
//   y = mix(y, y + detail, 0.6); // Blend in the detail with control
  
//   // Use different width calculations for foreground vs background lines
//   float line_base_width = 9.0;
//   // Create more even thickness distribution
//   float thickness_variation = mix(1.0, 0.3, pow(perc, 0.5)); 
//   float line_width = width * line_base_width * thickness_variation;
  
//   // Reduced blur values for sharper lines
//   float line_blur = 12.0 * pixel(1.0, iResolution.xy) * blur;
  
//   float line_start = smoothstep(y + (line_width / 2.0) + line_blur, y, st.y);
//   float line_end = smoothstep(y, y - (line_width / 2.0) - line_blur, st.y);

//   // Reduced glow for crisper appearance
//   float glow = smoothstep(y + line_width * 1.5, y, st.y) * 
//               smoothstep(y - line_width * 1.5, y, st.y) * 
//               0.15 * (1.0 - perc);

//   // Sharper blending of lines
//   return clamp((line_start - line_end) * (1.0 - smoothstep(0.0, 0.8, pow(perc, 0.25))) + glow * 0.05, 0.0, 1.0);
// }

// void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//   vec2 uv = fragCoord / iResolution.xy;

//   float line_strength = 1.0;
//   float lineCount = getLineCount();
  
//   // Use dynamic line count based on quality
//   for (float i = 0.0; i < 50.0; i++) {
//     if (i >= lineCount) break;
    
//     float p = i / lineCount;
//     // Make line width dependent on resolution but maintain reasonable size
//     float lineWidth = pixel(1.0, iResolution.xy) * (1.0 - p * 0.5);
    
//     line_strength *= (1.0 - lineFn(
//       uv,
//       lineWidth,
//       p,
//       (PI * 1.0) * p,
//       uMouse,
//       iTime,
//       uAmplitude,
//       uDistance
//     ));
//   }

//   float colorVal = 1.0 - line_strength;
//   // Add a subtle gradient effect
//   float gradient = pow(uv.x * (1.0 - uv.x) * 4.0, 0.5) * 0.1;
//   fragColor = vec4(uColor * (colorVal + gradient), colorVal);
// }

// void main() {
//   mainImage(gl_FragColor, gl_FragCoord.xy);
// }
// `;

// const Threads: React.FC<ThreadsProps> = ({
//   color = [1, 1, 1],
//   amplitude = 1,
//   distance = 0,
//   enableMouseInteraction = false,
//   width = 800,
//   height = 300,
//   quality = 'medium',
//   paused = false,
//   ...rest
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const animationFrameId = useRef<number | null>(null);
//   const rendererRef = useRef<Renderer | null>(null);
//   const programRef = useRef<Program | null>(null);
//   const meshRef = useRef<Mesh | null>(null);
//   const [isInViewport, setIsInViewport] = useState(false);
  
//   // Convert quality setting to a number value for the shader
//   const getQualityValue = (q: 'low' | 'medium' | 'high') => {
//     switch (q) {
//       case 'low': return 30;      // Increased from 25
//       case 'medium': return 40;   // Increased from 35
//       case 'high': return 55;     // Increased from 50
//       default: return 40;         // Increased default
//     }
//   };

//   useEffect(() => {
//     if (!containerRef.current) return;
//     const container = containerRef.current;

//     // Create intersection observer to check if component is in viewport
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           setIsInViewport(entry.isIntersecting);
//         });
//       },
//       { threshold: 0.1 }
//     );
    
//     observer.observe(container);

//     // Initialize the renderer
//     const renderer = new Renderer({ 
//       alpha: true,
//       antialias: true, // Enable antialiasing for smoother lines
//       powerPreference: "high-performance", // Request high performance mode for better rendering
//       depth: false,    // Disable depth testing as we don't need it
//       stencil: false   // Disable stencil buffer as we don't need it
//     });
//     rendererRef.current = renderer;
    
//     const gl = renderer.gl;
//     gl.clearColor(0, 0, 0, 0);
//     gl.enable(gl.BLEND);
//     gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
//     // Add canvas to container
//     container.appendChild(gl.canvas);

//     // Create geometry and program
//     const geometry = new Triangle(gl);
//     const program = new Program(gl, {
//       vertex: vertexShader,
//       fragment: fragmentShader,
//       uniforms: {
//         iTime: { value: 0 },
//         iResolution: {
//           value: new Color(
//             gl.canvas.width,
//             gl.canvas.height,
//             gl.canvas.width / gl.canvas.height
//           ),
//         },
//         uColor: { value: new Color(...color) },
//         uAmplitude: { value: amplitude },
//         uDistance: { value: distance },
//         uMouse: { value: new Float32Array([0.5, 0.5]) },
//         uQuality: { value: getQualityValue(quality) }
//       },
//     });
//     programRef.current = program;

//     const mesh = new Mesh(gl, { geometry, program });
//     meshRef.current = mesh;

//     // Handle resize
//     function resize() {
//       if (!containerRef.current) return;
      
//       // Get actual pixel dimensions
//       let canvasWidth: number;
//       let canvasHeight: number;
      
//       if (typeof width === 'string' && width.includes('vw')) {
//         // Handle viewport width
//         const percentage = parseFloat(width) / 100;
//         canvasWidth = window.innerWidth * percentage;
//       } else {
//         canvasWidth = typeof width === 'number' ? width : parseInt(width as string, 10);
//       }
      
//       if (typeof height === 'string' && height.includes('vh')) {
//         // Handle viewport height
//         const percentage = parseFloat(height) / 100;
//         canvasHeight = window.innerHeight * percentage;
//       } else {
//         canvasHeight = typeof height === 'number' ? height : parseInt(height as string, 10);
//       }
      
//       // Set with devicePixelRatio for sharper rendering on high-DPI displays
//       renderer.setSize(canvasWidth, canvasHeight);
//       // For sharper lines, use a slightly higher DPR but cap it to avoid performance issues
//       renderer.dpr = Math.min(2, window.devicePixelRatio);
//       program.uniforms.iResolution.value.r = canvasWidth;
//       program.uniforms.iResolution.value.g = canvasHeight;
//       program.uniforms.iResolution.value.b = canvasWidth / canvasHeight;
//     }
    
//     // Add resize listener
//     window.addEventListener("resize", resize);
//     resize();

//     // Mouse handling
//     const currentMouse = [0.5, 0.5];
//     let targetMouse = [0.5, 0.5];

//     function handleMouseMove(e: MouseEvent) {
//       const rect = container.getBoundingClientRect();
//       const x = (e.clientX - rect.left) / rect.width;
//       const y = 1.0 - (e.clientY - rect.top) / rect.height;
//       targetMouse = [x, y];
//     }
    
//     function handleMouseLeave() {
//       targetMouse = [0.5, 0.5];
//     }
    
//     if (enableMouseInteraction) {
//       container.addEventListener("mousemove", handleMouseMove);
//       container.addEventListener("mouseleave", handleMouseLeave);
//     }

//     // Animation loop - only runs when in viewport and not paused
//     let lastFrameTime = 0;
//     const targetFps = 30; // Limit FPS to reduce resource usage
//     const frameInterval = 1000 / targetFps;
    
//     function update(timestamp: number) {
//       // Skip frames to reach target FPS
//       const elapsed = timestamp - lastFrameTime;
//       if (elapsed < frameInterval) {
//         animationFrameId.current = requestAnimationFrame(update);
//         return;
//       }
      
//       lastFrameTime = timestamp - (elapsed % frameInterval);
      
//       // Only render when visible and not paused
//       if (isInViewport && !paused) {
//         if (enableMouseInteraction) {
//           const smoothing = 0.05;
//           currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
//           currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
//           program.uniforms.uMouse.value[0] = currentMouse[0];
//           program.uniforms.uMouse.value[1] = currentMouse[1];
//         } else {
//           program.uniforms.uMouse.value[0] = 0.5;
//           program.uniforms.uMouse.value[1] = 0.5;
//         }
        
//         program.uniforms.iTime.value = timestamp * 0.001;
//         renderer.render({ scene: mesh });
//       }
      
//       animationFrameId.current = requestAnimationFrame(update);
//     }
    
//     animationFrameId.current = requestAnimationFrame(update);

//     // Cleanup
//     return () => {
//       observer.disconnect();
      
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
      
//       window.removeEventListener("resize", resize);

//       if (enableMouseInteraction) {
//         container.removeEventListener("mousemove", handleMouseMove);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//       }
      
//       if (container.contains(gl.canvas)) {
//         container.removeChild(gl.canvas);
//       }
      
//       gl.getExtension("WEBGL_lose_context")?.loseContext();
      
//       rendererRef.current = null;
//       programRef.current = null;
//       meshRef.current = null;
//     };
//   }, [color, amplitude, distance, enableMouseInteraction, width, height, quality, paused]);

//   // Update quality when it changes
//   useEffect(() => {
//     if (programRef.current) {
//       programRef.current.uniforms.uQuality.value = getQualityValue(quality);
//     }
//   }, [quality]);

//   // Handle pausing/resuming based on prop change
//   useEffect(() => {
//     if (!rendererRef.current || !meshRef.current || !programRef.current) return;
    
//     if (paused && animationFrameId.current) {
//       cancelAnimationFrame(animationFrameId.current);
//       animationFrameId.current = null;
//     } else if (!paused && !animationFrameId.current) {
//       let lastFrameTime = 0;
//       const targetFps = 30;
//       const frameInterval = 1000 / targetFps;
      
//       animationFrameId.current = requestAnimationFrame(function update(timestamp) {
//         // Skip frames to reach target FPS
//         const elapsed = timestamp - lastFrameTime;
//         if (elapsed < frameInterval) {
//           animationFrameId.current = requestAnimationFrame(update);
//           return;
//         }
        
//         lastFrameTime = timestamp - (elapsed % frameInterval);
        
//         if (rendererRef.current && programRef.current && meshRef.current && isInViewport) {
//           programRef.current.uniforms.iTime.value = timestamp * 0.001;
//           rendererRef.current.render({ scene: meshRef.current });
//         }
//         animationFrameId.current = requestAnimationFrame(update);
//       });
//     }
//   }, [paused, isInViewport]);

//   return <div ref={containerRef} style={{ width, height }} {...rest} />;
// }

// export default Threads;
import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  width?: number | string;
  height?: number | string;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
  return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
  float split_offset = (perc * 0.4);
  float split_point = 0.1 + split_offset;

  float amplitude_normal = smoothstep(split_point, 0.7, st.x);
  float amplitude_strength = 0.5;
  float finalAmplitude = amplitude_normal * amplitude_strength
                         * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

  float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
  float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

  float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;

  float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
    line_strength *= (1.0 - lineFn(
      uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
      p,
      (PI * 1.0) * p,
      uMouse,
      iTime,
      uAmplitude,
      uDistance
    ));
  }

  float colorVal = 1.0 - line_strength;
  fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const Threads: React.FC<ThreadsProps> = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  width = 800,
  height = 300,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      // Get actual pixel dimensions
      let canvasWidth: number;
      let canvasHeight: number;
      
      if (typeof width === 'string' && width.includes('vw')) {
        // Handle viewport width
        const percentage = parseFloat(width) / 100;
        canvasWidth = window.innerWidth * percentage;
      } else {
        canvasWidth = typeof width === 'number' ? width : parseInt(width as string, 10);
      }
      
      if (typeof height === 'string' && height.includes('vh')) {
        // Handle viewport height
        const percentage = parseFloat(height) / 100;
        canvasHeight = window.innerHeight * percentage;
      } else {
        canvasHeight = typeof height === 'number' ? height : parseInt(height as string, 10);
      }
      
      renderer.setSize(canvasWidth, canvasHeight);
      program.uniforms.iResolution.value.r = canvasWidth;
      program.uniforms.iResolution.value.g = canvasHeight;
      program.uniforms.iResolution.value.b = canvasWidth / canvasHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse = [x, y];
    }
    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }
    if (enableMouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    function update(t: number) {
        if (enableMouseInteraction) {
          const smoothing = 0.05;
          currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
          currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
          program.uniforms.uMouse.value[0] = currentMouse[0];
          program.uniforms.uMouse.value[1] = currentMouse[1];
        } else {
          program.uniforms.uMouse.value[0] = 0.5;
          program.uniforms.uMouse.value[1] = 0.5;
        }
      program.uniforms.iTime.value = t * 0.001;
        
        renderer.render({ scene: mesh });
      animationFrameId.current = requestAnimationFrame(update);
    }
    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", resize);

      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden" 
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
      {...rest} 
    />
  );
};

export default Threads;