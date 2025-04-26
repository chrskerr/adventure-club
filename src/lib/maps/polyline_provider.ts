import L from 'leaflet'
import 'leaflet-gpx'

type Loadable = {
  on: (event: 'loaded', cb: () => void) => void
}

export class PolylineProvider {
  async fromGpxUrl(url: string) {
    return this.promisify(
      new L.GPX(url, {
        async: true,
        // @ts-expect-error
        markers: { startIcon: undefined, endIcon: undefined },
        polyline_options: { color: 'var(--color-sky-600)' },
      }),
    )
  }

  private promisify<T extends Loadable>(target: T): Promise<T> {
    return new Promise<T>((resolve) => {
      target.on('loaded', () => resolve(target))
    })
  }
}
