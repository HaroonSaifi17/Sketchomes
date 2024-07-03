import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-photo-sphere',
  standalone: true,
  imports: [],
  templateUrl: './photo-sphere.component.html',
  styleUrls: ['./photo-sphere.component.css'],
})
export class PhotoSphereComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;

  isUserInteracting = false;
  onPointerDownMouseX = 0;
  onPointerDownMouseY = 0;
  lon = 0;
  onPointerDownLon = 0;
  lat = 0;
  onPointerDownLat = 0;
  phi = 0;
  theta = 0;

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  private init(): void {
    const width = Math.min(window.innerWidth,1536);
    const height = (width / 3) * 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height, true);
    this.canvas.nativeElement.style.touchAction = 'none';
    this.canvas.nativeElement.addEventListener(
      'pointerdown',
      this.onPointerDown.bind(this),
    );

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 3 / 2, 0.1, 1000);
    this.camera.position.z = 0;

    const texture = new THREE.TextureLoader().load(
      '/assets/images/render.jpg',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        const geometry = new THREE.SphereGeometry(100, 100, 40);
        const material = new THREE.MeshBasicMaterial({
          side: THREE.BackSide,
          map: texture,
        });
        const sphere = new THREE.Mesh(geometry, material);
        this.scene.add(sphere);
      },
    );

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    const width = Math.min(window.innerWidth,1536);
    const height = (width / 3) * 2;
    this.camera.aspect = 3 / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, true);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.isUserInteracting === false) {
      this.lon += 0.07;
    }

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(x, y, z);

    this.renderer.render(this.scene, this.camera);
  }

  onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;

    this.isUserInteracting = true;

    this.onPointerDownMouseX = event.clientX;
    this.onPointerDownMouseY = event.clientY;

    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;

    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isUserInteracting) return;

    this.lon =
      (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
    this.lat =
      (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
  }

  onPointerUp(event: PointerEvent) {
    if (!this.isUserInteracting) return;

    this.isUserInteracting = false;

    document.removeEventListener('pointermove', this.onPointerMove.bind(this));
    document.removeEventListener('pointerup', this.onPointerUp.bind(this));
  }
}
