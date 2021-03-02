var THREE = require('three') //正确
import * as d3 from 'd3-geo';
var OrbitControls = require('three-orbit-controls')(THREE)

export default class ThreeMap {
    constructor(set) {
        this.mapData = set;
        this.init();
    }

    init() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.render();
        this.setHelper();
        this.drawMap();
        //this.drawCSMap();
        //this.drawPolygon();
        //this.drawMultiPolygon();
        //this.drawLines();
        this.setControl();

        document.body.addEventListener('click', this.mouseEvent.bind(this));
    }

    //初始化渲染场景
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    //初始化相机
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000);
        //向上的一个坐标系
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.position.set(100, 100, 100);
        this.camera.lookAt(0, 0, 0)
    }

    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
    }


    //渲染
    render() {
        this.animate()
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    setHelper() {
            //红色x,绿色y,蓝色z
            const axesHelper = new THREE.AxisHelper(5);
            this.scene.add(axesHelper);
        }
        //绘制多边形
        // drawPolygon() {
        //         console.log(this.mapData);
        //         this.vector3Json = [];
        //         this.mapData.features.forEach(element => {
        //             const areas = element.geometry.coordinates;
        //             const areaData = { coordinates: [] };
        //             areas.forEach(a => {
        //                 a.forEach(point => {
        //                     console.log(point);
        //                     areaData.coordinates.push(this.lnglatToVector(point))
        //                 })
        //                 this.vector3Json.push(areaData);
        //             })
        //         });
        //         //console.log('vector3json', this.vector3Json)
        //         //绘制模块
        //         const group = new THREE.Group();
        //         this.vector3Json.forEach(v => {
        //             const mesh = this.getAreaMesh(v.coordinates);
        //             group.add(mesh);

    //         })
    //         this.scene.add(group);
    //     }
    //     //绘制多多边形
    // drawMultiPolygon() {
    //     //console.log(this.mapData);
    //     this.vector3Json = [];
    //     this.mapData.features.forEach(element => {
    //         const areas = element.geometry.coordinates;
    //         areas.forEach(a => {
    //             const areaData = { coordinates: [] };
    //             a.forEach((point, index) => {
    //                 if (point[0] instanceof Array) {
    //                     areaData.coordinates[index] = [];
    //                     point.forEach(pointInner => {
    //                         //console.log(pointInner);
    //                         areaData.coordinates[index].push(this.lnglatToVector(pointInner))
    //                     })
    //                 }
    //                 this.vector3Json.push(areaData);
    //             })
    //         })
    //     });
    //     //console.log('vector3json', this.vector3Json)
    //     //绘制模块
    //     const group = new THREE.Group();
    //     this.vector3Json.forEach(data => {
    //         data.coordinates.forEach(area => {
    //             const mesh = this.getAreaMesh(area);
    //             group.add(mesh);
    //         })
    //     });
    //     this.scene.add(group);
    // }

    // //获取多线条
    // drawLines() {
    //     //console.log(this.mapData);
    //     this.vector3Json = [];
    //     this.mapData.features.forEach(element => {
    //         const areas = element.geometry.coordinates;
    //         const areaData = { coordinates: [] };
    //         areas.forEach(point => {
    //             areaData.coordinates.push(this.lnglatToVector(point));
    //             this.vector3Json.push(areaData);
    //         })



    //     });
    //     //console.log('vector3json', this.vector3Json)
    //     //绘制模块
    //     const group = new THREE.Group();
    //     this.vector3Json.forEach(area => {
    //         const mesh = this.drawLine(area.coordinates);
    //         group.add(mesh);
    //     });
    //     this.scene.add(group);
    // }

    //绘制线条
    drawLine(points) {
        const material = new THREE.LineBasicMaterial({
            color: '#ccc',
            transparent: true,
            opacity: 0.8,
        });
        const geometry = new THREE.Geometry();
        points.forEach(d => {
            const [x, y, z] = d;
            geometry.vertices.push(new THREE.Vector3(x, y, z));
        })

        const line = new THREE.Line(geometry, material);
        return line;

    }

    drawMap() {
        //console.log(this.mapData)
        //console.log(this.mapData);
        this.vector3Json = [];
        this.mapData.features.forEach(element => {
            const areas = element.geometry.coordinates[0];
            //es6解构 ...data
            //var a = { name: '张三', age: 25 }  var b = {job: 'web前端',...a}
            // 相当于 var c = {job: 'web前端',name: '张三',age: 25}
            const areaData = {...element.properties, coordinates: [] };
            //通过循环，区分坐标或数组
            areas.forEach((area, i) => {
                //如果是数组
                if (area[0] instanceof Array) {
                    areaData.coordinates[i] = [];
                    area.forEach(areaInner => {
                        //console.log(pointInner);
                        areaData.coordinates[i].push(this.lnglatToVector(areaInner))
                    })
                } else {
                    areaData.coordinates.push(this.lnglatToVector(area))
                }
            })
            this.vector3Json[element.properties.name] = areaData;
            this.vector3Json.push(areaData);
        });
        //console.log('vector3json', this.vector3Json)
        //绘制模块
        const group = new THREE.Group();
        const lineGroup = new THREE.Line();
        this.vector3Json.forEach(provinces => {
            //var a=[[1,2,3],[4,5,6]]
            //访问：a[0][0]=1,a[1][2]=6 （起始值0）
            if (provinces.coordinates[0][0] instanceof Array) {
                provinces.coordinates.forEach(area => {
                    const mesh = this.getAreaMesh(area);
                    group.add(mesh);
                    const line = this.drawLine(area);
                    lineGroup.add(line);
                })
            } else { //单面
                //console.log(provinces.coordinates)
                const mesh = this.getAreaMesh(provinces.coordinates);
                group.add(mesh);
                const line = this.drawLine(provinces.coordinates);
                lineGroup.add(line);
            }
        });
        this.group = group;
        group.rotation.y = Math.PI;
        lineGroup.rotation.y = Math.PI;
        this.scene.add(group);
        this.scene.add(lineGroup);
    }

    // drawCSMap() {
    //     //console.log(this.mapData)
    //     //console.log(this.mapData);
    //     this.vector3Json = [];
    //     this.mapData.features.forEach(element => {
    //         const areas = element.geometry.coordinates[0];
    //         //es6解构 ...data
    //         //var a = { name: '张三', age: 25 }  var b = {job: 'web前端',...a}
    //         // 相当于 var c = {job: 'web前端',name: '张三',age: 25}
    //         const areaData = {...element.properties, coordinates: [] };
    //         //通过循环，区分坐标或数组
    //         areas.forEach((area, i) => {
    //             //如果是数组
    //             if (area[0] instanceof Array) {
    //                 areaData.coordinates[i] = [];
    //                 area.forEach(areaInner => {
    //                     //console.log(pointInner);
    //                     areaData.coordinates[i].push(this.lnglatToVector(areaInner))
    //                 })
    //             } else {
    //                 areaData.coordinates.push(this.lnglatToVector(area))
    //             }
    //         })
    //         this.vector3Json.push(areaData);
    //     });
    //     //console.log('vector3json', this.vector3Json)
    //     //绘制模块
    //     const group = new THREE.Group();
    //     const lineGroup = new THREE.Line();
    //     this.vector3Json.forEach(provinces => {
    //         //var a=[[1,2,3],[4,5,6]]
    //         //访问：a[0][0]=1,a[1][2]=6 （起始值0）
    //         if (provinces.coordinates[0][0] instanceof Array) {
    //             provinces.coordinates.forEach(area => {
    //                 const mesh = this.getAreaMesh(area);
    //                 const line = this.drawLine(area);
    //                 group.add(mesh);
    //                 lineGroup.add(line);
    //             })
    //         } else { //单面
    //             //console.log(provinces.coordinates)
    //             const mesh = this.getAreaMesh(provinces.coordinates);
    //             group.add(mesh);
    //             const line = this.drawLine(provinces.coordinates);
    //             lineGroup.add(line);
    //         }
    //     });
    //     this.scene.add(group);
    //     this.scene.add(lineGroup);
    // }

    //绘制网格
    getAreaMesh(points) {
        //console.log('---' + points);
        const shape = new THREE.Shape(); //实例一个形状

        //const [x0, y0] = points[0];
        points.forEach((p, i) => {
                //console.log(p);
                const [x, y] = p;
                if (i === 0) {
                    shape.moveTo(x, y);
                } else if (i === points.length - 1) {
                    shape.quadraticCurveTo(x, y, x, y) //二次曲线
                } else {
                    shape.lineTo(x, y, x, y);
                }
            })
            //几何体
        const geometry = new THREE.ExtrudeGeometry(
            shape, { depth: 2, bevelEnabled: false } //启用斜角
        );
        //材质
        const material = new THREE.MeshBasicMaterial({
            color: '#007cff',
            transparent: true,
            opacity: 0.5,
        });

        //合并成一个网格模型

        const mesh = new THREE.Mesh(geometry, material)
        return mesh;
    }

    //经纬度转三维坐标
    lnglatToVector(lnglat) {
        if (!this.projection) {
            this.projection = d3
                .geoMercator() //获取墨卡托坐标方法
                .center([112.946332, 28.236672])
                .scale(60)
                //.rotate(Math.PI / 4)
                .translate([0, 0]);
        }
        //const projection = d3.geoMercator().center([108.904496, 32.668849]).scale(80);
        const [y, x] = this.projection([...lnglat]);
        let z = 0;
        return [y, x, z];
    }

    setControl() {
        this.controls = new OrbitControls(this.camera);
        this.controls.update();
    }

    mouseEvent(event) {
        if (!this.raycaster)
            this.raycaster = new THREE.Raycaster();
        if (!this.mouse)
            this.mouse = new THREE.Vector2();

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // 计算物体和射线的焦点
        const intersects = this.raycaster.intersectObjects(this.group.children);
        this.group.children.forEach(mesh => {
            mesh.material.color.set('#005fc3');
        })
        for (var i = 0; i < intersects.length; i++) {
            intersects[i].object.material.color.set(0xff0000);
        }


    }
}