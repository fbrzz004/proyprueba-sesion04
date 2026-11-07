const formulario = document.querySelector('#login-form');
const correo = document.querySelector('#correo');
const clave = document.querySelector('#clave');
const mensaje = document.querySelector('#mensaje');
const botonMostrar = document.querySelector('#mostrar-clave');

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LONGITUD_MINIMA_CLAVE = 8;

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.classList.remove('error', 'exito');
    mensaje.classList.add(tipo);
}

function marcarCampo(campo, tieneError) {
    campo.setAttribute('aria-invalid', tieneError ? 'true' : 'false');
}

function validarCorreo() {
    const valor = correo.value.trim();
    const error = valor === ''
        ? 'El correo no puede quedar vacío.'
        : !CORREO_VALIDO.test(valor)
            ? 'El correo no tiene un formato válido.'
            : '';
    marcarCampo(correo, error !== '');
    return error;
}

function validarClave() {
    const error = clave.value.length < LONGITUD_MINIMA_CLAVE
        ? `La contraseña debe tener al menos ${LONGITUD_MINIMA_CLAVE} caracteres.`
        : '';
    marcarCampo(clave, error !== '');
    return error;
}

botonMostrar.addEventListener('click', () => {
    const visible = clave.type === 'text';
    clave.type = visible ? 'password' : 'text';
    botonMostrar.textContent = visible ? 'Mostrar' : 'Ocultar';
    botonMostrar.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const errorCorreo = validarCorreo();
    const errorClave = validarClave();

    if (errorCorreo !== '') {
        mostrarMensaje(errorCorreo, 'error');
        correo.focus();
        return;
    }

    if (errorClave !== '') {
        mostrarMensaje(errorClave, 'error');
        clave.focus();
        return;
    }

    mostrarMensaje('Acceso de demostración correcto.', 'exito');
});

correo.addEventListener('input', () => {
    if (correo.getAttribute('aria-invalid') === 'true') {
        marcarCampo(correo, false);
    }
});

clave.addEventListener('input', () => {
    if (clave.getAttribute('aria-invalid') === 'true') {
        marcarCampo(clave, false);
    }
});
