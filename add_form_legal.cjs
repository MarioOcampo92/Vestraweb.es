const fs = require('fs');

const legalText = `            <div class="legal-consent" style="margin-bottom: 1.5rem; text-align: left; font-size: 0.85rem; color: var(--color-text-light); line-height: 1.4;">
                <p style="margin-bottom: 0.5rem;"><strong>Responsable:</strong> MARIO FERNANDO OCAMPO QUINTERO. <strong>Finalidad:</strong> Responder a su consulta. <strong>Legitimación:</strong> Consentimiento del interesado. <strong>Derechos:</strong> Tiene derecho a acceder, rectificar y suprimir sus datos escribiendo a info@vestraweb.es. Más info en nuestra <a href="/privacidad" target="_blank" style="color: var(--color-primary); text-decoration: underline;">Política de Privacidad</a>.</p>
                <label style="display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="legal_accept" required style="margin-top: 0.25rem;">
                    <span>He leído y acepto la Política de Privacidad.</span>
                </label>
            </div>
`;

function injectLegalText(filename, buttonClass) {
    let content = fs.readFileSync(filename, 'utf8');
    const buttonHtml = `<button type="submit" class="${buttonClass}">Enviar Mensaje</button>`;
    
    if (!content.includes('name="legal_accept"')) {
        content = content.replace(buttonHtml, legalText + '            ' + buttonHtml);
        fs.writeFileSync(filename, content, 'utf8');
        console.log('Injected legal text into', filename);
    } else {
        console.log('Legal text already present in', filename);
    }
}

injectLegalText('index.html', 'btn-submit');
injectLegalText('contactar.html', 'btn-contact-submit');

