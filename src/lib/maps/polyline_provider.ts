import maplibregl from 'maplibre-gl'
import { gpx } from '@tmcw/togeojson'

export class PolylineProvider {
  async fromGpxUrl(url: string): Promise<{
    add: (map: maplibregl.Map) => void
    remove: () => void
    getBounds: () => maplibregl.LngLatBounds
  }> {
    // Fetch the GPX file
    const response = await fetch(url)
    const gpxText = await response.text()

    // Parse the GPX text to DOM
    const parser = new DOMParser()
    const gpxDoc = parser.parseFromString(gpxText, 'text/xml')

    // Convert to GeoJSON
    const geoJson = gpx(gpxDoc)

    let sourceId: string | undefined
    let layerId: string | undefined
    let currentMap: maplibregl.Map | undefined

    // Generate unique IDs for this track
    const uniqueId = `gpx-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    sourceId = `source-${uniqueId}`
    layerId = `layer-${uniqueId}`

    // Calculate bounds from GeoJSON
    const bounds = new maplibregl.LngLatBounds()
    if (geoJson.type === 'FeatureCollection') {
      geoJson.features.forEach((feature) => {
        if (feature.geometry.type === 'LineString') {
          feature.geometry.coordinates.forEach((coord) => {
            bounds.extend(coord as [number, number])
          })
        }
      })
    }

    return {
      add: (map: maplibregl.Map) => {
        currentMap = map

        // Add the source if it doesn't exist
        if (!map.getSource(sourceId!)) {
          map.addSource(sourceId!, {
            type: 'geojson',
            data: geoJson,
          })
        }

        // Add the layer if it doesn't exist
        if (!map.getLayer(layerId!)) {
          map.addLayer({
            id: layerId!,
            type: 'line',
            source: sourceId!,
            paint: {
              'line-color': 'black',
              'line-width': 3,
            },
          })
        }
      },
      remove: () => {
        if (currentMap && layerId && sourceId) {
          if (currentMap.getLayer(layerId)) {
            currentMap.removeLayer(layerId)
          }
          if (currentMap.getSource(sourceId)) {
            currentMap.removeSource(sourceId)
          }
        }
      },
      getBounds: () => bounds,
    }
  }
}
