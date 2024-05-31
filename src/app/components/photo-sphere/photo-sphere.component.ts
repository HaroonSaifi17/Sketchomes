import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  private sphere!: THREE.Mesh;

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  private init(): void {
    const width = window.innerWidth;
    const height = (window.innerWidth / 3) * 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
    });
    this.renderer.setSize(width, height, true);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 3 / 2, 0.1, 1000);
    this.camera.position.z = 0.01;

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableRotate = true;
    controls.enablePan = false;

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
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
      },
    );

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = (window.innerWidth / 3) * 2;
    this.camera.aspect = 3 / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, true);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.sphere) {
      this.sphere.rotation.y += 0.002;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
