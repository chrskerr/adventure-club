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
      const { id, title, startLatLng, gpxFile, tileImage, distanceKm } = trail

      // Popup content with image, title, and distance
      const popupContent = `
        <a href="/trails/${id}" class="trail-popup-link-box">
          <div class="trail-popup-box">
            <div class="trail-popup-img-container">
              <img src="${tileImage || ''}" alt="${title}" class="trail-popup-img" />
            </div>
            <div class="trail-popup-content">
              <div class="trail-popup-title">${title}</div>
              <div class="trail-popup-distance">${distanceKm}km</div>
            </div>
          </div>
        </a>
        <style>
          .trail-popup-link-box {
            display: block;
            text-decoration: none;
            color: inherit;
            cursor: pointer;
          }
          .trail-popup-link-box:hover .trail-popup-box {
            background: #f5f5f5;
          }
          .trail-popup-box {
            width: 300px;
            border: 2px solid #000;
            border-radius: 12px;
            background: #fff;
            box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12);
            overflow: hidden;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            transition: background 0.15s;
          }
          .trail-popup-img-container {
            width: 100%;
            height: 120px;
            overflow: hidden;
            flex-shrink: 0;
          }
          .trail-popup-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .trail-popup-content {
            padding: 10px 12px 8px 12px;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .trail-popup-title {
            font-weight: bold;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
          .trail-popup-distance {
            color: #888;
            font-size: 0.95rem;
            margin-top: 2px;
            white-space: nowrap;
            flex-shrink: 0;
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
        if (gpxFile) {
          if (gpx == null) {
            gpx = await this.polylineProvider.fromGpxUrl(gpxFile)
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
