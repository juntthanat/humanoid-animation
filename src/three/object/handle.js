import "../three"

export function createHandle(){
    var geometry = new THREE.SphereGeometry(0.6,20,20);
    var material = new THREE.MeshStandardMaterial();

    var handle = new THREE.Mesh(geometry, material);
    handle.translateY(1);
    return handle;
}