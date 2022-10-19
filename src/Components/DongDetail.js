import { useEffect, useState } from "react";
import dong from '../data/dong.json';
import dongCenter from '../data/dongCenter.json';
import DongAnalysis from "./DongAnalysis";
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
    let [tab, setTab] = useState(0);
    let [type, setType] = useState(meat);

    // 변수값 채우기
    [x, y, mapLevel, dongPath] = dongReady(dong, x, y, mapLevel, dongPath);

    useEffect(() => {
        const container = document.getElementById('detailMap');
        const options = {
            center: new kakao.maps.LatLng(x, y),
            level: mapLevel
        };
        const map = new kakao.maps.Map(container, options);

        KakaoMapScript(map, dongPath, dong, type);
    }, [type]);

    return (
        <div className="dongDetail">
            <div id="detailMap" style={{
                width: '40%',
                height: '83vh'
            }}></div>
            <div className="detailText">
                <Nav fill variant="tabs" defaultActiveKey="type-0">
                    <Nav.Item>
                        <Nav.Link eventKey="type-0" onClick={() => { setTab(0); setType(meat) }}>식육구이집</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="type-1" onClick={() => { setTab(1); setType(japanese) }}>일식음식점</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="type-2" onClick={() => { setTab(2); setType(chinese) }}>중식음식점</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="type-3" onClick={() => { setTab(3); setType(korean) }}>한식음식점</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="type-4" onClick={() => { setTab(4); setType(cafe) }}>휴게음식점</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab} type={type} />
            </div>
        </div>
    )
}

function KakaoMapScript(map, dongPath, dong, type) {
    let rest = [];
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    type.forEach((a, i) => {
        if (dong == a.행정동) {
            let markInfo = {};
            markInfo.dongName = a.행정동;
            markInfo.name = a.식당명;
            markInfo.위도 = a.위도;
            markInfo.경도 = a.경도;
            rest.push(markInfo);
        }
    })

    rest.forEach((a, i) => {
        let imageSize = new kakao.maps.Size(16, 23);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        let mark = {};
        let x = a.위도;
        let y = a.경도;
        mark.title = a.name;
        mark.latlng = new kakao.maps.LatLng(x, y);

        // 마커를 생성합니다
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
                let c = a[1];
                let d = a[0];
                dongPath.push(new kakao.maps.LatLng(c, d));
            })
        }
    })
    return [x, y, mapLevel, dongPath];
}

function TabContent({ tab }) {

    let [fade, setFade] = useState('')
    useEffect(() => {
        setTimeout(() => { setFade('end'); }, 10);
        return () => {
            setFade('')
        }
    }, [tab])

    // 0: 식육구이집, 1: 일식음식점, 2: 중식음식점, 3: 한식음식점, 4: 휴게음식점 
    return (
        <div className={`start ${fade}`}>
            <DongAnalysis tab={tab} />
        </div>
    )
}