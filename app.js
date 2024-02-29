document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const listeningText = document.getElementById('listeningText');
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
// Hola 
    recognition.lang = 'es-ES';

    recognition.onstart = function () {
        listeningText.innerHTML = 'Escuchando...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        resultDiv.innerHTML = `<strong>Resultado:</strong> ${transcript}`;
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz:', event.error);
    };

    recognition.onend = function () {
        listeningText.innerHTML = 'Fin de la escucha';
    };

    startBtn.addEventListener('click', function () {
        recognition.start();
    });
});

