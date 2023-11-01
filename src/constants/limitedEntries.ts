import { main_en_gb_13_21 } from './main_en_gb_13_21'

export const limitedEntries: {[entryId: string]: string} = Object.fromEntries(Object.entries(main_en_gb_13_21.entries).slice(500, 550))
