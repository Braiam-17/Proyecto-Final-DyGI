// Función para toggle del menú de navegación en dispositivos móviles
function toggleMenu() {
    const myLinks = document.getElementById("myLinks");
    // Cambia la visualización del menú entre 'block' y 'none'
    myLinks.style.display = (myLinks.style.display === "block") ? "none" : "block";
}

// Evitar que se salga de los campos de texto si están vacíos
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('blur', function() {
        // Verifica si el campo está vacío al perder el foco
        if (this.value.trim() === "") {
            this.focus();
            alert("Este campo es obligatorio");
        }
    });
});

// Controlar que las fechas no se crucen
const fechaNacimiento = document.getElementById('fecha-nacimiento');
const fechaEvento = document.getElementById('fecha-evento');

function controlarFechas() {
    // Si la fecha de nacimiento es posterior a la fecha del evento, ajusta la fecha del evento
    if (fechaNacimiento.value > fechaEvento.value) {
        fechaEvento.value = fechaNacimiento.value;
    }
    // Si la fecha del evento es anterior a la fecha de nacimiento, ajusta la fecha de nacimiento
    if (fechaEvento.value < fechaNacimiento.value) {
        fechaNacimiento.value = fechaEvento.value;
    }
}

// Asignar eventos de cambio a los campos de fecha
fechaNacimiento.addEventListener('change', controlarFechas);
fechaEvento.addEventListener('change', controlarFechas);

// Operación aritmética entre los dos campos numéricos (edad y código postal) y mostrar el resultado
document.getElementById('calcular').addEventListener('click', function() {
    const edad = parseFloat(document.getElementById('edad').value) || 0;
    const codigoPostal = parseFloat(document.getElementById('codigo-postal').value) || 0;
    // Suma los valores de los campos 'edad' y 'codigo-postal'
    const suma = edad + codigoPostal;
    // Muestra el resultado en el recuadro
    document.getElementById('resultado-suma').textContent = 'La suma de la edad y el código postal es: ' + suma;
});


// Botón para marcar todos los elementos del checkbox
document.getElementById('marcar-todos').addEventListener('click', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true; // Marca todos los checkboxes
    });
});

// Botones para convertir el texto de la lista desplegable a mayúsculas y minúsculas
document.getElementById('mayusculas').addEventListener('click', function() {
    document.querySelectorAll('#suscripcion option').forEach(option => {
        option.textContent = option.textContent.toUpperCase(); // Convierte texto a mayúsculas
    });
});

document.getElementById('minusculas').addEventListener('click', function() {
    document.querySelectorAll('#suscripcion option').forEach(option => {
        option.textContent = option.textContent.toLowerCase(); // Convierte texto a minúsculas
    });
});

// Validación del formulario de contacto al hacer submit
document.getElementById('contact-form').addEventListener('submit', validarFormulario);

function validarFormulario(event) {
    event.preventDefault();
    let valid = true;
    let checkedCount = 0;

    // Verificar todos los campos del formulario
    const inputs = this.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('error');
            showError(input, 'Este campo es obligatorio');
            valid = false;
        } else {
            input.classList.remove('error');
            removeError(input);
        }
    });

    // Verificar que al menos dos checkboxes estén marcados
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    if (checkedCount < 2) {
        alert('Debe seleccionar al menos dos intereses.');
        valid = false;
    }

    // Verificar que una opción de la lista desplegable esté seleccionada
    const select = document.getElementById('suscripcion');
    if (select.value === "") {
        alert('Debe seleccionar un tipo de suscripción.');
        valid = false;
    }

    // Mostrar mensaje de éxito o error según la validación
    if (valid) {
        alert('Formulario enviado con éxito');
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

// Mostrar mensaje de error en el formulario
function showError(input, message) {
    let error = document.createElement('div');
    error.className = 'error-message';
    error.innerText = message;
    // Inserta el mensaje de error después del campo con error
    input.parentNode.insertBefore(error, input.nextSibling);
}

// Remover mensaje de error en el formulario
function removeError(input) {
    let error = input.parentNode.querySelector('.error-message');
    if (error) {
        // Elimina el mensaje de error
        input.parentNode.removeChild(error);
    }
}

// Control de carrusel en "Sobre nosotros"
let slideIndex = 0;

function showSlides(index) {
    const slides = document.getElementsByClassName('carousel-item');
    // Control del índice para evitar sobrepasar los límites
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    // Oculta todas las diapositivas y muestra la diapositiva actual
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
}

// Funciones para avanzar y retroceder en el carrusel
function nextSlide() {
    showSlides(slideIndex + 1);
}

function prevSlide() {
    showSlides(slideIndex - 1);
}

// Inicia el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});

// Carrusel de marcas
document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.carousel-track');

    // Clonar las imágenes para un bucle continuo
    const cloneTrack = () => {
        const images = Array.from(track.children);
        images.forEach(img => {
            const clone = img.cloneNode(true);
            track.appendChild(clone);
        });
    };

    cloneTrack();
});
