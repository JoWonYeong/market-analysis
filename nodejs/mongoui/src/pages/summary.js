import axios from 'axios'

const url = 'http://34.64.250.167'

export default function Summary() {
    return (
        <>
            <h1>Summary</h1>

            <h4>Summary 데이터 전체 검색</h4>
            <button onClick={getAllData}>검색 버튼</button><br/>
            <iframe id="getAllData" width="1200" title="test 데이터 전체 검색"></iframe>
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