/** Contraseña que elige la propia persona. El administrador nunca la escribe. */
export const PASSWORD_HINT =
  "Al menos 10 caracteres, con una letra y un número.";

/**
 * @param {string} password
 */
export function passwordIsAcceptable(password) {
  if (typeof password !== "string") return false;
  if (password.length < 10 || password.length > 128) return false;
  if (!/[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
}
