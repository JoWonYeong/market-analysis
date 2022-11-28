import dong from '../data/dong.json'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeLeft from '../Components/HomeLeft';
import MyModal from '../Components/MyModal';

const { kakao } = window;

export default function Map() {
    let navigate = useNavigate();

    let [open, setOpen] = useState(false);
    let [dong, setDong] = useState('');

    useEffect(() => {
        const container = document.getElementById('home_right_map');
        const options = {
            center: new kakao.maps.LatLng(35.836042613869544, 128.6582783008829),
            level: 7
        };
        const map = new kakao.maps.Map(container, options);

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        map.setZoomable(false);     // 지도 확대/축소 불가능

        KakaoMapScript(map, setOpen, setDong);

    }, []);

    return (
        <>
            <div className='home_title'><span style={{ cursor: 'pointer' }} onClick={() => { navigate('/commercial-analysis/') }}>판매데이터와 공공데이터를 활용한 카페 상권 분석</span>
            </div>
            <div className='home'>
                <div className='home_left'>
                    <HomeLeft />
                </div>
                <div className="home_right">
                    <div id="home_right_map" className='shadow' style={{
                        width: '100%',
                        height: '87vh'
                    }} ></div>
                </div>
            </div>
            <MyModal
                show={open}
                onHide={() => setOpen(false)}
                dong={dong} />
        </>
    );
}

function KakaoMapScript(map, setOpen, setDong) {
    var customOverlay = new kakao.maps.CustomOverlay({});  // 마우스 따라다니는 오버레이

    var coleredPolygonArr = []; // [[행정동명, 색칠여부(0/1), 폴리곤객체], ...]

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
            polygon.setOptions({ fillColor: '#09f' });
            customOverlay.setContent('<div class="overlay">' + area.name + '</div>');
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);

            map.setCursor('pointer');
        });

        // mousemove : 마우스 따라 움직이면서 오버레이1 위치 변경
        kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
            customOverlay.setPosition(mouseEvent.latLng);
        });

        // mouseout : 해당 폴리곤에서 나오면 오버레이1 제거
        kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ fillColor: '#fff' });
            customOverlay.setMap(null);
            map.setCursor('move');
        });


        // click : <MyModal /> 뜸
        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
            setOpen(true);
            setDong(area.name);
        });
    }

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