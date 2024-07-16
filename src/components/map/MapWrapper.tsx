import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import L, { type LatLngExpression } from 'leaflet'
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayersControl,
  useMap,
} from 'react-leaflet'
import Control from 'react-leaflet-custom-control'

import '../../styles/map/MapWrapper.css'

import OffMenu from '../common/OffMenu'
import IconFilter from '../common/FilterIcon'
import CategoryFilter from '../category/CategoryFilter'
import {
  mapsLayersUrl,
  mapBounds,
  type IItem,
  getItems,
} from '../../api/map-data'
import ItemsMarkerList from './ItemsMarkerList'

const MapWrapper = () => {
  const center: LatLngExpression = [0, 0]
  const tileMapUrls = useMemo(() => mapsLayersUrl, [])
  const [itemsToShow, setItemsToShow] = useState<IItem[]>()

  useEffect(() => {
    const loadItems = async () => {
      const items = await getItems({ categoryId: 'SeekersToken' })
      setItemsToShow(items)
    }
    loadItems()
    return () => setItemsToShow(undefined)
  }, [])

  return (
    <MapContainer
      id='main-map-container'
      zoomAnimation
      center={center}
      zoom={3}
      minZoom={2}
      scrollWheelZoom={true}
      maxZoom={8}
      maxBounds={mapBounds}
      zoomControl={false}
      attributionControl={false}
      className='h-100'
    >
      <ZoomControl position='topleft' />

      <LayersControl autoZIndex position='bottomleft' collapsed={false}>
        <LayersControl.BaseLayer checked name='World'>
          <TileLayer noWrap={true} url={tileMapUrls.world} />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Unmoored World'>
          <TileLayer url={tileMapUrls.unmoored} />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Control position='topright'>
        <OffMenu title='Category Filter' buttonText={<IconFilter />}>
          <CategoryFilter />
        </OffMenu>
      </Control>

      <ItemsMarkerList items={itemsToShow} />
      <GeoCoordinates />
    </MapContainer>
  )
}

export default MapWrapper

const GeoCoordinates = () => {
  const map = useMap()
  const { current: info } = useRef<HTMLDivElement>(
    L.DomUtil.create('div', 'debug-coords')
  )

  useEffect(() => {
    if (!map || !info) return

    const positon = L.Control.extend({
      options: {
        position: 'bottomright',
      },

      onAdd: function () {
        info.className = 'text-white'
        info.textContent = 'Click on map'
        return info
      },
    })

    map.on('mousemove', e => {
      info.textContent =
        e.latlng.lat.toFixed(5) + ' : ' + e.latlng.lng.toFixed(5)
      //   navigator.clipboard?.writeText(e.latlng.lat + '\n' + e.latlng.lng)
    })

    map.on('click', e => {
      navigator.clipboard?.writeText(e.latlng.lat + '\n' + e.latlng.lng)
      info.textContent += ' copied!'
    })
    map.addControl(new positon())
  }, [map, info])

  return null
}
