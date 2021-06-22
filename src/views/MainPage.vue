<template>
  <div class="list">
    <h1>Star Wars Encyclopedia</h1>
    <ol>
       <li v-for="item in swData" :key="item" :url="item[1]" @click="goToMenu(item)">{{item[0]}}</li>
    </ol>
  </div>
</template>

<script>
  // Importamos axios para poder obtener datos de la API
  import axios from 'axios'
  export default {      
    data() {      
      return {
        titulo: 'The Star Wars Encnyclopedia',
        bgImage: '../assets/star-wars-logo.png',
        swData: null
      }
    },
    mounted() {
      // Sólo se obtienen los datos una vez
      if (!this.swData) {
        this.getApiData()
      } 
    },
    methods: {
      /**
       * Método que obtiene los datos de la API
       */
      getApiData() {
        // Obtenemos los datos de la API
        axios.get('https://swapi.dev/api/').then(response =>{
          console.log(response)
          this.swData = Object.entries(response.data)
          // Filtramos el listado
          this.swData = this.swData.filter(item => item[0] === 'people' || item[0] === 'planets' || item[0] === 'starships')
          console.log(this.swData)
        }).catch(
          error => console.log(error)
        )
      },
      /**
       * Método para navegar hasta la siguiente sección
       */
      goToMenu(item) {
        this.$router.push("/menu/" + item[0])
      }
    }
  }
</script>

<style>
  h1 {
    font-family: "starjedifont";
    text-align: center;
    color:rgb(224, 222, 51);
    padding-bottom: 10%;
  }
  .list {
    width:410px;
    margin:0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "starjedifont";
    cursor: pointer;
  }
  .list ol {
    counter-reset: li;
    list-style: none;
    *list-style: decimal;
    font-size: 15px;
    font-family: 'starjedifont';
    padding: 0;
    margin-bottom: 4em;
    padding-bottom: 20%;
    list-style-position: inside;
  }

  .list li {
    position: relative;
    display: block;
    padding: .4em .4em .4em 2em;
    *padding: .4em;
    margin: .5em 0;
    background: #9c1a1a;
    color: white;
    text-decoration: none;
    box-shadow:inset 0.5em 0 black;
    -webkit-transition: box-shadow 1s; /* For Safari 3.1 to 6.0 */
    transition: box-shadow 1s;
  }

  .list li:hover {
    box-shadow:inset 2em 0 black;
  }
</style>