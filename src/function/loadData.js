import chartData from './../data/chartData.json'

// 0: 식육구이집, 1: 일식음식점, 2: 중식음식점, 3: 한식음식점, 4: 휴게음식점 

export default function loadData(dong) {
    var genderRatio;    // 남녀 비율
    var male;   // 남자 %
    var female; // 여자 %
    var ageAvg; // 평균연령
    var populationAvg;  // 평균유동인구
    var periodAvg = []; // 평균영업기간 [식육구이, 일식, 중식, 한식, 휴게] 년
    var aboveAvgCategories = [];    // 영업기간 평균 이상 업종

    chartData.forEach((a, i) => {
        if (a.행정동 == dong) {
            genderRatio = a.남녀비율;
            ageAvg = a.평균연령;
            populationAvg = a.평균유동인구;
            periodAvg.push(a.평균영업기간_식육);
            periodAvg.push(a.평균영업기간_일식);
            periodAvg.push(a.평균영업기간_중식);
            periodAvg.push(a.평균영업기간_한식);
            periodAvg.push(a.평균영업기간_휴게);
            aboveAvgCategories = a.영업기간_평균이상_업종.split(',');

            female = 100 / (1 + genderRatio);
            female = Math.round(female * 100) / 100;
            male = 100 - female
        }
    })

    // console.log(`${dong}의 남녀비율: ${genderRatio}, 평균연령: ${ageAvg}, 평균유동인구: ${populationAvg}, 업종별 평균 영업기간: ${periodAvg}, 영업기간 평균이상업종: ${aboveAvgCategories}`);
    // console.log(`여자비율: ${female}%, 남자비율: ${male}%`);

    return [male, female, ageAvg, populationAvg, periodAvg, aboveAvgCategories];
}