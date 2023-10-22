import * as THREE from "three";

export class GraphBarComponent {
    mesh: THREE.Mesh;
    geometry: THREE.BufferGeometry;
    material: THREE.MeshBasicMaterial;
    

    constructor(params) {
        this.geometry = new THREE.BoxGeometry(params.width, params.height);
        this.material = new THREE.MeshBasicMaterial({ color: params.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = params.x;
        this.mesh.position.y = params.y;
    }
}