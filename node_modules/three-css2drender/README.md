## three-css2drender

threejs offical apply CSS2DRender.js with npm

## install

`npm i --save three-css2drender`

## usage

```js

import * as THREE from 'three'
import {CSS2DRenderer, CSS2DObject} from 'three-css2drender'


let scene = new THREE.Scene()

// init CSS2DRenderer
labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.getElementById( 'container' ).appendChild( labelRenderer.domElement );

// add label object
var text = document.createElement( 'div' );
text.className = 'label';
text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
text.textContent = atom[ 4 ] + 'Test';

var label = new CSS2DObject( text );
label.position.copy( object.position );
object.add( label );

...

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function animate() {

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  labelRenderer.render( scene, camera );

}

```