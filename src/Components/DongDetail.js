import { useEffect, useState } from "react";
import dong from '../data/dong.json';
import dongCenter from '../data/dongCenter.json';
import meat from '../data/crawling/meat.json';
import korean from '../data/crawling/korean.json';
import cafe from '../data/crawling/cafe.json';
import chinese from '../data/crawling/chinese.json';
import japanese from '../data/crawling/japanese.json';
import { Nav } from "react-bootstrap";
const { kakao } = window;

export default function DongDetail({ dong }) {
    let x, y;
    let mapLevel;
    let dongPath = [];
    let [type, setType] = useState(meat);

    // 변수값 채우기
    [x, y, mapLevel, dongPath] = dongReady(dong, x, y, mapLevel, dongPath);

    useEffect(() => {
        const container = document.getElementById('detail_left_map');
        const options = {
            center: new kakao.maps.LatLng(x, y),
            level: mapLevel
        };
        const map = new kakao.maps.Map(container, options);

        KakaoMapScript(map, dongPath, dong, type);
    }, [type]);

    return (
        <div className="detail_box">
            <div className="detail_left">
                <div className="detail_left_tab">
                    <Nav fill variant="tabs" defaultActiveKey="type-0">
                        <Nav.Item>
                            <Nav.Link eventKey="type-0" onClick={() => { setType(meat) }}>식육구이점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="type-1" onClick={() => { setType(japanese) }}>일식점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="type-2" onClick={() => { setType(chinese) }}>중식점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="type-3" onClick={() => { setType(korean) }}>한식점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="type-4" onClick={() => { setType(cafe) }}>휴게음식점</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div id="detail_left_map" style={{
                    width: '100%',
                    height: '76vh'
                }}></div>
            </div>
            <div className="detail_right">
                {dong}: 차트임
            </div>
        </div>
    )
}

function KakaoMapScript(map, dongPath, dong, type) {
    let restaurant = [];
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    type.forEach((a, i) => {
        if (dong == a.행정동) {
            let markInfo = {};
            markInfo.dongName = a.행정동;
            markInfo.name = a.식당명;
            markInfo.위도 = a.위도;
            markInfo.경도 = a.경도;
            restaurant.push(markInfo);
        }
    })

    restaurant.forEach((a, i) => {
        let imageSize = new kakao.maps.Size(16, 23);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        let mark = {};
        let x = a.위도;
        let y = a.경도;
        mark.title = a.name;
        mark.latlng = new kakao.maps.LatLng(x, y);

        // 마커 생성
        var marker = new kakao.maps.Marker({
            map: map,
            position: mark.latlng,
            title: mark.title,
            image: markerImage
        });
    })

    var polygon = new kakao.maps.Polygon({
        path: dongPath,
        strokeWeight: 3,
        strokeColor: '#004c80',
        strokeOpacity: 0.7,
        fillColor: '#fff',
        fillOpacity: 0.4
    });

    polygon.setMap(map);
}

function dongReady(targetDong, x, y, mapLevel, dongPath) {
    // map 크기, 중심좌표 설정
    dongCenter.features.forEach((a, i) => {
        if (targetDong == a.dong) {
            x = a.center[1];
            y = a.center[0];
            mapLevel = a.mapLevel;
        }
    })
    // 해당 동 폴리곤 설정
    dong.features.forEach((a, i) => {
        let dongPolygonArr;
        if (targetDong == a.properties.ADM_DR_NM) {
            dongPolygonArr = a.geometry.coordinates[0];
            dongPolygonArr.forEach((a, i) => {
                let x = a[1];
                let y = a[0];
                dongPath.push(new kakao.maps.LatLng(x, y));
            })
        }
    })
    return [x, y, mapLevel, dongPath];
}