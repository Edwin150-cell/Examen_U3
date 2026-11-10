import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const regexForm = document.getElementById('regexForm');
  const regexInput = document.getElementById('regexInput');
  const textInput = document.getElementById('textInput');
  const btnClear = document.getElementById('btnClear');

  /** Aqui evaluamos dinámicamente la expresión regular ingresada con el texto. */
  const handleEvaluateRegex = (event) => {
    event.preventDefault();

    const patternVal = regexInput.value.trim();
    const textVal = textInput.value;

    // Validamos los campos vacíos
    if (!patternVal) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo incompleto',
        text: 'Por favor, ingresa una Expresión Regular para evaluar.',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    if (textVal === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Campo incompleto',
        text: 'Por favor, ingresa un texto para comparar.',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    try {
      const regex = new RegExp(patternVal);
      const isMatch = regex.test(textVal);

      if (isMatch) {
        Swal.fire({
          icon: 'success',
          title: '¡Coincidencia Correcta!',
          html: `<p>El texto ingresado <b>CUMPLE</b> con la expresión regular proporcionada.</p>`,
          confirmButtonColor: '#198754'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sin Coincidencia',
          html: `<p>El texto ingresado <b>NO CUMPLE</b> con la expresión regular proporcionada.</p>`,
          confirmButtonColor: '#dc3545'
        });
      }

    } catch (error) {
      // SE anuncia si hay errores si el usuario escribe una ER mal formada
      Swal.fire({
        icon: 'error',
        title: 'Expresión Regular Inválida',
        text: `Error de sintaxis: ${error.message}`,
        confirmButtonColor: '#dc3545'
      });
    }
  };

  /** En este limpiamos los campos de texto sin recargar la página. */
  const handleClearForm = () => {
    regexInput.value = '';
    textInput.value = '';
    regexInput.focus();

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Pantalla limpia',
      showConfirmButton: false,
      timer: 1500
    });
  };

  regexForm.addEventListener('submit', handleEvaluateRegex);
  btnClear.addEventListener('click', handleClearForm);
});