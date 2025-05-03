import L from 'leaflet'

import locationPin from '../../assets/icons/location-pin.png?url'

export class IconProvider {
  createPinIcon() {
    return L.icon({
      iconUrl: locationPin,
      iconSize: [40, 48],
      iconAnchor: [15, 30],
    })
  }
}
