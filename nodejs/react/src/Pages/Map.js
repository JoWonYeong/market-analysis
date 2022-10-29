import gu from '../data/suseonggu.json'
import dong from '../data/dong.json'
import React, { useState, useEffect } from 'react';
import MyModal from '../Components/MyModal'
import insideAlgorithm from '../function/insideAlgorithm';
const { kakao } = window;

export default function Map() {
    let [open, setOpen] = useState(false);
    let [dong, setDong] = useState('');

    useEffect(() => {
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(35.836042613869544, 128.6582783008829),
            level: 7
        };
        const map = new kakao.maps.Map(container, options);

        KakaoMapScript(map, setOpen, setDong);
    }, []);

    return (
        <>
            <div className="map_wrap">
                <div id="myMap" style={{
                    width: '90%',
                    height: '90vh'
                }}></div>
            </div>
            <MyModal
                show={open}
                onHide={() => setOpen(false)}
                dong={dong} />
        </>
    );
}

function KakaoMapScript(map, setOpen, setDong) {
    var customOverlay1 = new kakao.maps.CustomOverlay({});  // 마우스 따라다니는 오버레이1

    var coleredPolygonArr = []; // [[행정동명, 색칠여부(0/1), 폴리곤객체], ...]
    var overlay;   // 현재 열려있는 오버레이2 객체

    var areas = []; // [[행정동명, [폴리곤 좌표...]], ...]
    putArea(areas);


    // 지도에 영역데이터를 폴리곤으로 표시
    for (var i = 0, len = areas.length; i < len; i++) {
        displayArea(areas[i]);
    }

    // 행정동별 폴리곤을 생상하고 이벤트를 등록하는 함수입니다
    function displayArea(area) {

        // 행정동 폴리곤 생성
        var polygon = new kakao.maps.Polygon({
            map: map,
            path: area.path,
            strokeWeight: 2,
            strokeColor: '#004c80',
            strokeOpacity: 0.6,
            fillColor: '#fff',
            fillOpacity: 0.4
        });

        // 행정동별로 폴리곤 객체 배열에 등록
        coleredPolygonArr.push([area.name, 0, polygon]);

        // mouseover : 마우스를 올린 해당 행정동명 표시하는 오버레이1 표시
        kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
            customOverlay1.setContent('<div class="overlay1">' + area.name + '</div>');
            customOverlay1.setPosition(mouseEvent.latLng);
            customOverlay1.setMap(map);
        });

        // mousemove : 마우스 따라 움직이면서 오버레이1 위치 변경
        kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
            customOverlay1.setPosition(mouseEvent.latLng);
        });

        // mouseout : 해당 폴리곤에서 나오면 오버레이1 제거
        kakao.maps.event.addListener(polygon, 'mouseout', function () {
            customOverlay1.setMap(null);
        });


        // click : 현재 보이는 오버레이2 닫고 클릭한 곳의 새로운 오버레이2 띄움 + 파란색 채우기
        //         클릭한 곳이 수성구 외부이면 오버레이2 닫고 파란색 제거
        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {

            // 클릭한 곳 폴리곤 파란색 채우기 & 원래있던 곳 파란색 제거
            coleredPolygonArr.forEach((a, i) => {
                if (a[1] == 1) {
                    a[1] = 0;
                    a[2].setOptions({ fillColor: '#fff' });
                }
                if (a[0] === area.name) {
                    a[1] = 1;
                    a[2].setOptions({ fillColor: '#09f' });
                }
            })

            // 클릭하면 뜨는 오버레이
            var content = '<div class="overlay2"><span class="center">클릭하면 뜨는 오버레이</span><div class="detail">자세히보기</div><div class="close">X</div></div>';

            var customOverlay2 = new kakao.maps.CustomOverlay({
                content: content,
                map: map,
                position: mouseEvent.latLng,
                xAnchor: 0.5,
                yAnchor: 1
            });

            // 기존 오버레이 있으면 닫히게
            if (overlay) {
                overlay.setMap(null);
                overlay = customOverlay2;
            }
            else if (!overlay) {
                overlay = customOverlay2;
            }
            overlay.setMap(map);

            // 오버레이 X 클릭하면 닫히게
            document.querySelector('.close').addEventListener('click', function () {
                overlay.setMap(null);
            });

            // 오버레이 자세히 클릭하면 모달창 뜨게
            document.querySelector('.detail').addEventListener('click', function () {
                setOpen(true);
                setDong(area.name);
            });
        });


        // 수성구 폴리곤 바깥 클릭하면 색깔, 오버레이 원래대로
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            if (!inside(mouseEvent, map, overlay)) {
                overlay.setMap(null);
                coleredPolygonArr.forEach((a, i) => {
                    if (a[1] == 1) {
                        a[1] = 0;
                        a[2].setOptions({ fillColor: '#fff' });
                    }
                })
            }
        })
    }

    setMarker(map)
}


