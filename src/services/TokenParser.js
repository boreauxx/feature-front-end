export function parseToken(token) {
    if (!token) { return }
    const base64URL = token.split('.')[1];
    const base64 = base64URL.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64));
}