import { useEffect, useState } from 'react'
import {
  getItemsCategories,
  type IItemCategory,
  type IItem,
} from '../../api/map-data'
import ItemMarker from './ItemsMarker'
import { BASE_URL } from '../../utils/consts'
import CategoryCluster from './CategoryCluster'

export default function ItemsMarkerList({ items }: { items?: IItem[] }) {
  const [categories, setCategories] = useState<IItemCategory[]>()

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getItemsCategories()
        setCategories(categories)
        return categories
      } catch (error) {
        console.log('error', error)
      }
    }
    loadCategories()
  }, [])

  return categories?.map(({ id, image }) => (
    <CategoryCluster key={id} image={generateIconData(image)}>
      {items
        ?.filter(i => i.category === id)
        .map(item => (
          <ItemMarker
            name={item.name}
            description={item.description}
            x={item.x}
            y={item.y}
            key={item.id}
            icon={generateIconData(image)}
          />
        ))}
    </CategoryCluster>
  ))
}

function generateIconData(image: string): {
  url: string
  size: [number, number]
} {
  return {
    url: BASE_URL + (image ?? '/images/icondd1.png'),
    size: [40, 40],
  }
}
