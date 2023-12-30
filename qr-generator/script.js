function generateQRCode() {
    var textInput = document.getElementById('text-input').value;
    var qrcodeElement = document.getElementById('qrcode');
    var downloadBtn = document.getElementById('download-btn');

    if (textInput.trim() !== '') {
        qrcodeElement.innerHTML = '';

        var qrcode = new QRCode(qrcodeElement, {
            text: textInput,
            width: 200,
            height: 200
        });

        downloadBtn.style.display = 'inline-block';
    } else {
        alert('Zadejte zprávu, kterou chcete vygenerovat.');
    }
}

function downloadQRCode() {
    var qrcode = document.getElementById('qrcode').getElementsByTagName('img')[0];
    var canvas = document.createElement('canvas');
    canvas.width = qrcode.width;
    canvas.height = qrcode.height;
    var context = canvas.getContext('2d');
    context.drawImage(qrcode, 0, 0);

    var link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
}
