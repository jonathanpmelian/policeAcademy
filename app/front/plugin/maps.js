import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MAPS_KEY,
    libraries: 'directions',
  },
})

let { MapElementFactory } = VueGoogleMaps

let directionsRenderer = MapElementFactory({
  name: 'directionsRenderer',
  ctr: () => google.maps.DirectionsRenderer,
  events: ['directions_changed'],
  mappedProps: {
    routeIndex: { type: Number },
    options: { type: Object },
    panel: {},
    directions: { type: Object },
  },
  props: {},
  beforeCreate(options) {},
  afterCreate(directionsRendererInstance) {},
})

Vue.component('directionsRenderer', directionsRenderer)
