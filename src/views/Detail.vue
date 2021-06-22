<template>
  <div>
    <button class ="btn" type="button" v-on:click="goBack()"> {{btnText}} </button>
  </div>
  <div class="detail">
    <h1>{{ title }}</h1>
    <ol>
      <li v-for="element in detail" :key="element.key"> {{element.key + ': ' + element.value}}</li>
    </ol>
  </div>
</template>

<script>
	// Importamos axios para poder obtener datos de la API
  import axios from 'axios'
  export default {
    data() {      
      return {
        detail: [],
        title: '',
        btnText: 'BACK'
      }
    },
    mounted() {
      this.getApiData()
    },
    methods: {
      /**
       * Método que obtiene los datos de la API
       */
       getApiData() {
        axios.get(this.$route.params.dataUrl).then(response =>{
          this.buildDetail(response.data)
        }).catch(
          error => console.log(error)
        )
      },
      /**
       * Método que construye los datos del detalle
       */
      async buildDetail (data) {
        Object.entries(data).forEach((element) => {
            const key = element[0].charAt(0).toUpperCase() + element[0].slice(1)
            const finalKey = key.replaceAll('_', ' ')
            // let value = await this.checkUrls(element[1]);
            this.checkUrls(element[1]).then(responseValue => {
              let value
              if (Array.isArray(responseValue)) {
                // Si nos devuelve un array, lo parseamos a String
                value = responseValue.join(',')
              } else {
                value = responseValue
              }
              this.detail.push({
                key: finalKey,
                value: value
              })
            })
            if (element[0] === 'name') {
              this.title = element[1]
            }
          })
      },
      /**
       * Método que comprueba si el valor es una url.
       * En ese caso, obtiene los datos de la API para mostrarlos en el detalle.
       * En caso de que sea un String, lo devuelve.
       */
      async checkUrls(item) {
        let promises = []
        let value = []
        // Si tenemos un array de urls, construimos un array con los datos necesarios de la respuesta
        if (Array.isArray(item)) {
          item.forEach(element => {
            promises.push(
              axios.get(element)                
            )                  
          })   
          return axios.all(promises).then(response =>{ 
            response.forEach(reg =>  {
              if (reg.data.name) {
                value.push(reg.data.name)
              } else if (reg.data.title) {
                value.push(reg.data.title)
              }     
            }) 
            return value 
          })          
        // Si tenemos una sola url, obtenemos los datos deseados de la respuesta                
        } else if (item.startsWith('https')) {
          return axios.get(item).then(response =>{    
            return response.data.name
          }).catch(
            error => console.log(error)
          )
        } else {
          // Si tenemos un String, lo devolvemos
          return item
        }
      },
      /**
       * Método para volver a la página anterior
       */
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: "starjedifont";
    text-align: center;
    color:rgb(224, 222, 51);
    padding-top: 80%;
  }
  .detail {
    width:410px;
    margin:0 auto;
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "Arial";
  }
  .detail ol {
    counter-reset: li;
    list-style: none;
    font-size: 15px;
    font-family: 'Arial';
    padding: 0;
    margin-bottom: 2em;
    padding-bottom: 20%;
    list-style-position: inside;
  }

  .detail li {
    position: relative;
    display: block;
    padding: .4em .4em .4em 2em;
    *padding: .4em;
    margin: .5em 0;
    color: white;
    text-decoration: none;
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
</style>
