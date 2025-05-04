import L from 'leaflet'

import locationPin from '../../assets/icons/location_pin.svg?url'
import locationPinClicked from '../../assets/icons/location_pin_clicked.svg?url'

const BASE_HEIGHT = 140
const BASE_WIDTH = 100

const TARGET_WIDTH = 24
const TARGET_HEIGHT = (BASE_HEIGHT / BASE_WIDTH) * TARGET_WIDTH

export class IconProvider {
  createPinIcon() {
    return L.icon({
      iconUrl: locationPin,
      iconSize: [TARGET_WIDTH, TARGET_HEIGHT],
      iconAnchor: [TARGET_WIDTH / 2, TARGET_HEIGHT],
    })
  }

  createClickedPinIcon() {
    return L.icon({
      iconUrl: locationPinClicked,
      iconSize: [TARGET_WIDTH, TARGET_HEIGHT],
      iconAnchor: [TARGET_WIDTH / 2, TARGET_HEIGHT],
    })
  }
}
