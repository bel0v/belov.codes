import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import dayjs from 'dayjs'

import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const healthCheck = defineAction({
  input: z.void(),
  handler: async () => {
    return {
      status: 'OK',
      uptime: dayjs.duration(process.uptime(), 'second').format('HH:mm:ss'),
      timestamp: Date.now(),
    }
  },
})
