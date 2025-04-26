import L from 'leaflet'

import markerIcon from './assets/marker-icon.png?url'
import markerIcon2x from './assets/marker-icon-2x.png?url'
import markerShadow from './assets/marker-shadow.png?url'

export class IconProvider {
  createPinIcon() {
    return L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      shadowUrl: markerShadow,
    })
  }
}
