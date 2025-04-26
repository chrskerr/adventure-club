import L from 'leaflet'

export class MapCreator {
  createMap({ targetDivId }: { targetDivId: string }): L.Map {
    const map = L.map(targetDivId)
      .setMaxBounds([
        [-45, 144],
        [-40, 150],
      ])
      .setMinZoom(7)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      },
    ).addTo(map)

    return map
  }
}
