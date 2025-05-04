import maplibregl from 'maplibre-gl'

export class MapInstaller {
  constructor(private readonly bounds: maplibregl.LngLatBounds) {}

  installMap({ targetDivId }: { targetDivId: string }): maplibregl.Map {
    const map = new maplibregl.Map({
      container: targetDivId,
      style: 'https://tiles.stadiamaps.com/styles/outdoors.json', // Style URL; see our documentation for more options
      center: [12, 53], // Initial focus coordinate
      minZoom: 6,
      maxBounds: [
        [144, -45],
        [150, -40],
      ],
      bounds: this.bounds,
      fitBoundsOptions: {
        padding: 50,
      },
    })

    return map
  }
}
