export const appConfig = {
  name: 'Peluquería Norma Jeane',
  description: 'Sistema de gestión para peluquería',
  version: '1.0.0',
  locale: 'es-ES',
  timezone: 'America/Argentina/Buenos_Aires',
}

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
}
