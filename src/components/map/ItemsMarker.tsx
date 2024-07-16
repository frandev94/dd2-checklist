import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

interface ItemsMarkerProps {
  description?: string
  name: string
  x: number
  y: number
  icon?: {
    url: string
    size: [number, number]
  }
}

export default function ItemMarker({
  description,
  name,
  x,
  y,
  icon,
}: ItemsMarkerProps) {
  const iconMarker = icon
    ? new Icon({
        iconUrl: icon?.url,
        iconSize: icon?.size,
      })
    : undefined
  return (
    <Marker interactive={false} position={[x, y]} icon={iconMarker}>
      {/* <Tooltip>{name}</Tooltip> */}
      <Popup>
        <h5>{name}</h5>
        {description && <p>{description}</p>}
      </Popup>
    </Marker>
  )
}
