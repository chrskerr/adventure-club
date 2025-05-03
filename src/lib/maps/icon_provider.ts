import L from 'leaflet'

import locationPin from '../../assets/icons/location-pin.png?url'

export class IconProvider {
  createPinIcon() {
    return L.icon({
      iconUrl: locationPin,
      iconSize: [26 * mult, 40 * mult],
      iconAnchor: [13 * mult, 40 * mult],
    })
  }
}
const mult = 0.75
