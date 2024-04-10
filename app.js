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
        const transcript = event.results[0][0].transcript.toLowerCase(); // Convertir a minúsculas para facilitar la comparación
        const keywords = ['tamaño 3', 'abrir una pestaña', 'ir a una página', 'modificar ventana', 'cerrar una pestaña', 'cerrar navegador']; // Array de palabras clave

        resultDiv.innerHTML = `<strong>Resultado:</strong> ${transcript}`;

        let ordenDetectada = '';

        // Verificar si alguna palabra clave está presente en la transcripción
        for (let i = 0; i < keywords.length; i++) {
            if (transcript.includes(keywords[i])) {
                ordenDetectada = keywords[i];
                switch (keywords[i]) {
                    case 'tamaño 3':
                        controltexto.classList.add("fs-1");
                        controltexto.style.color = "red";
                        console.log("Se encontró la palabra 'tamaño 3'.");
                        break;
                    case 'abrir una pestaña':
                        // Abre una nueva pestaña en el navegador
                        window.open('https://www.google.com/', '_blank');
                        console.log("Se detectó 'abrir una pestaña'.");
                        break;
                    case 'ir a una página':
                        // Abre la página en una nueva pestaña
                        window.open('https://www.youtube.com/', '_blank');
                        console.log("Se detectó 'ir a una página'.");
                        break;
                    case 'modificar ventana':
                        window.resizeTo(800, 600); // Modifica el tamaño de la ventana del navegador
                        console.log("Se detectó 'modificar ventana'.");
                        break;
                    case 'cerrar una pestaña':
                        // Abre una nueva pestaña y cierra la actual
                        window.open('about:blank', '_self').close();
                        console.log("Se detectó 'cerrar una pestaña'.");
                        break;
                    case 'cerrar navegador':
                        window.close(); // Cierra el navegador
                        console.log("Se detectó 'cerrar navegador'.");
                        break;
                    // Agrega más casos según sea necesario
                }
            }
        }

        // Envía la orden detectada a la base de datos MockAPI junto con la hora actual
        if (ordenDetectada !== '') {
            const horaActual = obtenerHoraActual();
            enviarDatosAFirebase(ordenDetectada, horaActual);
        }
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

    // Función para obtener la hora actual en formato HH:MM:SS
    function obtenerHoraActual() {
        const ahora = new Date();
        const horas = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        const segundos = ahora.getSeconds().toString().padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    }

    // Función para enviar los datos a la base de datos MockAPI
    function enviarDatosAFirebase(orden, hora) {
        // Datos que deseas enviar a la base de datos
        const data = {
            orden: orden,
            hora: hora
        };

        // Opciones para la solicitud fetch
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // URL de tu API de MockAPI
        const url = 'https://631f96f822cefb1edc4eda3a.mockapi.io/Ordenes';

        // Realizar la solicitud fetch para enviar los datos a la API
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos a la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('La orden se envió correctamente:', data);
                // Realizar cualquier otra acción que necesites después de enviar los datos
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});










