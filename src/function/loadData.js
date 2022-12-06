// import chartData from '../data/chartData.json'
import axios from "axios"
import { useEffect } from 'react';
import { useState } from 'react';

// 0: 휴게음식점, 1: 식육구이집, 2: 일식음식점, 3: 중식음식점, 4: 한식음식점

export default function LoadData(dong) {
    const [loading, setLoading] = useState(true);

    const [male, setMale] = useState(0)
    const [female, setFemale] = useState(0)
    const [ageAvg, setAgeAvg] = useState(0)
    const [populationAvg, setPopulationAvg] = useState(0)
    const [periodAvg, setPeriodAvg] = useState([])
    const [aboveAvgCategories, setAboveAvgCategories] = useState([])

    useEffect(() => {
        axios.get('http://34.64.110.2/summary/').then((response) => {
            response.data.forEach((a, i) => {
                if (a.dong == dong) {
                    // 남녀비율
                    let genderRatio = a.sex_rate;
                    let f = 100 / (1 + genderRatio);
                    f = Math.round(f * 100) / 100;
                    let m = 100 - f;
                    setFemale(f)
                    setMale(m)

                    setAgeAvg(a.age_avg);   // 평균연령
                    setPopulationAvg(a.float_pop_year); // 평균유동인구

                    let temp = [];
                    temp.push(Math.round(a.cafe_period_avg * 100) / 100);
                    temp.push(Math.round(a.meat_period_avg * 100) / 100);
                    temp.push(Math.round(a.japanese_period_avg * 100) / 100);
                    temp.push(Math.round(a.chinese_period_avg * 100) / 100);
                    temp.push(Math.round(a.korean_period_avg * 100) / 100);

                    setPeriodAvg(temp)  // 평균영업기간

                    let temp2 = a.above_period_avg.split(',');
                    setAboveAvgCategories(temp2);   // 영업기간 평균 이상 업종

                }
            })
        }).finally(() => {
            setTimeout(function () {
                setLoading(false);
            }, 400)
        })
    }, [])


    // var genderRatio;    // 남녀 비율
    // var male;   // 남자 %
    // var female; // 여자 %
    // var ageAvg; // 평균연령
    // var populationAvg;  // 평균유동인구
    // var periodAvg = []; // 평균영업기간 [휴게, 식육구이, 일식, 중식, 한식] 년
    // var aboveAvgCategories = [];    // 영업기간 평균 이상 업종

    // chartData.forEach((a, i) => {
    //     if (a.행정동 == dong) {
    //         genderRatio = a.남녀비율;
    //         ageAvg = a.평균연령;
    //         populationAvg = a.평균유동인구;
    //         periodAvg.push(a.평균영업기간_휴게);
    //         periodAvg.push(a.평균영업기간_식육);
    //         periodAvg.push(a.평균영업기간_일식);
    //         periodAvg.push(a.평균영업기간_중식);
    //         periodAvg.push(a.평균영업기간_한식);
    //         aboveAvgCategories = a.영업기간_평균이상_업종.split(',');

    //         female = 100 / (1 + genderRatio);
    //         female = Math.round(female * 100) / 100;
    //         male = 100 - female
    //     }
    // })

    return [male, female, ageAvg, populationAvg, periodAvg, aboveAvgCategories, loading];
}