<template>
  <div>
    <yandex-map
      :coords="[53.915746, 27.428979]"
      :cluster-options="{
        1: {clusterDisableClickZoom: true}
      }"
      :behaviors="['drag', 'dblClickZoom', 'rightMouseButtonMagnifier','ruler']"
      :controls="['fullscreenControl','geolocationControl','routeEditor','rulerControl','searchControl','trafficControl','typeSelector','zoomControl']"
      zoom="10"
      style="width: 100%; height: 600px;"
      map-type="map"
    />
  </div>
</template>

<script src="./map.js"></script>

<style scoped></style>
