<script>

export default {
  inject: ['$services'],
  name: 'SvgRink',
  props: {
    data: { type: String, default: null},
  },
  data: ()=>( {
    t: {}
  }),
}
</script>

<style lang="scss">


*[data-is-first="true"]{
  

  *[data-type="player-base"]{
      stroke: #00ff00;
      stroke-opacity:1;
  }

  *[data-type="player-area"]{
    fill: #00ff00;
  }
}


 *[data-type="player-area"]{
     // display:none;
  }            

</style>

<template>


<svg width="260" height="440" viewBox="0 0 260 440" fill="none" xmlns="http://www.w3.org/2000/svg">

  <rect width="260" height="440" fill="white" data-name="rink-area"/>
  
  <g data-name="rink-grid">

    <rect width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="0" data-grid-y="0"/>
    <rect x="65" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="1" data-grid-y="0"/>
    <rect x="130" width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="2" data-grid-y="0"/>
    <rect x="195" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="3" data-grid-y="0"/>

    <rect y="110" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="0" data-grid-y="1"/>
    <rect x="65" y="110" width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="1" data-grid-y="1"/>
    <rect x="130" y="110" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="2" data-grid-y="1"/>

    <rect y="220" width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="0" data-grid-y="2"/>
    <rect x="65" y="220" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="1" data-grid-y="2"/>
    <rect x="130" y="220" width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="2" data-grid-y="2"/>
    <rect x="195" y="220" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="3" data-grid-y="2"/>

    <rect y="330" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="0" data-grid-y="3"/>
    <rect x="65" y="330" width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="1" data-grid-y="3"/>
    <rect x="130" y="330" width="65" height="110" fill="#EEEEEE" data-name="grid" data-grid-x="2" data-grid-y="3"/>
    <rect x="195" y="330" width="65" height="110" fill="#E3E3E3" data-name="grid" data-grid-x="3" data-grid-y="3"/>

  </g>

  <g data-name="rink-lines">
    <line x1="1.10626e-07" y1="19.5" x2="260" y2="19.5" stroke="black" data-name="line-top"/>
    <line x1="1.10626e-07" y1="219.5" x2="260" y2="219.5" stroke="black" data-name="line-center"/>
    <line x1="1.10626e-07" y1="419.5" x2="260" y2="419.5" stroke="black" data-name="line-bottom"/>
    <circle cx="130" cy="220" r="8.24974" stroke="black" data-name="line-circle-center"/>
  </g>

  <g data-name="rink-goals">
    <rect data-anme="area-top" width="260" height="19" fill="#FFFFFF77"/>
    <path data-name="case-top" d="M100 20C100 23.9397 100.776 27.8407 102.284 31.4805C103.791 35.1203 106.001 38.4274 108.787 41.2132C111.573 43.999 114.88 46.2087 118.519 47.7164C122.159 49.224 126.06 50 130 50C133.94 50 137.841 49.224 141.481 47.7164C145.12 46.2087 148.427 43.999 151.213 41.2132C153.999 38.4274 156.209 35.1203 157.716 31.4805C159.224 27.8407 160 23.9397 160 20L130 20L100 20Z" fill="#CCCCCC" fill-opacity="0.5"/>
    <rect data-anme="area-bottom"  y="420" width="260" height="20" fill="#FF000044"/>
    <path data-name="case-bottom" d="M160 419C160 415.06 159.224 411.159 157.716 407.519C156.209 403.88 153.999 400.573 151.213 397.787C148.427 395.001 145.12 392.791 141.481 391.284C137.841 389.776 133.94 389 130 389C126.06 389 122.159 389.776 118.519 391.284C114.88 392.791 111.573 395.001 108.787 397.787C106.001 400.573 103.791 403.88 102.284 407.519C100.776 411.159 100 415.06 100 419L130 419H160Z" fill="#CCCCCC" fill-opacity="0.5"/>
  </g>

  <g data-name="players-home" transform="translate(0, 0)">
    <g id="player-h-1" data-type="player" >
      <circle data-type="player-area"  r="18" fill="#FF0404"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="#FF0404" stroke="black" stroke-opacity="0.32" />
      <circle r="1.46613" fill="white" />
    </g>
    <g id="player-h-2" data-type="player" >
      <circle data-type="player-area"  r="18" fill="#FF0404"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="#FF0404" stroke="black" stroke-opacity="0.32" />
      <rect x="-2.5657" y="-2.474" width="5.1314" height="1.6952" fill="white" />
      <rect x="-2.5657" y="0.779" width="5.1314" height="1.6952" fill="white" />
    </g>
    <g id="player-h-3" data-type="player" >
      <circle data-type="player-area"  r="18" fill="#FF0404"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="#FF0404" stroke="black" stroke-opacity="0.32" />
      <path d="M0 -3.875L3.6433 2.435H-3.6433L0 -3.875Z" fill="white"/>
    </g>
    <g id="player-h-4" data-type="player" >
      <circle  data-type="player-area" r="18" fill="#FF0404"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="#FF0404" stroke="black" stroke-opacity="0.32" />
      <path d="M2.6563 -2.656V2.657H-2.6566V-2.656H2.6563Z" fill="white"/>
    </g>
    <g id="player-h-goalie" data-type="player">
      <circle  data-type="player-base" r="5" fill="#FF0404" stroke="black" stroke-opacity="0.32"/>
    </g>
  </g>


  <g data-name="players-guest" transform="translate(0, 0)">
    <g id="player-g-1" data-type="player" >
      <circle data-type="player-area" r="18" fill="black"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="white" stroke="black" stroke-opacity="0.32" />
      <circle r="1.46613" fill="#070BFF" />
    </g>
    <g id="player-g-2" data-type="player" >
      <circle data-type="player-area"  r="18" fill="black"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="white" stroke="black" stroke-opacity="0.32" />
      <rect x="-2.5657" y="-2.474" width="5.1314" height="1.6952" fill="#070BFF" />
      <rect x="-2.5657" y="0.779" width="5.1314" height="1.6952" fill="#070BFF" />
    </g>
    <g id="player-g-3" data-type="player" >
      <circle data-type="player-area"  r="18" fill="black"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="white" stroke="black" stroke-opacity="0.32" />
      <path d="M0 -3.875L3.6433 2.435H-3.6433L0 -3.875Z" fill="#070BFF"/>
    </g>
    <g id="player-g-4" data-type="player" >
      <circle data-type="player-area"  r="18" fill="black"  fill-opacity="0.3" />
      <circle data-type="player-base" r="5" fill="white" stroke="black" stroke-opacity="0.32" />
      <path d="M2.6563 -2.656V2.657H-2.6566V-2.656H2.6563Z" fill="#070BFF"/>
    </g>
    <g id="player-g-goalie" data-type="player">
      <circle data-type="player-base"  r="5" fill="#070BFF" stroke="black" stroke-opacity="0.32"/>
    </g>
  </g>

 

</svg>

  
</template>