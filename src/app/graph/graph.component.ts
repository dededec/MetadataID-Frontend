import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GraphBarComponent } from './graph-bar';
import { AnalysisService } from '../analysis/analysis.service';
import { HeadingData } from './heading-data.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  headingDataList: number[]

  // Canvas
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  // Scene
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;

  // Camera + Controls
  camera!: THREE.Camera;
  cameraZ: number = 5;
  cameraY: number = 5;
  cameraX: number = -5;
  frustumSize: number = 3.5;
  nearClippingPlane: number = 1;
  farClippingPlane: number = 1000;

  // Objects
  h1: GraphBarComponent;
  h2: GraphBarComponent;
  h3: GraphBarComponent;
  h4: GraphBarComponent;
  h5: GraphBarComponent;
  h6: GraphBarComponent;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() { }

  async ngAfterViewInit() {
    await this.analysisService.fetchHeadingData();
    this.createScene();
    this.startRenderingLoop();
  }

  private convertToList(headingData: HeadingData) {
    return [headingData.h1, headingData.h2, headingData.h3, headingData.h4, headingData.h5, headingData.h6];
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf2f2f2);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.OrthographicCamera(
      this.frustumSize * this.getAspectRatio() / - 2,
      this.frustumSize * this.getAspectRatio() / 2,
      this.frustumSize / 2,
      this.frustumSize / - 2,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraY;
    this.camera.position.z = this.cameraZ;
    this.camera.lookAt(this.scene.position);

    this.createHeadingGraphBars();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  normalize(val, max, min): number {
    return (val - min) / (max - min)
  }

  private getAspectRatio() {
    return 3;
  }

  private startRenderingLoop() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  }

  createHeadingGraphBars() {
    this.headingDataList = this.convertToList(this.analysisService.headingData);

    let headingDataListNormalized = this.headingDataList;
    if(Math.max(...this.headingDataList) != 0) {
      headingDataListNormalized = this.headingDataList.map(head => this.normalize(head, Math.max(...this.headingDataList), Math.min(...this.headingDataList)) * 2);
    }

    this.h1 = new GraphBarComponent({ x: -2.5, y: headingDataListNormalized[0] / 2, width: 1, height: headingDataListNormalized[0], color: THREE.Color.NAMES.red });
    this.h2 = new GraphBarComponent({ x: -1.5, y: headingDataListNormalized[1] / 2, width: 1, height: headingDataListNormalized[1], color: THREE.Color.NAMES.orangered });
    this.h3 = new GraphBarComponent({ x: -0.5, y: headingDataListNormalized[2] / 2, width: 1, height: headingDataListNormalized[2], color: THREE.Color.NAMES.orange });
    this.h4 = new GraphBarComponent({ x: 0.5, y: headingDataListNormalized[3] / 2, width: 1, height: headingDataListNormalized[3], color: THREE.Color.NAMES.yellow });
    this.h5 = new GraphBarComponent({ x: 1.5, y: headingDataListNormalized[4] / 2, width: 1, height: headingDataListNormalized[4], color: THREE.Color.NAMES.greenyellow });
    this.h6 = new GraphBarComponent({ x: 2.5, y: headingDataListNormalized[5] / 2, width: 1, height: headingDataListNormalized[5], color: THREE.Color.NAMES.yellowgreen });

    this.scene.add(this.h1.mesh);
    this.scene.add(this.h2.mesh);
    this.scene.add(this.h3.mesh);
    this.scene.add(this.h4.mesh);
    this.scene.add(this.h5.mesh);
    this.scene.add(this.h6.mesh);
  }
}
