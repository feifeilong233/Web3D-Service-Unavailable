// var THREE = require('three') //正确
// import ThreeMap from './ThreeMap.js';
// const Map = new ThreeMap();

import $ from 'jquery';

import axios from 'axios';
import { decrypt } from './dist/decrypt';
import ThreeMap from './ThreeMap';
import ThreeMapLightBar from './ThreeMapLightBar';

const lightBarData = [
    { name: '海南省', value: 60 },
    { name: '北京市', value: 100 },
    { name: '山东省', value: 80 },
    { name: '海南省', value: 100 },
    { name: '四川省', value: 100 },
    { name: '台湾', value: 70 },
    { name: '黑龙江省', value: 80 },
    { name: '湖北省', value: 70 },
    { name: '内蒙古自治区', value: 50 },
    { name: '西藏自治区', value: 50 },
    { name: '新疆维吾尔自治区', value: 63 },
    { name: '甘肃省', value: 63 },
    { name: '山西省', value: 83 },
    { name: '上海市', value: 73 },
    { name: '福建省', value: 63 },
    { name: '广东省', value: 53 },
    { name: '云南省', value: 43 },
    { name: '辽宁省', value: 63 },
    { name: '青海省', value: 90 }
];

// axios.get('/map/china.json').then(data => {
//     console.log(data);
// })

$.get('/map/china.json', data => {
    const mapData = decrypt.decode(data);
    //console.log(data);
    const map = new ThreeMapLightBar(decrypt.decode(data));
    map.drawLightBar(lightBarData);
    //const map2 = new ThreeMap(data);
})