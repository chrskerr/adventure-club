import type { CollectionEntry } from 'astro:content'

export type TrailData = {
  id: string
  title: string
  startLatLng: [number, number]
  gpxFile: string | undefined
  tileImage?: string
  distanceKm: number
}
export class MapDataProvider {
  serializeData({
    trailsCollection,
  }: {
    trailsCollection: CollectionEntry<'trails'>[]
  }) {
    return JSON.stringify(
      trailsCollection.map<TrailData>((trail) => ({
        id: trail.id,
        title: trail.data.title,
        startLatLng: trail.data.startLatLng,
        gpxFile: trail.data.gpxFile,
        tileImage: trail.data.tileImage?.src,
        distanceKm: trail.data.distanceKm,
      })),
    )
  }

  deserializeData(jsonString: string) {
    return JSON.parse(jsonString) as TrailData[]
  }
}
