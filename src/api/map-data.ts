import requestLib from '../lib/request'
import { BASE_URL } from '../utils/consts'

// Types
export interface IItem {
  id: string
  category: string
  name: string
  image?: string | null
  imageSize?: number | null
  x: number
  y: number
  hasLabel?: boolean | null
  hasPageLink?: boolean | null
  hasCoordsLink?: boolean | null
  clickable?: boolean | null
  description: string
}

export interface IItemCategory {
  id: string
  name: string
  image: string
  loadDefault: boolean
}

// Global
const fetchItemsPromise = () =>
  requestLib.get<IItem[]>(BASE_URL + '/map/data/items.json')
const fetchCategoriesPromise = () =>
  requestLib.get<IItemCategory[]>(BASE_URL + '/map/data/categories.json')

// MapsLayer
enum MapsLayer {
  World = 'world',
  Unmoored = 'unmoored',
}

export const mapBounds: [number, number][] = [
  [-70, -100],
  [70, 100],
]

export const mapsLayersUrl: { [keys in MapsLayer]: string } = {
  [MapsLayer.World]: BASE_URL + '/map/tiles/world/{z}/{x}/{y}.jpg',
  [MapsLayer.Unmoored]: BASE_URL + '/map/tiles/unmoored-world/{z}/{x}/{y}.jpg',
}

export const getItems = async ({ categoryId }: { categoryId: string }) => {
  console.log('getItems', { category: categoryId })
  const filtered = (await fetchItemsPromise()).filter(
    i => i.category === categoryId
  )
  console.log('getItems', { filtered })
  return filtered
}

/**
 *
 * @returns categories
 */
export const getItemsCategories = async () => {
  const categories = await fetchCategoriesPromise()
  return categories
}
