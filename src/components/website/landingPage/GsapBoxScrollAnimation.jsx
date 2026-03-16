"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(Flip, ScrollTrigger);

const styles = `
  .gsap-box-scroll-wrapper {
    --box-border: #555;
    --grid-line: #666;
    background: #0a0a0a;
    color: #fff;
  }
  .gsap-box-scroll-wrapper .spacer {
    width: 100%;
    height: 2vh;
    display: grid;
    place-items: center;
    font-weight: 600;
    letter-spacing: 0.02em;
    opacity: 0.85;
    color: rgba(255, 255, 255, 0.9);
  }
  .gsap-box-scroll-wrapper .main {
    position: relative;
    height: 200vh;
  }
  .gsap-box-scroll-wrapper .container {
    position: absolute;
    width: min(240px, 24vw);
    height: min(240px, 24vw);
    display: grid;
    place-items: center;
    border: 2px dashed var(--box-border);
    border-radius: 12px;
  }
  .gsap-box-scroll-wrapper .initial {
    left: 55%;
    top: 10%;
  }
  .gsap-box-scroll-wrapper .container.second {
    left: 10%;
    top: 50%;
    width: min(240px, 24vw);
    height: min(240px, 24vw);
  }
  .gsap-box-scroll-wrapper .second .marker {
    width: min(240px, 24vw);
    height: min(240px, 24vw);
  }
  .gsap-box-scroll-wrapper .third {
    right: 10%;
    bottom: 3rem;
    width: min(240px, 24vw);
    height: min(240px, 24vw);
  }
  .gsap-box-scroll-wrapper .marker {
    width: min(240px, 24vw);
    height: min(240px, 24vw);
    border-radius: 10px;
    outline: 1px dashed var(--grid-line);
    outline-offset: -6px;
    opacity: 0.6;
  }
  .gsap-box-scroll-wrapper canvas.box {
    width: min(240px, 24vw);
    height: min(240px, 24vw);
    border: dashed 1px rgba(210, 206, 255, 0.5);
    display: block;
    border-radius: 10px;
    background: transparent;
    z-index: 2;
  }
`;

function makeGradientNoiseTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");

  g.fillStyle = (() => {
    const grd = g.createLinearGradient(0, 0, 230, 384);
    grd.addColorStop(0, "#fec5fb");
    grd.addColorStop(1, "#00bae2");
    return grd;
  })();
  g.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 4000; i++) {
    const x = Math.floor(gsap.utils.random(0, 256));
    const y = Math.floor(gsap.utils.random(0, 256));
    const a = gsap.utils.random(0.02, 0.1);
    g.fillStyle = `rgba(0,0,0,${a})`;
    g.fillRect(x, y, 3, 3);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export default function GsapBoxScrollAnimation() {
  const wrapperRef = useRef(null);
  const initialContainerRef = useRef(null);
  const stateRef = useRef({
    ctx: null,
    renderer: null,
    scene: null,
    camera: null,
    mesh: null,
    canvasEl: null,
  });

  useEffect(() => {
    const state = stateRef.current;

    function initThree(canvas) {
      state.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      state.renderer.outputColorSpace = THREE.SRGBColorSpace;

      state.scene = new THREE.Scene();
      state.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      state.camera.position.set(0, 0, 3);

      const mat = new THREE.MeshBasicMaterial({
        map: makeGradientNoiseTexture(),
      });
      state.mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        mat
      );
      state.scene.add(state.mesh);

      gsap.ticker.add(render);
      onResize();

      buildTimeline();
    }

    function render() {
      if (!state.renderer) return;
      state.renderer.render(state.scene, state.camera);
    }

    function onResize() {
      if (!state.renderer || !state.canvasEl) return;
      const r = state.canvasEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.renderer.setPixelRatio(1);
      state.renderer.setSize(
        Math.max(1, r.width * dpr),
        Math.max(1, r.height * dpr),
        false
      );
      state.camera.aspect = (r.width || 1) / (r.height || 1);
      state.camera.updateProjectionMatrix();
    }

    function buildTimeline() {
      if (!wrapperRef.current || !state.canvasEl) return;
      state.ctx && state.ctx.revert();
      state.ctx = gsap.context(() => {
        const marker2 = wrapperRef.current.querySelector(".second .marker");
        const marker3 = wrapperRef.current.querySelector(".third .marker");
        if (!marker2 || !marker3) return;
        const s2 = Flip.getState(marker2);
        const s3 = Flip.getState(marker3);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.15,
          },
        });

        tl.add(
          Flip.fit(state.canvasEl, s2, { duration: 1, ease: "none" }),
          0
        )
          .to(
            state.mesh.rotation,
            {
              x: `+=${Math.PI}`,
              y: `+=${Math.PI}`,
              duration: 1,
              ease: "none",
            },
            "<"
          )
          .addLabel("mid", "+=0.05")
          .add(
            Flip.fit(state.canvasEl, s3, { duration: 1, ease: "none" }),
            "mid"
          )
          .to(
            state.mesh.rotation,
            {
              x: `+=${Math.PI}`,
              y: `+=${Math.PI}`,
              duration: 1,
              ease: "none",
            },
            "<"
          );
      }, wrapperRef.current);
    }

    function build() {
      state.ctx && state.ctx.revert();
      const start = initialContainerRef.current;
      if (!start) return;
      if (!state.canvasEl) {
        state.canvasEl = document.createElement("canvas");
        state.canvasEl.className = "box";
        start.appendChild(state.canvasEl);
        initThree(state.canvasEl);
      } else {
        buildTimeline();
      }
    }

    build();

    const handleResize = () => {
      onResize();
      buildTimeline();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      state.ctx && state.ctx.revert();
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="gsap-box-scroll-wrapper" ref={wrapperRef}>
        <div className="spacer">scroll down</div>

        <div className="main">
          <div className="container initial" ref={initialContainerRef}>
            {/* canvas.box is injected here by JS */}
          </div>

          <div className="container second">
            <div className="marker" />
          </div>

          <div className="container third">
            <div className="marker" />
          </div>
        </div>

        <div className="spacer final">end</div>
      </div>
    </>
  );
}
