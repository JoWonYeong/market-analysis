import axios from "axios"
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import React, { useState, useEffect } from 'react';
import ExpectedInfo from "./ExpectedInfo";

export default function HomeLeft() {
    const [loading, setLoading] = useState(true);

    const now = new Date();
    const nowY = new Date();
    const nowT = new Date();
    const yesterday = new Date(nowY.setDate(nowY.getDate() - 1));
    const tomorrow = new Date(nowT.setDate(nowT.getDate() + 1));

    // YYMMDD 형식
    const yesterdayDate = `${yesterday.getFullYear()}${yesterday.getMonth() + 1}${yesterday.getDate()}`;
    const todayDate = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`;
    const tomorrowDate = `${tomorrow.getFullYear()}${tomorrow.getMonth() + 1}${tomorrow.getDate()}`;

    const hour = now.getHours();

    // API 어제날짜(yesterdayDate)로 요청 -> 오늘(todayDate), 내일(tomorrowDate) 정보 얻어옴
    const API_KEY = '1T1kRQ0ZyfwRKD1MVqkFzS%2FOWet%2B2833Mm00bXlnRYzFlTYZP1d99hOS8hJcDLMzpgaT6EU%2F4Zed%2BzDWHA%2F77Q%3D%3D';
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${yesterdayDate}&base_time=0500&nx=89&ny=90`;

    const [TMX1, setTMX1] = useState(0);    // 최대기온
    const [TMN1, setTMN1] = useState(0);    // 최저기온
    const [avgSKY1, setAvgSKY1] = useState(0);  // 평균 전운량
    const [avgWSD1, setAvgWSD1] = useState(0);  // 평균 풍속 [m/s]
    const [avgPOP1, setAvgPOP1] = useState(0);  // 평균 강수확률 [%]
    const [avgTMP1, setAvgTMP1] = useState(0);  // 평균기온

    const [TMX2, setTMX2] = useState(0);
    const [TMN2, setTMN2] = useState(0);
    const [avgSKY2, setAvgSKY2] = useState(0);
    const [avgWSD2, setAvgWSD2] = useState(0);
    const [avgPOP2, setAvgPOP2] = useState(0);
    const [avgTMP2, setAvgTMP2] = useState(0);

    let tempSKY1 = 0;
    let tempWSD1 = 0;
    let tempPOP1 = 0;
    let tempTMP1 = 0;
    let tempSKY2 = 0;
    let tempWSD2 = 0;
    let tempPOP2 = 0;
    let tempTMP2 = 0;

    useEffect(() => {
        axios.get(url).then((response) => {
            response.data.response.body.items.item.forEach((a, i) => {

                // 오늘 정보 채우기
                if (a.fcstDate == todayDate) {
                    if (a.category == 'TMX') {  // 최고기온 [℃]
                        setTMX1(Math.round(a.fcstValue));
                    }
                    if (a.category == 'TMN') {  // 최저기온 [℃]
                        setTMN1(Math.round(a.fcstValue));
                    }
                    if (a.category == 'SKY') {  // 평균전운량
                        tempSKY1 += parseInt(a.fcstValue);
                    }
                    if (a.category == 'WSD') {  // 평균풍속 [m/s]
                        tempWSD1 += parseFloat(a.fcstValue);
                    }
                    if (a.category == 'POP') {  // 평균강수확률 [%]
                        tempPOP1 += parseInt(a.fcstValue);
                    }
                    if (a.category == 'TMP') {  // 평균기온 [℃]
                        tempTMP1 += parseInt(a.fcstValue);
                    }
                }

                // 내일 정보 채우기
                if (a.fcstDate == tomorrowDate) {
                    if (a.category == 'TMX') {
                        setTMX2(Math.round(a.fcstValue));
                    }
                    if (a.category == 'TMN') {
                        setTMN2(Math.round(a.fcstValue));
                    }
                    if (a.category == 'SKY') {
                        tempSKY2 += parseInt(a.fcstValue);
                    }
                    if (a.category == 'WSD') {
                        tempWSD2 += parseFloat(a.fcstValue);
                    }
                    if (a.category == 'POP') {
                        tempPOP2 += parseInt(a.fcstValue);
                    }
                    if (a.category == 'TMP') {
                        tempTMP2 += parseInt(a.fcstValue);
                    }
                }
            })

            setAvgSKY1(tempSKY1 / 24);
            setAvgWSD1(tempWSD1 / 24);
            setAvgPOP1(Math.round((tempPOP1 / 24) * 10) / 10);
            setAvgTMP1(tempTMP1 / 24);

            setAvgSKY2(tempSKY2 / 24);
            setAvgWSD2(tempWSD2 / 24);
            setAvgPOP2(Math.round((tempPOP2 / 24) * 10) / 10);
            setAvgTMP2(tempTMP2 / 24);

        }).finally(() => {
            setTimeout(function () {
                setLoading(false);
            }, 400)
        })
    }, [])

    return (
        <>
            <div>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><span className="home_left_header">오늘({now.getMonth() + 1}월 {now.getDate()}일) 예상 판매 메뉴</span></Accordion.Header>
                        <Accordion.Body style={{ padding: '0' }}>
                            {
                                loading ?
                                    <div className="home_left_box" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Spinner animation="border" variant="secondary" style={{ width: '6rem', height: '6rem' }} />
                                    </div>
                                    :
                                    <ExpectedInfo TMX={TMX1} TMN={TMN1} SKY={avgSKY1} WSD={avgWSD1} POP={avgPOP1} TMP={avgTMP1} hour={hour} />
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header> <span className="home_left_header">내일({tomorrow.getMonth() + 1}월 {tomorrow.getDate()}일) 예상 판매 메뉴</span></Accordion.Header>
                        <Accordion.Body style={{ padding: '0' }}>
                            {
                                loading ?
                                    <div className="home_left_box" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Spinner animation="border" variant="secondary" style={{ width: '6rem', height: '6rem' }} />
                                    </div>
                                    :
                                    <ExpectedInfo TMX={TMX2} TMN={TMN2} SKY={avgSKY2} WSD={avgWSD2} POP={avgPOP2} TMP={avgTMP2} hour={hour} />
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}