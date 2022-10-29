// path([위도, 경도])로 이루어진 범위 안에 있으면 true, 밖에 있으면 false
export default function insideAlgorithm(path, inside, clickX, clickY) {
    for (var i = 0, j = path.length - 1; i < path.length; j = i++) {
        var xi = path[i][0], yi = path[i][1];
        var xj = path[j][0], yj = path[j][1];

        var intersect = ((yi > clickY) !== (yj > clickY)) && (clickX < (xj - xi) * (clickY - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside
        }
    }
    return inside
}