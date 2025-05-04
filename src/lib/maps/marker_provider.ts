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
    const clickedIcon = this.iconProvider.createClickedPinIcon()

    return this.trailsData.map((trail) => {
      const { id, title, startLatLng, gpxFile, tileImage, distanceKm } = trail

      // Popup content with image, title, and distance
      const popupContent = `
        <a href="/trails/${id}">
          <div class="w-[250px] border-2 border-black rounded-xl bg-white shadow-lg overflow-hidden p-0 m-0 flex flex-col no-underline text-black transition-colors duration-150 hover:bg-bg cursor-pointer"
          style="color: #000 !important;"
        >
          <div class="w-full h-[120px] overflow-hidden flex-shrink-0">
            <img src="${tileImage || ''}" alt="${title}" class="w-full h-full object-cover block" />
          </div>
          <div class="px-3 pt-2 pb-2 flex flex-col gap-1">
            <div class="font-bold text-base truncate" title="${title}">${title}</div>
            <div class="text-gray-500 text-[0.97rem] whitespace-nowrap">${distanceKm}km</div>
          </div>
        </a>
        <style>
          .leaflet-popup-content-wrapper,
          .leaflet-popup-content {
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .leaflet-popup-content {
            width: auto !important;
            min-width: 0 !important;
            max-width: none !important;
          }
          .leaflet-popup-tip {
            display: none !important;
          }
          .leaflet-popup-content a,
          .leaflet-popup-content a:visited {
            color: #000 !important;
          }
        </style>
      `
      const popup = L.popup({
        content: popupContent,
        offset: [0, -20],
        closeButton: false,
      })
      const marker = L.marker(startLatLng, { icon }).bindPopup(popup)

      let gpx: L.GPX | undefined
      marker.on('popupopen', async () => {
        marker.setIcon(clickedIcon)

        if (gpxFile) {
          if (gpx == null) {
            gpx = await this.polylineProvider.fromGpxUrl(gpxFile)
          }
          gpx.addTo(this.map)
        }
      })

      marker.on('popupclose', () => {
        marker.setIcon(icon)

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
