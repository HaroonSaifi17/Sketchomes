import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-photo-sphere',
  standalone: true,
  imports: [],
  templateUrl: './photo-sphere.component.html',
  styleUrls: ['./photo-sphere.component.css'],
})
export class PhotoSphereComponent implements AfterViewInit {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;

  isUserInteracting = false;
  onPointerDownMouseX = 0;
  onPointerDownMouseY = 0;
  lon = 0;
  onPointerDownLon = 0;
  lat = 0;
  onPointerDownLat = 0;
  phi = 0;
  theta = 0;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, 3 / 2, 1, 1100);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
  }

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  init(): void {
    const container = document.getElementById('container');
    if (!container) return;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerWidth / 1.5);
    container.appendChild(this.renderer.domElement);

    container.style.touchAction = 'none';
    container.addEventListener('pointerdown', this.onPointerDown.bind(this));

    window.addEventListener('resize', this.onWindowResize.bind(this));
    const texture = new THREE.TextureLoader().load('/assets/images/render.jpg');
    texture.minFilter = THREE.LinearFilter; // Set texture filtering for better quality
    texture.magFilter = THREE.LinearFilter;

    const material = new THREE.MeshBasicMaterial({ map: texture });

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  onWindowResize() {
    this.camera.aspect = 3 / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerWidth / 1.5);
  }

  onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return; // Check for left mouse button

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

  animate() {
    requestAnimationFrame(() => this.animate());
    this.update();
  }

  update() {
    if (this.isUserInteracting === false) {
      this.lon += 0.1;
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
}
