export const SERVICES: Record<string, any> = {
  netflix: {
    name: 'Netflix',
    logo: require('../assets/logos/netflix.png'),
    category: 'Streaming',
  },
  prime: {
    name: 'Amazon Prime',
    logo: require('../assets/logos/prime.png'),
    category: 'Streaming',
  },
  disney: {
    name: 'Disney+',
    logo: require('../assets/logos/disney.png'),
    category: 'Streaming',
  },
  apple: {
    name: 'Apple TV+',
    logo: require('../assets/logos/appletv.png'),
    category: 'Streaming',
  },
  hulu: {
    name: 'Hulu',
    logo: require('../assets/logos/hulu.png'),
    category: 'Streaming',
  },
  paramount: {
    name: 'Paramount+',
    logo: require('../assets/logos/paramount.png'),
    category: 'Streaming',
  },
  // spotify asset not present yet; keep a fallback entry
  spotify: {
    name: 'Spotify',
    logo: null,
    category: 'Music',
  },
}
