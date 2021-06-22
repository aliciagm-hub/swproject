<template>
  <div id="app" class="app">     
    <router-view/>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}
</script>

<style>
.app {
  height: 800px;
  background-image: url('./assets/star-wars-logo.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
@font-face {
  font-family: "starjedifont";
  src: local("starjedifont"), url(./fonts/starjedifont.ttf) format("truetype");  
}
@font-face {
  font-family: "Strjmono";
  src: local("Strjmono"), url(./fonts/Strjmono.ttf) format("truetype"); 
}
</style>
