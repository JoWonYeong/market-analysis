import dong from '../data/dong.json'
import React, { useEffect } from 'react';
import checkDongInside from '../function/checkDongInside'

export default function CheckDong() {

    useEffect(() => {
        var storeLocList = [{
            lng: 128.6397851,
            lat: 35.8203289
        }, {
            lng: 128.6442596,
            lat: 35.8159789
        }, {
            lng: 128.6395125,
            lat: 35.8659751
        }, {
            lng: 128.7075786,
            lat: 35.8347257
        }]

        var consoleTextFrame = document.getElementById('consoleText');
        consoleTextFrame = (consoleTextFrame.contentWindow) ? consoleTextFrame.contentWindow
            : (consoleTextFrame.contentDocument.document) ? consoleTextFrame.contentDocument.document
            : consoleTextFrame.contentDocument;
        consoleTextFrame.document.open();
        consoleTextFrame.document.write(checkDongInside(dong, storeLocList));
        consoleTextFrame.document.close();
    }, [])

    return (
        <>
            <h1>행정동 확인</h1>

            <iframe id="consoleText" width="600" title="매장 행정동 확인"></iframe>
        </>
    )
}
