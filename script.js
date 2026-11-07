const formulario = document.querySelector('#login-form');
const correo = document.querySelector('#correo');
const clave = document.querySelector('#clave');
const mensaje = document.querySelector('#mensaje');
const botonMostrar = document.querySelector('#mostrar-clave');

botonMostrar.addEventListener('click', () => {
    const visible = clave.type === 'text';
    clave.type = visible ? 'password' : 'text';
    botonMostrar.textContent = visible ? 'Mostrar' : 'Ocultar';
    botonMostrar.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (correo.value === '' || clave.value === '') {
        mensaje.textContent = 'Complete todos los campos.';
        return;
    }

    if (clave.value.length < 6) {
        mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    }

    mensaje.textContent = 'Acceso de demostración correcto.';
    formulario.reset();
});
