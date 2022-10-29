// path([위도, 경도])로 이루어진 범위 안에 있으면 true, 밖에 있으면 false
const insideAlgorithm = (path, lng, lat) => {
    var isInside = false
    for (var i = 0, j = path.length - 1; i < path.length; j = i++) {
        var xi = path[i][0], yi = path[i][1];
        var xj = path[j][0], yj = path[j][1];

        var intersect = ((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) {
            isInside = !isInside
        }
    }
    return isInside
}

const checkDongInside = (dongPathData, storeLocList) => {
    const dongPathList = dongPathData.features

    // let addedDongData = []
    let consoleLog = ''

    for (let dong in dongPathList) {
        let dongName = dongPathList[dong].properties["ADM_DR_NM"]
        let dongPath = dongPathList[dong].geometry.coordinates[0]

        for (let idx=0; idx < storeLocList.length; idx++) {
            if(insideAlgorithm(dongPath, storeLocList[idx].lng, storeLocList[idx].lat)) {
                // remove 하기 전 데이터 넣기~ ( or 삭제 하지 않고 데이터 추가하고 식별하는 식으로 가능)
                console.log(storeLocList[idx].lng + ', ' + storeLocList[idx].lat + '의 행정동은 ' + dongName + ' 이다.')
                consoleLog += storeLocList[idx].lng + ', ' + storeLocList[idx].lat + '의 행정동은 ' + dongName + ' 이다.<br>'
                storeLocList.splice(idx, 1)
                idx--
            }
        }

        console.log(dongName + '의 매장 검색 완료!')
    }

    // return [행정동 추가 매장 데이터]
    return consoleLog
}

export default checkDongInside