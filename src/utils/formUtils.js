/**
 * Valida que los campos requeridos no estén vacíos
 * @param {Object} data - Objeto con los datos del formulario
 * @param {string[]} requiredFields - Array con los nombres de los campos requeridos
 * @returns {boolean} - Indica si todos los campos requeridos están completos
 */
export function validateRequiredFields(data, requiredFields) {
    for (const field of requiredFields) {
        const value = data[field];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            const element = document.getElementById(field);
            if (element) {
                element.classList.add('error');
                element.addEventListener('input', () => {
                    element.classList.remove('error');
                }, { once: true });
            }
            return false;
        }
    }
    return true;
}

/**
 * Convierte un valor a número positivo
 * @param {string|number} value - Valor a convertir
 * @param {number} defaultValue - Valor por defecto si la conversión falla
 * @returns {number} - número positivo o el valor por defecto
 */
export function toPositiveNumber(value, defaultValue = 0) {
    const num = Number(value);
    return !isNaN(num) && num >= 0 ? num : defaultValue;
}

/**
 * Sanitiza una cadena de texto
 * @param {string} value - Valor a sanitizar
 * @returns {string} - string sanitizado
 */
export function sanitizeString(value) {
    return value.trim().replace(/[<>]/g, '');
}

/**
 * Valida que un valor esté dentro de un rango
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} - indica si el valor está en el rango
 */
export function validateRange(value, min, max) {
    return value >= min && value <= max;
}

/**
 * Formatea un mensaje de error
 * @param {string} field - Nombre del campo
 * @param {string} message - Mensaje de error
 * @returns {string} - mensaje formateado
 */
export function formatErrorMessage(field, message) {
    return `Error en ${field}: ${message}`;
}

/**
 * Muestra un mensaje de error en el elemento especificado
 * @param {string} elementId - ID del elemento donde mostrar el error
 * @param {string} message - Mensaje de error
 */
export function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.add('error-message');
    }
}

/**
 * Limpia los mensajes de error
 * @param {string} elementId - ID del elemento donde limpiar el error
 */
export function clearError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.remove('error-message');
    }
}