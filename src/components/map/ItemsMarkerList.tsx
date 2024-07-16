import { useEffect, useState } from 'react'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { DivIcon } from 'leaflet'
import {
  getItemsCategories,
  type IItemCategory,
  type IItem,
} from '../../api/map-data'
import ItemMarker from './ItemsMarker'

export default function ItemsMarkerList({ items }: { items?: IItem[] }) {
  const [categories, setCategories] = useState<IItemCategory[]>()
  const getIconFromCategory = (categoryId: string) => {
    const { image } = categories?.find(({ id }) => id === categoryId) || {}
    return {
      url: image ?? 'https://i.imgur.com/wN7v0tV.png',
      size: [40, 40] as [number, number],
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createClusterCustomIcon = function (cluster: any) {
    const divStyle = `
      width: 100%;
      min-height: 40;
      background-image: url('https://dragonsdogma2.wiki.fextralife.com/file/Dragons-Dogma-2/map-images/seekers-token.png');
      background-size: cover;
      background-position: center;
      color: red`
    return new DivIcon({
      html: `
        <div style="${divStyle}">
          <div class="text-center pt-3 fs-6 fw-bold">
            ${cluster.getChildCount()}
          </div>
        </div>`,
      className: 'custom-marker-cluster',
      iconSize: [33, 33],
    })
  }

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getItemsCategories()
      setCategories(categories)
      return categories
    }
    loadCategories()
  }, [])

  return (
    <MarkerClusterGroup
      maxClusterRadius={40}
      chunkedLoading
      iconCreateFunction={createClusterCustomIcon}
    >
      {items?.map(item => (
        <ItemMarker
          name={item.name}
          description={item.description}
          x={item.x}
          y={item.y}
          key={item.id}
          icon={getIconFromCategory(item.category)}
        />
      ))}
    </MarkerClusterGroup>
  )
}
