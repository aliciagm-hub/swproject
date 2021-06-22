<template> 
  <div>
    <button class ="btn" type="button" v-on:click="goBack()"> {{btnText}} </button>
  </div>
  <div class="search-wrapper">
    <label for="sname">Filter:</label>    
    <input type='text' id="sname" name="sname" placeholder='Search Character' v-model='search'/>
  </div> 
  <div>
    <button class ="btnOrder" type="button" v-on:click="sort()"> {{ orderText }} </button>    
  </div>  
  <div class="list">
    <h1>{{url}}</h1>
    <ol>
      <li v-for="item in filteredList" :key="item.name" :dataUrl="item.url" @click="openDetail(item.url)">{{item.name}}</li>
    </ol>
  </div>  
</template>

<script>
	// Importamos axios para poder obtener datos de la API
  import axios from 'axios'
  export default { 
    props: {
      url: { type: String, required: true }
    },  
    data() {      
      return {
        search: '',
        menuData: null,
        btnText: 'BACK',
        orderText: 'order ascending',
        ascending: true
      }
    },
    mounted() {
      // Sólo obtenemos los datos una vez
      if (!this.menuData) {
        this.getApiData()
      }
    },
    computed: {
      /**
       * Lista que devuelve el filtro
       */
      filteredList() {
        if (this.menuData &&  this.search !== '') {
          return this.menuData.filter(item => {
            return item.name.toLowerCase().includes(this.search.toLowerCase())
          })        
        } else {
          return this.menuData
        }
      }
    },
    methods: {
      /**
       * Método que recupera los datos de la API
       */
      getApiData() {
        // Obtenemos los datos de la API
        axios.get('https://swapi.dev/api/' + this.url).then(response =>{
          console.log(response)
          this.menuData = response.data.results
          this.filteredList = this.menuData
        }).catch(
          error => console.log(error)
        )        
      },
      /**
       * Método que abre el detalle del registro seleccionado
       */
      openDetail(url) {
        this.$router.push({name: "detail", params: {dataUrl: url}})
      },
      /**
       * Método que nos devuelve a la url anterior
       */
      goBack() {
        this.$router.go(-1)
      },
      /**
       * Método que ordena la lista alfabéticamente, alternando ascendente y descendente
       */
      sort() {
        if (this.ascending) {
          this.filteredList = this.filteredList.sort((a, b) => a.name.localeCompare(b.name))      
          this.orderText = 'order descending'    
        } else {
          this.filteredList = this.filteredList.sort((a, b) => b.name.localeCompare(a.name))
          this.orderText = 'order ascending' 
        }
        this.ascending = !this.ascending
      },
    }
  }
</script>

<style scoped>
  html, body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  h1 {
    font-family: "starjedifont";
    text-align: center;
    color:rgb(224, 222, 51);
    margin-top: 70%;
  }
  label {
    font-family: "Strjmono";
    color: white;
    margin-right: 10px;
  }
  .search-wrapper {   
    display: flex;
    align-items: left;
    justify-content: left;
    padding-top: 5%;
    padding-left: 10%;
  }
  .btn {
    background-color: #9c1a1a;
    font-family: "Strjmono";
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    margin: 20px 20px;
    cursor: pointer;
    height: 35px;
    display: inline-flex;
    align-items: center;
  }
  .btnOrder {
    background-color: #9c1a1a;
    font-family: "Strjmono";
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    margin-left: 10%;
    margin-top: 1%;
    cursor: pointer;
    height: 25px;
    display: inline-flex;
    align-items: center;
  }
</style>
