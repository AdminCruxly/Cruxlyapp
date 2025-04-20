interface FormData {
    [key: string]: any;
}

/**
 * Valida que los campos requeridos no estén vacíos
 * @param data Objeto con los datos del formulario
 * @param requiredFields Array con los nombres de los campos requeridos
 * @returns boolean indicando si todos los campos requeridos están completos
 */
export function validateRequiredFields(data: FormData, requiredFields: string[]): boolean {
    for (const field of requiredFields) {
        const value = data[field];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            // Marcar el campo como error
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
 * @param value Valor a convertir
 * @param defaultValue Valor por defecto si la conversión falla
 * @returns número positivo o el valor por defecto
 */
export function toPositiveNumber(value: string | number, defaultValue: number = 0): number {
    const num = Number(value);
    return !isNaN(num) && num >= 0 ? num : defaultValue;
}

/**
 * Sanitiza una cadena de texto
 * @param value Valor a sanitizar
 * @returns string sanitizado
 */
export function sanitizeString(value: string): string {
    return value.trim().replace(/[<>]/g, '');
}

/**
 * Valida que un valor esté dentro de un rango
 * @param value Valor a validar
 * @param min Valor mínimo
 * @param max Valor máximo
 * @returns boolean indicando si el valor está en el rango
 */
export function validateRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

/**
 * Formatea un mensaje de error
 * @param field Nombre del campo
 * @param message Mensaje de error
 * @returns string con el mensaje formateado
 */
export function formatErrorMessage(field: string, message: string): string {
    return `Error en ${field}: ${message}`;
}

/**
 * Muestra un mensaje de error en el elemento especificado
 * @param elementId ID del elemento donde mostrar el error
 * @param message Mensaje de error
 */
export function showError(elementId: string, message: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.add('error-message');
    }
}

/**
 * Limpia los mensajes de error
 * @param elementId ID del elemento donde limpiar el error
 */
export function clearError(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.remove('error-message');
    }
}