import React, { useState, useEffect } from 'react';
import './../sliderOverlayStyle.css'
import Slider from "react-slick";
import icon1 from './../img/icon/1.png'
import icon2 from './../img/icon/2.png'
import icon3 from './../img/icon/3.png'
import icon4 from './../img/icon/4.png'
import icon5 from './../img/icon/5.png'
import icon6 from './../img/icon/6.png'
import icon7 from './../img/icon/7.png'
import icon8 from './../img/icon/8.png'

export default function ExpectedInfo({ TMX, TMN, SKY, WSD, POP, TMP, hour }) {
    // ({ 최대기온, 최저기온, 평균 전운량, 평균 풍속, 평균 강수량, 평균기온, 현재시 })
    let [fade, setFade] = useState('');
    let [dayNight, setDayNight] = useState('');
    let [icon, setIcon] = useState('');


    useEffect(() => {
        setTimeout(() => {
            setFade('end');

            // 시간 고려해 배경설정
            if (hour >= 19 || hour <= 5) {
                setDayNight('night');
            } else {
                setDayNight('day');
            }

            // 날씨 아이콘 설정
            // 1. 평균 강수확률 (~30%, 30~50%, 50%~)
            if (POP < 30) {
                // 2. 평균 전운량 (0~5: 맑음, 6~8: 구름많음, 9~10: 흐림)
                if (SKY <= 5) {
                    if (hour >= 6 && hour <= 18) {
                        // 3. 낮일때
                        setIcon(icon1);
                    }
                    else if (hour >= 19 || hour <= 5) {
                        // 3. 밤일때
                        setIcon(icon2);
                    }
                }
                else if (SKY <= 8) {
                    if (hour >= 6 && hour <= 18) {
                        setIcon(icon3);
                    } else if (hour >= 19 || hour <= 5) {
                        setIcon(icon4);
                    }
                }
                else {
                    setIcon(icon5);
                }
            }
            else if (POP < 50) {
                if (hour >= 6 && hour <= 18) {
                    setIcon(icon6);
                } else if (hour >= 19 || hour <= 5) {
                    setIcon(icon7);
                }
            } else {
                setIcon(icon8);
            }
        }, 10);
        return () => {
            setFade('')
        }
    }, [])


    // Slider
    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0px",
        vertical: true,

        dots: false,
        infinite: true,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 2700,
        pauseOnHover: false,
        cssEase: "linear",

        slidesToShow: 3,
        slidesToScroll: 1,
    };


    // overlay
    const [isShown, setIsShown] = useState(false);
    let [fade2, setFade2] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setFade2('end2');
        }, 10);
        return () => {
            setFade2('')
        }
    }, [isShown])

    return (
        <>
            <div className={`start ${fade} ${dayNight}`}>
                <div className={`home_left_box start ${fade}`}>
                    <div className='box_weather'>
                        <img src={`${icon}`} height='75%' style={{ margin: 'auto' }} />
                        <div className='box_weather_detail d_cursor'>
                            <div className='box_weather_element'>최고: {TMX}℃</div>
                            <div className='box_weather_element'>최저: {TMN}℃</div>
                            <div className='box_weather_element'>강수확률: {POP}%</div>
                        </div>
                    </div>

                    <div className="box_slider">
                        <div className='box_slider_seeAll d_cursor' onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}> 전체보기</div>
                        {isShown &&
                            <div className={`box_slider_seeAll_overlay ${fade2}`}>
                                <div className="seeAll_triangle"></div>
                                <div className="seeAlll_info">
                                    <div className='seeAll_info_title'>최다 판매메뉴 예상</div>
                                    <div className="seeAll_info_detail">
                                        <div className='seeAll_info_ranking'>
                                            <div className="ranking_element">1</div>
                                            <div className="ranking_element">2</div>
                                            <div className="ranking_element">3</div>
                                            <div className="ranking_element">4</div>
                                            <div className="ranking_element">5</div>
                                        </div>
                                        <div className='seeAll_info_menu'>
                                            <div className="menu_element">아이스 아메리카노</div>
                                            <div className="menu_element">카페라떼</div>
                                            <div className="menu_element">밀크티</div>
                                            <div className="menu_element">자몽 에이드</div>
                                            <div className="menu_element">카페모카</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <Slider {...settings}>
                            <div className='box_slider_element'>아이스 아메리카노</div>
                            <div className='box_slider_element'>카페라떼</div>
                            <div className='box_slider_element'>밀크티</div>
                            <div className='box_slider_element'>자몽 에이드</div>
                            <div className='box_slider_element'>카페모카</div>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}