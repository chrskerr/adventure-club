import locationPin from '../../assets/icons/location_pin.svg?url'
import locationPinClicked from '../../assets/icons/location_pin_clicked.svg?url'

const BASE_HEIGHT = 140
const BASE_WIDTH = 100

const TARGET_WIDTH = 24
const TARGET_HEIGHT = (BASE_HEIGHT / BASE_WIDTH) * TARGET_WIDTH

export class IconProvider {
  createPinIcon() {
    // Return the URL instead of a Leaflet icon
    return {
      url: locationPin,
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
    }
  }

  createClickedPinIcon() {
    // Return the URL instead of a Leaflet icon
    return {
      url: locationPinClicked,
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
    }
  }
}
