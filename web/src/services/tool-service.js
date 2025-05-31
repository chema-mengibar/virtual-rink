
// import AppRouter from '../router/router';
import { reactive } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Games from './tool/Games'


export default class ToolService {

    scene = new THREE.Scene();
    loader = new GLTFLoader();

    camera = null
    renderer = null

    cameraTop = null
    rendererTop = null

    flow = {
        gameCursor: 0,
        crono: 5,
        cronoLimit: 5
    }

    constructor() {
        this._data = reactive({
            state: '', // loading, loaded

        })
    }


    get players() {
        return Games[this.flow.gameCursor].players
    }


    flow_prepare() {

        const _ = this;

        //A
        const camConfig = {
            fov: 75,
            aspect: window.innerWidth / window.innerHeight,
            aspect: 1.5,
            near: 0.1,
            far: 1000.0
        };

        this.camera = this.cameraBuilder(camConfig);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('main-frame').appendChild(this.renderer.domElement);
        this.scene.add(this.camera);
        this.scene.background = new THREE.Color(0xdddddd);

        this.scene.fog = new THREE.FogExp2(0xffffff, 0.015);
       // this.renderer.setClearColor(0xffffff, 1);

        //this.renderer.shadowMap.enabled = true;
        //this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //this.renderer.outputEncoding = THREE.sRGBEncoding;
       

        const controlsMain = new OrbitControls(this.camera, this.renderer.domElement);
        controlsMain.object.position.set(4, 1, 0);
        controlsMain.target = new THREE.Vector3(-6, 0, -6);
        // controlsMain.enableDamping = true;
        // controlsMain.dampingFactor = 0.05;
        // controlsMain.minDistance = 5;
        // controlsMain.maxDistance = 50;

        //B
        const camConfigTop = {
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000.0
        };
        this.cameraTop = this.cameraBuilder(camConfigTop);
        this.rendererTop = new THREE.WebGLRenderer();
        this.rendererTop.setSize(200, 160);
        this.rendererTop.setClearColor(0xffffff, 1);
        document.getElementById('mini').appendChild(this.rendererTop.domElement);
        this.scene.add(this.cameraTop);

        const controls = new OrbitControls(this.cameraTop, this.rendererTop.domElement);
        controls.object.position.set(4, 1, 0);
        controls.target = new THREE.Vector3(-6, 0, -6);

        this.cameraTop.position.set(0, 25, 50);
        const pt = new THREE.Vector3(0, 0, 0)
        this.cameraTop.lookAt(pt);

        // Bind
        this.flow_animate = this.flow_animate.bind(this)
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this)

