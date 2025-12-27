import { SERVICES } from './services'

export function resolveService(input: string) {
  const key = (input || '').toLowerCase()

  for (const service in SERVICES) {
    if (key.includes(service)) {
      return SERVICES[service]
    }
  }

  return {
    name: input || 'Untitled',
    logo: null,
    category: 'Other',
  }
}
