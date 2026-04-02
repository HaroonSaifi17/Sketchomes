import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-photo-sphere',
  standalone: true,
  imports: [],
  templateUrl: './photo-sphere.component.html',
  styleUrls: ['./photo-sphere.component.css'],
})
export class PhotoSphereComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private sphere?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  private sphereGeometry?: THREE.SphereGeometry;
  private sphereMaterial?: THREE.MeshBasicMaterial;
  private panoramaTexture?: THREE.Texture;
  private animationFrameId?: number;

  private readonly boundOnPointerDown = this.onPointerDown.bind(this);
  private readonly boundOnPointerMove = this.onPointerMove.bind(this);
  private readonly boundOnPointerUp = this.onPointerUp.bind(this);
  private readonly boundOnWindowResize = this.onWindowResize.bind(this);

  isUserInteracting = false;
  onPointerDownMouseX = 0;
  onPointerDownMouseY = 0;
  lon = 0;
  onPointerDownLon = 0;
  lat = 0;
  onPointerDownLat = 0;
  phi = 0;
  theta = 0;

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.boundOnWindowResize);
    this.canvas.nativeElement.removeEventListener('pointerdown', this.boundOnPointerDown);
    document.removeEventListener('pointermove', this.boundOnPointerMove);
    document.removeEventListener('pointerup', this.boundOnPointerUp);

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.sphere) {
      this.scene.remove(this.sphere);
    }

    this.sphereGeometry?.dispose();
    this.sphereMaterial?.dispose();
    this.panoramaTexture?.dispose();
    this.renderer?.dispose();
  }

  private getCanvasSize() {
    const maxWidth = Math.min(window.innerWidth, 1536);
    const parentWidth = this.canvas.nativeElement.parentElement?.clientWidth ?? maxWidth;
    const width = Math.floor(Math.min(parentWidth, maxWidth));
    const aspectRatio = window.innerWidth < 768 ? 4 / 3 : 16 / 9;
    const height = width / aspectRatio;

    return { width, height };
  }

  private init(): void {
    const { width, height } = this.getCanvasSize();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, true);
    this.renderer.setViewport(0, 0, width, height);
    this.renderer.setClearColor(0x000000, 0);
    this.canvas.nativeElement.style.touchAction = 'none';
    this.canvas.nativeElement.addEventListener('pointerdown', this.boundOnPointerDown);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(72, width / height, 0.1, 1000);
    this.camera.position.z = 0;

    new THREE.ImageLoader().load('/assets/images/render.webp', (image) => {
      const processedCanvas = this.processPanorama(image);
      const texture = new THREE.CanvasTexture(processedCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(2, this.renderer.capabilities.getMaxAnisotropy());
      texture.generateMipmaps = true;
      texture.needsUpdate = true;

      this.panoramaTexture = texture;
      this.sphereGeometry = new THREE.SphereGeometry(100, 96, 64);
      this.sphereMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: texture,
        color: new THREE.Color(0xf4efe8),
      });

      this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
      this.scene.add(this.sphere);
    });

    window.addEventListener('resize', this.boundOnWindowResize);
  }

  private onWindowResize(): void {
    const { width, height } = this.getCanvasSize();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, true);
    this.renderer.setViewport(0, 0, width, height);
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.isUserInteracting === false) {
      this.lon += 0.045;
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
    if (event.button !== 0 && event.pointerType !== 'touch') return;

    this.isUserInteracting = true;

    this.onPointerDownMouseX = event.clientX;
    this.onPointerDownMouseY = event.clientY;

    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;

    document.addEventListener('pointermove', this.boundOnPointerMove);
    document.addEventListener('pointerup', this.boundOnPointerUp);
  }

  private onPointerMove(event: PointerEvent) {
    if (!this.isUserInteracting) return;

    this.lon = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
    this.lat = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
  }

  private onPointerUp(event: PointerEvent) {
    if (!this.isUserInteracting) return;

    this.isUserInteracting = false;

    document.removeEventListener('pointermove', this.boundOnPointerMove);
    document.removeEventListener('pointerup', this.boundOnPointerUp);
  }

  private processPanorama(image: CanvasImageSource) {
    const sourceWidth =
      (image as HTMLImageElement).naturalWidth || (image as HTMLImageElement).width || 4096;
    const targetWidth = Math.min(4096, sourceWidth);
    const targetHeight = Math.round(targetWidth / 2);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.filter = 'brightness(1.05) contrast(0.88) saturate(0.92)';
      context.drawImage(image, 0, 0, targetWidth, targetHeight);
    }

    return canvas;
  }
}
