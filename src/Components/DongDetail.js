import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import dong from '../data/dong.json';
import dongCenter from '../data/dongCenter.json';
import cafe from '../data/crawling/cafe.json';
import Chart1 from "./chart/Chart1";
import Chart2 from "./chart/Chart2";
import Chart3 from "./chart/Chart3";
import Chart4 from "./chart/Chart4";
import LoadData from "../function/loadData";
const { kakao } = window;

export default function DongDetail({ dong }) {
    var male;   // 남자 %
    var female; // 여자 %
    var ageAvg; // 평균연령
    var populationAvg;  // 평균유동인구
    var periodAvg = []; // 평균영업기간 [식육구이, 일식, 중식, 한식, 휴게] 년
    var aboveAvgCategories = [];    // 영업기간 평균 이상 업종
    var loading

    let x, y;
    let mapLevel;
    let dongPath = [];

    // // 변수값 채우기
    [male, female, ageAvg, populationAvg, periodAvg, aboveAvgCategories, loading] = LoadData(dong);
    [x, y, mapLevel, dongPath] = dongReady(dong, x, y, mapLevel, dongPath);

    useEffect(() => {
        const container = document.getElementById('detail_left_map');
        const options = {
            center: new kakao.maps.LatLng(x, y),
            level: mapLevel
        };
        const map = new kakao.maps.Map(container, options);

        KakaoMapScript(map, dongPath, dong);
    }, []);

    return (
        <div className="detail_box">
            <div className="detail_left">
                <div id="detail_left_map" style={{
                    width: '100%',
                    height: '85vh'
                }}></div>
            </div>
            {
                loading ?
                    <div style={{ display: 'flex', width: '65%', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner animation="border" variant="secondary" style={{ width: '7rem', height: '7rem' }} />
                    </div> :
                    <div className="detail_right">
                        <div className="detail_right_12">
                            <div className="detail_right_1">
                                <Chart1 periodAvg={periodAvg} />
                            </div>
                            <div className="detail_right_2">
                                <Chart2 dong={dong} ageAvg={ageAvg} populationAvg={populationAvg} />
                            </div>
                        </div>
                        <div className="detail_right_34">
                            <div className="detail_right_3">
                                <Chart3 aboveAvgCategories={aboveAvgCategories} />
                            </div>
                            <div className="detail_right_4">
                                <Chart4 male={male} female={female} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function KakaoMapScript(map, dongPath, dong) {
    let restaurant = [];
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    cafe.forEach((a, i) => {
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
        let imageSize = new kakao.maps.Size(24, 35);
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