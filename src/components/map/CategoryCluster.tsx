import type { ReactNode } from 'react'
import { DivIcon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

export default function CategoryCluster({
  children,
  image,
}: {
  children: ReactNode
  image: { url: string; size: [number, number] }
}) {
  const createClusterCustomIcon = function (cluster: {
    getChildCount: () => string
  }) {
    const divStyle = `
      width: 100%;
      height: ${image.size[0] ?? 40};
      width: ${image.size[1] ?? 40};
      background-image: url('${image.url}');
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

  return (
    <MarkerClusterGroup
      maxClusterRadius={40}
      chunkedLoading
      iconCreateFunction={createClusterCustomIcon}
    >
      {children}
    </MarkerClusterGroup>
  )
}
