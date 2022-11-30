const router = require('express').Router()
var tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node')

const classes = ['바닐라라떼','카라멜 초코 쿠키','디카페인 허니 콜드브루 라떼','블루베리 루이보스 ONLY HOT','아메리카노','딸기 청귤 에이드 ONLY ICE','아이스 카페모카','자몽블랙티','고구마 라떼 ONLY HOT','아이스 스윗솔티 라떼','흑임자 크림 라떼','날짜/메뉴명','아이스 그린티 라떼','수박 주스','쿠키앤크림 스무디 ONLY ICE','홍차밀크티','치즈 크림 딸기 라떼 ONLY ICE','아메리칸 초코칩 쿠키','피스타치오 라떼','자몽티 ONLY HOT','아이스 민트 초코','적포도 주스 ONLY ICE','레몬티 ONLY HOT','그린티 라떼','아이스 피스타치오 라떼','아이스 카페라떼','아이스 자몽블랙티','아이스 초코 라떼','아이스 카라멜 마끼아토','콜드 브루','자몽 주스 ONLY ICE','아이스 아메리카노','청포도 주스 ONLY ICE','아이스티 ONLY ICE','딸기 요거트 스무디','아이스티','카페라떼','민트 초코','아이스 홍차밀크티','레몬 파운드','초코 라떼','카모마일 메들리 ONLY HOT','카라멜 마끼아토','스윗솔티 라떼','딸기 라떼 ONLY ICE','레몬에이드 ONLY ICE','아이스 흑임자 크림 라떼','레드벨벳 크림치즈 쿠키','허니 콜드브루 라떼','딸기 라떼','아이스 바닐라라떼','초코 카라멜 쿠키','카페모카','딸기 청귤 티','딸기 요거트 스무디 ONLY ICE','디카페인 콜드 브루','클래식 모히토']

router.post('/top-menu', (req, res) => {
    predictData = [req.body.input]
    inputData = tf.tensor(predictData)
    tf.loadLayersModel('file://./menuPredict/model.json').then(function(model) {
        let result = model.predict(inputData).arraySync()[0]
        
        for (var i = 0; i < result.length; i++) {
            if (classes[i] == '날짜/메뉴명') {
                result[i] = { class: classes[i], value: -1 }
            }
            result[i] = { class: classes[i], value: result[i] }
        }

        result.sort((a, b) => {
            if (a.value > b.value) {
                return -1
            }
            if (a. value < b.value) {
                return 1
            }
            return 0
        })
        res.send(result.slice(0, 5))
    }).catch(err => {
        console.log(err)
        res.status(404).send(err)
    })
})

module.exports = router