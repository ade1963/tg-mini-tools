document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const scanResult = document.getElementById('scan-result');
    const context = canvas.getContext('2d');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                decodeQR();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function decodeQR() {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });

        if (code) {
            scanResult.textContent = code.data;
        } else {
            scanResult.textContent = "Could not decode QR code.";
        }
    }
});

