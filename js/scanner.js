document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const scanResult = document.getElementById('scan-result');
    const context = canvas.getContext('2d');
    let stream = null;

    fileInput.addEventListener('change', handleFileSelect);
    document.getElementById('start-camera').addEventListener('click', startCamera);

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

    function startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                .then(function(mediaStream) {
                    stream = mediaStream;
                    video.srcObject = mediaStream;
                    video.play();
                    video.style.display = 'block';
                    canvas.style.display = 'none';
                    scanFromVideo();
                })
                .catch(function(err) {
                    console.error("An error occurred: " + err);
                });
        } else {
            console.error("getUserMedia not supported");
        }
    }

    function scanFromVideo() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const codeReader = new ZXing.BrowserMultiFormatReader();
            codeReader.decodeFromImage(imageData)
                .then(result => {
                    if (result) {
                        scanResult.textContent = result.text;
                        if (stream) {
                            stream.getTracks().forEach(track => track.stop());
                            video.style.display = 'none';
                            canvas.style.display = 'block';
                        }
                    } else {
                        requestAnimationFrame(scanFromVideo);
                    }
                })
                .catch(err => {
                    console.error(err);
                    requestAnimationFrame(scanFromVideo);
                });
        } else {
            requestAnimationFrame(scanFromVideo);
        }
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
