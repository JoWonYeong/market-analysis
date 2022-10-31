import axios from 'axios'
import * as XLSX from 'xlsx'

const url = 'http://34.64.250.167'
var xlsxData;

export default function Summary() {
    return (
        <>
            <h1>Summary</h1>

            <h4>Summary 데이터 전체 검색</h4>
            <button onClick={getAllData}>검색 버튼</button><br/>
            <iframe id="getAllData" width="1200" title="test 데이터 전체 검색"></iframe><br/><br/>

            <h4>엑셀 파일 데이터 읽기</h4>
            <input type="file" onChange={readExcel}/><br/>
            <iframe id="readExcel" width="1200" title="엑셀 파일 읽기"></iframe><br/>
            <button onClick={setXlsxData}>데이터베이스에 넣기</button><br/>
            <iframe id="receiveInsertXlsxResult" width="1200" title="엑셀 데이터 저장 결과"></iframe><br/><br/>
        </>
    )
}

function getAllData() {
    axios.get(url + '/summary').then(response => {
        var consoleTextFrame = document.getElementById('getAllData');
        consoleTextFrame = (consoleTextFrame.contentWindow) ? consoleTextFrame.contentWindow
            : (consoleTextFrame.contentDocument.document) ? consoleTextFrame.contentDocument.document
            : consoleTextFrame.contentDocument;
        consoleTextFrame.document.open();
        consoleTextFrame.document.write(JSON.stringify(response.data));
        consoleTextFrame.document.close();
    }).catch(error => {
        console.log(error)
    })
}

function readExcel(f) {
    let input = f.target
    let reader = new FileReader()

    reader.onload = () => {
        let data = reader.result
        let workBook = XLSX.read(data, { type: 'binary'})

        workBook.SheetNames.forEach((sheetName) => {
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
            xlsxData = rows
            
            var consoleTextFrame = document.getElementById('readExcel');
            consoleTextFrame = (consoleTextFrame.contentWindow) ? consoleTextFrame.contentWindow
                : (consoleTextFrame.contentDocument.document) ? consoleTextFrame.contentDocument.document
                : consoleTextFrame.contentDocument;
            consoleTextFrame.document.open();
            consoleTextFrame.document.write(JSON.stringify(rows));
            consoleTextFrame.document.close();
        })
    }

    reader.readAsBinaryString(input.files[0])
}

function setXlsxData() {

    axios.post(url + '/summary/set-xlsx-data', xlsxData).then(response => {
        var consoleTextFrame = document.getElementById('receiveInsertXlsxResult');
        consoleTextFrame = (consoleTextFrame.contentWindow) ? consoleTextFrame.contentWindow
            : (consoleTextFrame.contentDocument.document) ? consoleTextFrame.contentDocument.document
            : consoleTextFrame.contentDocument;
        consoleTextFrame.document.open();
        consoleTextFrame.document.write(JSON.stringify(response));
        consoleTextFrame.document.close();
    })
}