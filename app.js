const controltexto = document.getElementById('controltexto');

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const listeningText = document.getElementById('listeningText');
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onstart = function () {
        listeningText.innerHTML = 'Escuchando...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        const keyword = 'tamaño 3';
        const keyword1 = 'Cerrar pestaña';
        resultDiv.innerHTML = `<strong>Resultado:</strong> ${transcript}`;

        if (transcript.includes(keyword)){
            controltexto.classList.add("fs-1");
            controltexto.style.color = "red";
            console.log("Se encontró la palabra 'tamaño 3'.");
        } 

        

        if (transcript.includes(keyword1)) {
            window.close();
        }

        // Envía la frase a la base de datos MockAPI
        enviarFraseAFirebase(transcript);
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

    // Función para enviar la frase a la base de datos MockAPI
    function enviarFraseAFirebase(frase) {
        // Datos que deseas enviar a la base de datos
        var data = {
            frase: frase
        };

        // Opciones para la solicitud fetch
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // URL de tu API de MockAPI
        var url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/RecVoz';

        // Realizar la solicitud fetch para enviar los datos a la API
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos a la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('Los datos se enviaron correctamente:', data);
                // Realizar cualquier otra acción que necesites después de enviar los datos
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

