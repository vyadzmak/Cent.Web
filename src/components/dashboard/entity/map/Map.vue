<template>
  <div>
    <yandex-map
      :coords="[53.915746, 27.428979]"
      :cluster-options="{
        1: {clusterDisableClickZoom: true}
      }"
      :behaviors="['drag', 'dblClickZoom', 'rightMouseButtonMagnifier','ruler']"
      :controls="['fullscreenControl','geolocationControl','routeEditor','rulerControl','searchControl','trafficControl','typeSelector','zoomControl']"
      :placemarks="placemarks"
      zoom="10"
      style="width: 100%; height: 600px;"
      map-type="map"
    >

      <ymap-marker
        :coords="[54.7, 39.7]"
        :balloon="{header: 'header', body: 'body', footer: 'footer'}"
        :icon="{color: 'green', glyph: 'cinema'}"
        hint-content="Hint content 1"
        marker-type="placemark"
        cluster-name="1"
      />

      <ymap-marker
        :coords="[54.6, 39.8]"
        :balloon="{header: 'header', body: 'body', footer: 'footer'}"
        :icon="{color: 'green', glyph: 'cinema'}"
        marker-type="placemark"
        hint-content="Hint content 1"
        cluster-name="1"
      />

      <ymap-marker
        :coords="[27.525773, 53.89079]"
        :marker-fill="{color: '#000000', opacity: 0.4}"
        :marker-stroke="{color: '#ff0000', width: 5}"
        :balloon="{header: 'header', body: 'body', footer: 'footer'}"
        marker-type="circle"
        circle-radius="1600"
        hint-content="Hint content 1"
      />

    </yandex-map>
  </div>
</template>

<script src="./map.js"></script>

<style scoped></style>
