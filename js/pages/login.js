/* ========================================
   LOGIN.JS — Login Page
   ======================================== */

import { auth } from '../auth.js';
import { router } from '../router.js';

export function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="login-layout">
            <div class="login-card">
                <div class="login-logo">
                    <div class="login-logo-icon">
                        <i data-lucide="activity"></i>
                    </div>
                    <h1>MonitoreoIoT</h1>
                    <p>Sistema de Monitoreo Ambiental</p>
                </div>

                <!-- LOGIN CONTAINER -->
                <div id="login-container">
                    <div class="login-error" id="login-error">
                        <i data-lucide="alert-circle" style="width:16px;height:16px;flex-shrink:0;"></i>
                        <span id="login-error-msg">Error</span>
                    </div>
                    <form class="login-form" id="login-form">
                        <div class="form-group">
                            <label class="form-label">Usuario</label>
                            <input type="text" class="form-input" id="login-username" placeholder="Ingresa tu usuario" autocomplete="username" required>
                        </div>
                        <div class="form-group">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <label class="form-label" style="margin-bottom: 0;">Contraseña</label>
                                <a href="#" id="to-recover" style="font-size: 0.8rem; color: var(--primary-light); text-decoration: none;">¿Olvidaste tu contraseña?</a>
                            </div>
                            <div class="password-input-wrapper">
                                <input type="password" class="form-input" id="login-password" placeholder="Ingresa tu contraseña" autocomplete="current-password" required>
                                <button type="button" class="password-toggle" id="password-toggle" title="Mostrar/Ocultar contraseña">
                                    <i data-lucide="eye"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary login-btn" id="login-submit">
                            <i data-lucide="log-in"></i> Iniciar Sesión
                        </button>
                    </form>
                </div>

                <!-- RECOVERY CONTAINER -->
                <div id="recover-container" style="display:none;">
                    <div style="text-align: center; margin-bottom: var(--space-md);">
                        <h2 style="font-size: 1.2rem; color: var(--text-primary);">Restablecer Contraseña</h2>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Ingresa tus datos registrados</p>
                    </div>
                    <div class="login-error" id="recover-error">
                        <i data-lucide="alert-circle" style="width:16px;height:16px;flex-shrink:0;"></i>
                        <span id="recover-error-msg">Error</span>
                    </div>
                    <div class="login-success" id="recover-success">
                        <i data-lucide="check-circle" style="width:16px;height:16px;flex-shrink:0;"></i>
                        <span id="recover-success-msg">Éxito</span>
                    </div>
                    <form class="login-form" id="recover-form">
                        <div class="form-group">
                            <label class="form-label">Usuario</label>
                            <input type="text" class="form-input" id="recover-username" placeholder="Ingresa tu usuario" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-input" id="recover-email" placeholder="correo@ejemplo.com" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nueva Contraseña</label>
                            <div class="password-input-wrapper">
                                <input type="password" class="form-input" id="recover-password" placeholder="Ingresa la nueva contraseña" required>
                                <button type="button" class="password-toggle" id="recover-password-toggle" title="Mostrar/Ocultar contraseña">
                                    <i data-lucide="eye"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary login-btn" id="recover-submit" style="background: linear-gradient(135deg, var(--accent), var(--primary));">
                            <i data-lucide="key"></i> Restablecer Clave
                        </button>
                        <button type="button" class="btn btn-secondary login-btn" id="to-login" style="margin-top: 10px; width: 100%;">
                            <i data-lucide="arrow-left"></i> Volver al Login
                        </button>
                    </form>
                </div>

                <div class="login-footer">
                    <p>© 2026 MonitoreoIoT — Proyecto Académico</p>
                </div>
            </div>
        </div>
    `;

    if (window.lucide) lucide.createIcons();

    // Toggle views
    const loginContainer = document.getElementById('login-container');
    const recoverContainer = document.getElementById('recover-container');
    const toRecoverLink = document.getElementById('to-recover');
    const toLoginBtn = document.getElementById('to-login');

    toRecoverLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        recoverContainer.style.display = 'block';
        document.getElementById('recover-username').focus();
    });

    toLoginBtn.addEventListener('click', () => {
        recoverContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        document.getElementById('login-username').focus();
    });

    // Login logic
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('login-submit');
        const errorDiv = document.getElementById('login-error');
        const errorMsg = document.getElementById('login-error-msg');

        if (!username || !password) {
            errorDiv.classList.add('show');
            errorMsg.textContent = 'Por favor completa todos los campos';
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;"></span> Ingresando...';
        errorDiv.classList.remove('show');

        try {
            await auth.login(username, password);
            router.navigate('/dashboard');
        } catch (err) {
            errorDiv.classList.add('show');
            errorMsg.textContent = 'Usuario o contraseña incorrectos';
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="log-in"></i> Iniciar Sesión';
            if (window.lucide) lucide.createIcons();
        }
    });

    // Recover logic
    const recoverForm = document.getElementById('recover-form');
    recoverForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('recover-username').value.trim();
        const email = document.getElementById('recover-email').value.trim();
        const newPassword = document.getElementById('recover-password').value;
        const btn = document.getElementById('recover-submit');
        const errorDiv = document.getElementById('recover-error');
        const errorMsg = document.getElementById('recover-error-msg');
        const successDiv = document.getElementById('recover-success');
        const successMsg = document.getElementById('recover-success-msg');

        if (!username || !email || !newPassword) {
            errorDiv.classList.add('show');
            errorMsg.textContent = 'Por favor completa todos los campos';
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;"></span> Procesando...';
        errorDiv.classList.remove('show');
        successDiv.classList.remove('show');

        try {
            const res = await auth.recuperarPassword(username, email, newPassword);
            successDiv.classList.add('show');
            successMsg.textContent = res.message || 'Contraseña restablecida correctamente.';
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="key"></i> Restablecer Clave';
            recoverForm.reset();
            if (window.lucide) lucide.createIcons();
        } catch (err) {
            errorDiv.classList.add('show');
            errorMsg.textContent = err.message || 'No se pudo restablecer la contraseña';
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="key"></i> Restablecer Clave';
            if (window.lucide) lucide.createIcons();
        }
    });

    // Password visibility toggles
    const setupPasswordToggle = (inputEl, toggleEl) => {
        toggleEl.addEventListener('click', () => {
            const type = inputEl.getAttribute('type') === 'password' ? 'text' : 'password';
            inputEl.setAttribute('type', type);
            const iconName = type === 'password' ? 'eye' : 'eye-off';
            toggleEl.innerHTML = `<i data-lucide="${iconName}"></i>`;
            if (window.lucide) lucide.createIcons();
        });
    };

    setupPasswordToggle(
        document.getElementById('login-password'),
        document.getElementById('password-toggle')
    );
    
    setupPasswordToggle(
        document.getElementById('recover-password'),
        document.getElementById('recover-password-toggle')
    );

    document.getElementById('login-username').focus();
}
