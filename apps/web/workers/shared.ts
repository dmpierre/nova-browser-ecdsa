export const WEBSITE_ROOT = process.env.NODE_ENV == 'production' ? 'https://nova-browser-ecdsa-web.vercel.app/' : 'http://localhost:3000/';
export const ctx: Worker = self as unknown as Worker;