
export const displayMap = (locations) =>{
  const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=e3io1UZsfD3yeUIqZe9E', // style URL
    scrollZoom: false
});
map.on('load', () => {
const bounds = new maplibregl.LngLatBounds();
locations.forEach(loc => {
    const el = document.createElement('div')
    el.className ='marker';

    new maplibregl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);

    new maplibregl.Popup({
        offset: 30
    }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}:${loc.description} </p>`).addTo(map)

    bounds.extend(loc.coordinates)
})

map.fitBounds(bounds)
})
}
