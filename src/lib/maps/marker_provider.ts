import maplibregl from 'maplibre-gl'

import type { TrailData } from './data_provider'
import type { IconProvider } from './icon_provider'
import type { PolylineProvider } from './polyline_provider'

export class MarkerProvider {
  private markers: {
    marker: maplibregl.Marker
    popup: maplibregl.Popup
    gpx?: any
  }[] = []

  constructor(
    private readonly trailsData: TrailData[],
    private readonly map: maplibregl.Map,
    private readonly iconProvider: IconProvider,
    private readonly polylineProvider: PolylineProvider,
  ) {}

  getMarkers(): maplibregl.Marker[] {
    const iconData = this.iconProvider.createPinIcon()
    const clickedIconData = this.iconProvider.createClickedPinIcon()

    this.markers = this.trailsData.map((trail) => {
      const { id, title, startLatLng, gpxFile, tileImage, distanceKm } = trail

      // Create an HTML element for the marker
      const el = document.createElement('div')
      el.style.backgroundImage = `url(${iconData.url})`
      el.style.width = `${iconData.width}px`
      el.style.height = `${iconData.height}px`
      el.style.backgroundSize = 'contain'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.backgroundPosition = 'center'
      el.style.cursor = 'pointer'

      // Popup content
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
          .maplibregl-popup-content {
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .maplibregl-popup-tip {
            display: none !important;
          }
          a, a:visited {
            color: #000 !important;
          }
        </style>
      `

      // Create popup but don't attach it yet
      const popup = new maplibregl.Popup({
        offset: [0, -20],
        closeButton: false,
        maxWidth: 'none',
      }).setHTML(popupContent)

      // Create marker - note the coordinate order change [lng, lat]
      const marker = new maplibregl.Marker(el)
        .setLngLat([startLatLng[1], startLatLng[0]])
        .setPopup(popup)
        .addTo(this.map)

      let gpx: any = undefined

      // Custom event handlers for showing/hiding GPX track
      marker.getElement().addEventListener('click', async () => {
        // Change the marker icon when clicked
        el.style.backgroundImage = `url(${clickedIconData.url})`

        if (gpxFile && !gpx) {
          gpx = await this.polylineProvider.fromGpxUrl(gpxFile)
          gpx.add(this.map)
        }
      })

      // When popup closes, reset the marker and remove GPX
      popup.on('close', () => {
        el.style.backgroundImage = `url(${iconData.url})`

        if (gpx) {
          gpx.remove()
          gpx = undefined
        }
      })

      return { marker, popup, gpx }
    })

    return this.markers.map((m) => m.marker)
  }
}
