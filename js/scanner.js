document.addEventListener('DOMContentLoaded', () => {
    const scanResult = document.getElementById('scan-result');
    const fileInput = document.getElementById('file-input');
    const startCameraButton = document.getElementById('start-camera');
    let html5QrcodeScanner = null;

    // File input handler
    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const html5QrCode = new Html5Qrcode("qr-reader");
        
        html5QrCode.scanFile(file, true)
            .then(decodedText => {
                scanResult.textContent = decodedText;
            })
            .catch(err => {
                scanResult.textContent = "Error scanning QR Code: " + err;
            });
    }

    // Camera handling
    startCameraButton.addEventListener('click', toggleCamera);
    let isScanning = false;

    function toggleCamera() {
        if (isScanning) {
            stopCamera();
        } else {
            startCamera();
        }
    }

    function startCamera() {
        // Create a new instance of the scanner
        html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader",
            { 
                fps: 10,
                qrbox: {width: 250, height: 250},
                aspectRatio: 1.0
            }
        );

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        startCameraButton.textContent = "Stop Camera";
        isScanning = true;
    }

    function stopCamera() {
        if (html5QrcodeScanner) {
            html5QrcodeScanner.clear();
            html5QrcodeScanner = null;
        }
        startCameraButton.textContent = "Start Camera";
        isScanning = false;
    }

    function onScanSuccess(decodedText, decodedResult) {
        scanResult.textContent = decodedText;
        stopCamera(); // Optional: stop camera after successful scan
    }

    function onScanFailure(error) {
        // Handle scan failure, usually better to just ignore it
        console.warn(`QR code scan failed = ${error}`);
    }
});
