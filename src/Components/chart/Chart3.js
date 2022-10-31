import { useEffect, useState, useContext } from "react";

export default function Chart3({ aboveAvgCategories }) {
    let count
    if (aboveAvgCategories[0] == "없음") {
        count = 0;
    }
    else {
        count = aboveAvgCategories.length;
    }
    let [move, setMove] = useState('')
    let [size, setSize] = useState('')

    useEffect(() => {
        setTimeout(() => { setSize('chart3_size' + count); setMove('end') }, 10);
        return () => {
            setSize('');
            setMove('');
        }
    }, [])

    return (
        <div className="chart3" style={{ margin: "10px 10px 10px 0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
            <div className="chart3_title">
                영업기간 평균 이상 업종
            </div>
            <div className="chart3_circles">
                {
                    aboveAvgCategories.map((a, i) => {
                        return <div key={i} className={`chart3_circle ${size} start ${move}`}>{a}</div>
                    })
                }
            </div>
        </div >
    )
}