        // Load
        this.loader.load('rink.glb', function (gltf) {
            _.flow_init_scene()
            _.scene.add(gltf.scene);
            _.step_set_assets()
            // _.display()
        }, undefined, function (error) {
            console.error('>>>>>>>>', error);
        });
    }


    flow_init_scene() {
        const _ = this;
        setTimeout(() => {
            this.addLight();
            // this.addGrid();
            _.renderer.render(_.scene, _.camera);
            this.flow_animate();
            document.addEventListener('keydown', this.onDocumentKeyDown, false);
        }, 0)
    }


    flow_animate() {

        this.scene.traverse((child) => {
            if (child.isMesh && child.geometry?.type === 'PlaneGeometry') {
                child.lookAt(this.camera.position);
            }
        });

        requestAnimationFrame(this.flow_animate)
        this.rendererTop.render(this.scene, this.cameraTop);
        this.renderer.render(this.scene, this.camera)
    }


    step_set_assets() {
        const _ = this;

        const imagesList = [1, 2]

        let targetCoords = null;

        // rink-floor,   rink-wall, rink-center, rink-goal-2, rink-goal-1
        this.scene.traverse(o => {
            console.log(o.name)
            if (o.name === 'rink-center') {
                targetCoords = {
                    x: o.position.x,
                    z: o.position.z,
                }
            }
            else if (o.name === 'rink-floor') {
                const m = new THREE.MeshStandardMaterial({ color: '#5CACFB', side: THREE.DoubleSide })
                o.material = m;
                o.receiveShadow = true;
            }
            else if (o.name === 'rink-wall') {
                const m = new THREE.MeshStandardMaterial({ color: '#999999', side: THREE.DoubleSide })
                o.children.forEach((child, idx) => {
                    child.material = m;
                    child.needsUpdate = true;
                })
            }

        });

        Object.keys(_.players).forEach(playerKey => {

            const playerData = _.players[playerKey];

            if (playerKey === 'player-h-0') {
                _.camera.position.x = playerData.x;
                _.camera.position.z = playerData.z;
                _.camera.position.y = 1;

                const geometry = new THREE.CircleGeometry(0.3, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
                const circle = new THREE.Mesh(geometry, material);
                circle.position.set(playerData.x, 0.1, playerData.z);
                circle.rotation.set(Math.PI / 2, 0, 0);

                this.scene.add(circle);

                if (targetCoords) {
                    const pt = new THREE.Vector3(targetCoords.x, 1.7, targetCoords.z)
                    _.camera.lookAt(pt);
                }
            } else {

                if (!playerKey.includes('goalie')) {


                    const index = Math.floor(Math.random() * imagesList.length);
                    const imageNum = imagesList[index];

                    const imageName = playerKey.includes('-h-') ? `h${imageNum}` : `g${imageNum}`;

                    const loaderImage = new THREE.TextureLoader();
                    loaderImage.load(`/${imageName}.png`, (texture) => {

                        texture.encoding = THREE.sRGBEncoding;

                        // const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
                        // const sprite = new THREE.Sprite(material);
                        // sprite.scale.set(2, 2, 1);
                        // sprite.position.set(
                        //     playerData.x,
                        //     1,
                        //     playerData.z);
                        // this.scene.add(sprite);

                        // const material = new THREE.MeshStandardMaterial({
                        //     map: texture,
                        //     transparent: true,
                        //     roughness: 0,
                        //     metalness: 0,
                        //     side: THREE.DoubleSide,
                        // });


                        const material = new THREE.MeshLambertMaterial({
                            map: texture,
                            transparent: true,
                            side: THREE.DoubleSide,
                        });

                        //const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });

                        const geometry = new THREE.PlaneGeometry(2, 2);
                        const plane = new THREE.Mesh(geometry, material);
                        plane.position.set(playerData.x, 0.92, playerData.z);
                        plane.lookAt(this.camera.position); // Siempre mirando a la cámara
                        plane.castShadow = false;
                        plane.receiveShadow = false;
                        this.scene.add(plane);

                    });
                } else {

                    // todo: include goalies

                }




            }


        })

    }


    step_load_game() {
        if (this.flow.gameCursor < Games.length - 1) {
            this.flow.gameCursor += 1;
        } else {
            this.flow.gameCursor = 0;
        }
        this.step_set_assets();
        // this.display();
    }


    cameraBuilder(camConfig) {
        return new THREE.PerspectiveCamera(camConfig.fov, camConfig.aspect, camConfig.near, camConfig.far);
    }

    addLight() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 20)
        light.intensity = 1.5
        light.castShadow = true;
        this.scene.add(light)


        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // sube de 0.3 a 0.6 o 0.7
        this.scene.add(ambientLight);


   

        // const dirLight = new THREE.DirectionalLight(0xffffff, 0.8); // antes 1
        // dirLight.position.set(10, 20, 10);
        // dirLight.castShadow = true;
        // dirLight.shadow.mapSize.set(1024, 1024); // más eficiente
        // dirLight.shadow.bias = -0.001; // evita "shadow acne"

    
        // // Luz direccional simulando luces del techo
        // const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight.position.set(10, 20, 10);
        // dirLight.castShadow = true;
        // dirLight.shadow.mapSize.width = 2048;
        // dirLight.shadow.mapSize.height = 2048;
        // dirLight.shadow.camera.near = 1;
        // dirLight.shadow.camera.far = 50;
        // this.scene.add(dirLight);
    
        // // // Luz puntual para dar calidez y profundidad
        // const pointLight = new THREE.PointLight(0xffeecc, 0.5, 100);
        // pointLight.position.set(0, 15, 0);
        // this.scene.add(pointLight);
    }

    addGrid() {
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
        const color = 0x4f4f4e
        const size = 45;
        const divisions = 45;
        const gridHelper = new THREE.GridHelper(size, divisions, color, color);
        this.scene.add(gridHelper);
    }

    display() {
        // const displayConatiner = document.getElementById('display');
        // displayConatiner.innerHTML = 'Scene: ' + this.flow.gameCursor;
    }


    // Actions

    onDocumentKeyDown(event) {
        if (!this.camera) { return; }

        event = event || window.event;
        const keycode = event.keyCode;

        console.log(keycode);

        switch (keycode) {
            case 97: // 1
            case 98: // 2
            case 99: // 3
            case 100: // 4
            case 101: // 5
            case 102: // 6
            case 103: // 7
            case 104: // 8
            case 105: // 9
                console.log(keycode)
                break;
            case 37:
                this.moveCam('left')
                break;
            case 39:
                this.moveCam('right')
                break;
            case 96:
                this.step_load_game();
                break;
        }
    }

    moveCam(direction = 'left') {
        const angleRot = 25;
        const radiansRot = 2 * Math.PI * (angleRot / 360);
        if (direction === 'left') {
            this.camera.rotation.y = this.camera.rotation.y + radiansRot;
        } else {
            this.camera.rotation.y = this.camera.rotation.y - radiansRot;
        }
    }


    fullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        setTimeout(() => {

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, 1000)
    }

    // Helpers

    raw(obj) {
        return JSON.parse(JSON.stringify(obj))
    }






}