let termsAccepted = false;
let modalCallback = null;

// Sistema de Notificaciones propio
function customAlert(msg, callback = null) {
    const modal = document.getElementById('custom-modal');
    const text = document.getElementById('modal-text');
    text.innerText = msg;
    modalCallback = callback;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('custom-modal').classList.add('hidden');
    if (modalCallback) {
        modalCallback();
        modalCallback = null;
    }
}

function showScreen(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    const screen = document.getElementById(id);
    if (screen) screen.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function validateRecovery() {
    const input = document.getElementById('recovery-user');
    const btn = document.getElementById('next-forgot-btn');
    const hasValue = input.value.trim().length > 0;
    document.getElementById('fake-error').classList.toggle('hidden', hasValue);
    btn.disabled = !hasValue;
}

function failRecovery() {
    customAlert("¡Oh no! Parece que te hemos perdido en nuestra base de datos. Crea una cuenta nueva.", () => {
        showScreen('register-screen');
    });
}

function acceptTerms() {
    termsAccepted = true;
    showScreen('register-screen');
    document.getElementById('consent-msg').classList.remove('hidden');
}

function rejectTerms() {
    customAlert("No podemos dejar que continúes sin aceptar nuestros términos y condiciones.", () => {
        showScreen('login-screen');
    });
}

function validateRegister() {
    const name = document.getElementById('reg-name').value;
    if (!name) {
        customAlert("Por favor rellene su identidad, no es posible registrar a un don nadie.");
    } else if (!termsAccepted) {
        customAlert("Lee los términos y condiciones antes de continuar.");
    } else {
        showScreen('quiz-screen');
    }
}

function submitQuiz() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');

    if (!q1 || !q2 || !q3) {
        customAlert("Cuestionario incompleto. No intente evadir sus responsabilidades legales.");
        return;
    }

    if (q1.value === "correct" && q2.value === "correct" && q3.value === "correct") {
        customAlert("¡Cuenta creada con éxito! Redirigiendo a la pantalla de inicio...", () => {
            location.reload(); // Éxito: Reiniciamos para que vea el inicio
        });
    } else {
        customAlert("Parece más que obvio que no leíste los términos y condiciones y por consecuencia tendrás que empezar de cero.", () => {
            location.reload(); // Fracaso: Empezar de cero real
        });
    }
}
