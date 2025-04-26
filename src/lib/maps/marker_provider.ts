import L from 'leaflet'

import type { TrailData } from './data_provider'
import type { IconProvider } from './icon_provider'
import type { PolylineProvider } from './polyline_provider'

export class MarkerProvider {
  constructor(
    private readonly trailsData: TrailData[],
    private readonly map: L.Map,
    private readonly iconProvider: IconProvider,
    private readonly polylineProvider: PolylineProvider,
  ) {}

  getMarkers(): L.Marker[] {
    const icon = this.iconProvider.createPinIcon()
    return this.trailsData.map((trail) => {
      const { id, title, startLatLng, gpxFile } = trail

      const popupContent = `<a href="/trails/${id}">${title}</a>`
      const marker = L.marker(startLatLng, { icon }).bindPopup(popupContent)

      let gpx: L.GPX | undefined
      marker.on('popupopen', async () => {
        if (trail.gpxFile) {
          if (gpx == null) {
            gpx = await this.polylineProvider.fromGpxUrl(trail.gpxFile)
          }
          gpx.addTo(this.map)
        }
      })

      marker.on('popupclose', () => {
        gpx?.remove()
        gpx = undefined
      })

      return marker
    })
  }

  getMarkerBounds(): L.LatLngBoundsExpression {
    let minLat = -Infinity
    let maxLat = Infinity
    let minLng = -Infinity
    let maxLng = Infinity

    for (const {
      startLatLng: [lat, lng],
    } of this.trailsData) {
      minLat = Math.max(minLat, lat)
      maxLat = Math.min(maxLat, lat)
      minLng = Math.max(minLng, lng)
      maxLng = Math.min(maxLng, lng)
    }

    return [
      [minLat, minLng],
      [maxLat, maxLng],
    ]
  }
}
