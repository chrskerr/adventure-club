import L from 'leaflet'

export class MapInstaller {
  installMap({ targetDivId }: { targetDivId: string }): L.Map {
    const map = L.map(targetDivId)
      .setMaxBounds([
        [-45, 144],
        [-40, 150],
      ])
      .setMinZoom(7)

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}',
      {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        // @ts-ignore
        ext: 'png',
      },
    ).addTo(map)

    return map
  }
}
