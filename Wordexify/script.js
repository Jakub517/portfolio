document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');

    document.getElementById('bold').addEventListener('click', function () {
        document.execCommand('bold', false, null);
    });

    document.getElementById('superscript').addEventListener('click', function () {
        document.execCommand('superscript', false, null);
    });

    document.getElementById('subscript').addEventListener('click', function () {
        document.execCommand('subscript', false, null);
    });

    document.getElementById('insertOrderedList').addEventListener('click', function () {
        document.execCommand('insertOrderedList', false, null);
    });

    document.getElementById('insertUnorderedList').addEventListener('click', function () {
        document.execCommand('insertUnorderedList', false, null);
    });

    document.getElementById('undo').addEventListener('click', function () {
        document.execCommand('undo', false, null);
    });

    document.getElementById('redo').addEventListener('click', function () {
        document.execCommand('redo', false, null);
    });

    document.getElementById('createLink').addEventListener('click', function () {
        const url = prompt('Enter URL:');
        if (url) {
            document.execCommand('createLink', false, url);
        }
    });

    document.getElementById('unlink').addEventListener('click', function () {
        document.execCommand('unlink', false, null);
    });

    document.getElementById('justifyLeft').addEventListener('click', function () {
        document.execCommand('justifyLeft', false, null);
    });

    document.getElementById('justifyCenter').addEventListener('click', function () {
        document.execCommand('justifyCenter', false, null);
    });

    document.getElementById('justifyRight').addEventListener('click', function () {
        document.execCommand('justifyRight', false, null);
    });

    document.getElementById('justifyFull').addEventListener('click', function () {
        document.execCommand('justifyFull', false, null);
    });

    document.getElementById('indent').addEventListener('click', function () {
        document.execCommand('indent', false, null);
    });

    document.getElementById('outdent').addEventListener('click', function () {
        document.execCommand('outdent', false, null);
    });

    document.getElementById('formatBlock').addEventListener('change', function () {
        const format = this.value;
        document.execCommand('formatBlock', false, '<' + format + '>');
    });

    const fontNameDropdown = document.getElementById('fontName');
    const fontNames = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Tahoma'];
    fontNames.forEach(function (fontName) {
        const option = document.createElement('option');
        option.value = fontName;
        option.textContent = fontName;
        fontNameDropdown.appendChild(option);
    });

    const fontSizeDropdown = document.getElementById('fontSize');
    const fontSizes = ['1', '2', '3', '4', '5', '6', '7'];
    fontSizes.forEach(function (fontSize) {
        const option = document.createElement('option');
        option.value = fontSize;
        option.textContent = fontSize;
        fontSizeDropdown.appendChild(option);
    });

    document.getElementById('fontName').addEventListener('change', function () {
        const fontName = this.value;
        document.execCommand('fontName', false, fontName);
    });

    document.getElementById('fontSize').addEventListener('change', function () {
        const fontSize = this.value;
        document.execCommand('fontSize', false, fontSize);
    });

    document.getElementById('foreColor').addEventListener('input', function () {
        const color = this.value;
        document.execCommand('foreColor', false, color);
    });

    document.getElementById('backColor').addEventListener('input', function () {
        const color = this.value;
        document.execCommand('backColor', false, color);
    });

    document.getElementById('loadFile').addEventListener('click', function () {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                textInput.innerHTML = e.target.result;
            };

            reader.readAsText(file);
        }
    });

    document.getElementById('saveFile').addEventListener('click', function () {
        const content = textInput.innerHTML;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.option-button, .script-button, .adv-option-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const printButton = document.getElementById('print');

    if (printButton) {
        printButton.addEventListener('click', function () {
            printText();
        });
    }

    function printText() {
        const textToPrint = document.getElementById('text-input').innerText;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Tisk</title></head><body>');
        printWindow.document.write('<pre>' + textToPrint + '</pre>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
});