// areas 배열에 행정동 좌표 배열 넣기
function putArea(areas) {
    let dongPolygonArr
    dong.features.forEach((a, i) => {
        let obj = { name: String, path: [] }
        dongPolygonArr = a.geometry.coordinates[0];

        obj.name = a.properties.ADM_DR_NM;

        // 좌표 배열 채우기
        dongPolygonArr.forEach((a, i) => {
            let x = a[1];
            let y = a[0];
            obj.path.push(new kakao.maps.LatLng(x, y));
        })
        areas.push(obj)
    })
}


// 클릭한 영역이 수성구 내부/외부 판별하기
function inside(mouseEvent, map, overlay) {
    var clickX = mouseEvent.latLng.getLng();
    var clickY = mouseEvent.latLng.getLat();

    // 수성구 다각형 구성하는 좌표 배열 
    let guPolygonArr = gu.features[0].geometry.coordinates[0];

    // 다각형을 구성하는 좌표 배열(위경도 형식X, 일반 배열 형식)
    // 이 좌표들을 이어서 다각형을 표시합니다
    var guPath = [];

    // 알고리즘에 쓸 좌표 배열 채우기
    guPolygonArr.forEach((a, i) => {
        let x = a[0];
        let y = a[1];
        guPath.push([x, y]);
    })

    // 클릭한 곳 수성구 외부/내부 인지 알려주는 변수
    var inside = false;
    // 클릭한 곳 수성구 외부/내부 판단하는 알고리즘
    inside = insideAlgorithm(guPath, inside, clickX, clickY);

    // 클릭한 곳이 수성구 외부라면 오버레이2 외부/내부 판단하기
    if (inside == false) {
        // 오버레이2에 해당하는 화면좌표 (나중에 설정에 따라서 값 바꾸기)
        var mapProjection = map.getProjection();
        var point1 = new kakao.maps.Point(overlay.Rc.x - 100, overlay.Rc.y - 200);
        var point2 = new kakao.maps.Point(overlay.Rc.x + 100, overlay.Rc.y - 200);
        var point3 = new kakao.maps.Point(overlay.Rc.x + 100, overlay.Rc.y);
        var point4 = new kakao.maps.Point(overlay.Rc.x - 100, overlay.Rc.y);

        // 오버레이2 화면좌표 -> 지도좌표
        var p1 = mapProjection.coordsFromPoint(point1);
        var p2 = mapProjection.coordsFromPoint(point2);
        var p3 = mapProjection.coordsFromPoint(point3);
        var p4 = mapProjection.coordsFromPoint(point4);

        // 알고리즘에 쓸 좌표 배열 채우기
        var p = [[p1.getLng(), p1.getLat()], [p2.getLng(), p2.getLat()], [p3.getLng(), p3.getLat()], [p4.getLng(), p4.getLat()]];

        // 클릭한 곳 오버레이 외부/내부 판단하는 알고리즘
        inside = insideAlgorithm(p, inside, clickX, clickY);
    }

    return inside
}

function setMarker(map) {
    // const jsonData1 = require('../data/수성구_고기.json')
    // const jsonData2 = require('../data/수성구_양식.json')
    // const jsonData3 = require('../data/수성구_일식.json')
    // const jsonData4 = require('../data/수성구_중식.json')
    // const jsonData5 = require('../data/수성구_카페.json')
    const jsonData6 = require('../data/수성구_한식.json')
    // var storeLocList = [{
    //     lng: 128.6397851,
    //     lat: 35.8203289
    // }, {
    //     lng: 128.6442596,
    //     lat: 35.8159789
    // }, {
    //     lng: 128.6395125,
    //     lat: 35.8659751
    // }, {
    //     lng: 128.7075786,
    //     lat: 35.8347257
    // }]

    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(5, 5), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(1, 1)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    // for (let idx in jsonData1) {
    //     var coords1 = new kakao.maps.LatLng(jsonData1[idx].위도, jsonData1[idx].경도)

    //     map.marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords1, 
    //         image: markerImage
    //     })
    // }

    // for (let idx in jsonData2) {
    //     var coords2 = new kakao.maps.LatLng(jsonData2[idx].위도, jsonData2[idx].경도)

    //     map.marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords2, 
    //         image: markerImage
    //     })
    // }

    // for (let idx in jsonData3) {
    //     var coords3 = new kakao.maps.LatLng(jsonData3[idx].위도, jsonData3[idx].경도)

    //     map.marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords3, 
    //         image: markerImage
    //     })
    // }

    // for (let idx in jsonData4) {
    //     var coords4 = new kakao.maps.LatLng(jsonData4[idx].위도, jsonData4[idx].경도)

    //     map.marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords4, 
    //         image: markerImage
    //     })
    // }

    // for (let idx in jsonData5) {
    //     var coords5 = new kakao.maps.LatLng(jsonData5[idx].위도, jsonData5[idx].경도)

    //     map.marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords5, 
    //         image: markerImage
    //     })
    // }

    for (let idx in jsonData6) {
        var coords6 = new kakao.maps.LatLng(jsonData6[idx].위도, jsonData6[idx].경도)

        map.marker = new kakao.maps.Marker({
            map: map,
            position: coords6, 
            image: markerImage
        })
    }

    var changeMaptype = kakao.maps.MapTypeId.USE_DISTRICT
    map.addOverlayMapTypeId(changeMaptype)
}