import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const trails = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/trails' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tileImage: image().optional(),
      gpxFile: z.string().optional(),

      region: z.enum(['South East', 'South', 'Hobart', 'South West']),
      startLatLng: z.tuple([z.number(), z.number()]),

      distanceKm: z.number().gt(0),
      elevationGainM: z.number().gt(0),
      type: z.string(),
    }),
})

const activityFeedItems = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/activity_feed_items',
  }),
  schema: z.object({
    date: z.string().date(),
    time: z.string().time(),
    tileImage: z.string().optional(), // how do we make this work??

    trailId: z.string().optional(), // comes from the file name, minus the .mdx bit
  }),
})

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/events' }),
  schema: z.object({
    date: z.string().date(),
    time: z.string().time(),
    tileImage: z.string().optional(), // how do we make this work??

    trailId: z.string(), // comes from the file name, minus the .mdx bit
    meetingLatLng: z.tuple([z.number(), z.number()]).optional(),
  }),
})

export const collections = {
  trails,
  activityFeedItems,
  events,
}
