const apiKey = "";

const maxImages = 4;
let selectedImageNumber = null;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableGenerateButton() {
    document.getElementById("generate").disabled = true;
}

function enableGenerateButton() {
    document.getElementById("generate").disabled = false;
}

function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();
}

function closeLoadingPopup() {
    Swal.close();
}

async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const imageUrls = [];

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            alert("Failed to generate image!");
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        imageUrls.push(imgUrl);

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `art-${i + 1}`;
        img.onclick = () => downloadImage(imgUrl, i);
        document.getElementById("image-grid").appendChild(img);
    }

    loading.style.display = "none";
    enableGenerateButton();
    closeLoadingPopup();
}

document.getElementById("generate").addEventListener('click', () => {
    const input = document.getElementById("user-prompt").value;

    if (!input.trim()) {
        Swal.fire({
            title: 'Chyba',
            text: 'Musíte napsat alespoň jeden prompt',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'custom-popup-class',
            }
        });
        return;
    }

    Swal.fire({
        title: 'Generuji obrázky',
        html: 'Prosím, počkejte...',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
            generateImages(input);
        }
    });
});

document.getElementById("info").addEventListener('click', () => {
    const infoText = `
        Seznam funkcí:
        1. Zadejte textový prompt do pole a stiskněte tlačítko "Generovat".
        2. Pro stažení obrázku, klikněte na něj v galerii.
        3. Tlačítko "Info" vám zobrazí tento seznam funkcí.
    `;

    Swal.fire({
        title: 'Generátor Obrázků - Nápověda',
        html: infoText,
        icon: 'info',
        confirmButtonText: 'Rozumím',
        customClass: {
            popup: 'custom-popup-class',
        }
    });
});
