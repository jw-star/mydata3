<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { getData } from '@/api/index.js';
import { onMounted} from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
      onMounted(() => {
        console.log("onMounted")
        // getCompany()
      })

 
     const  getCompany= ()=>{
        getData().then(res=>{
            
        }).catch(error=>{
          console.log(error)
        })
      }

      const login=()=>{

      }

      return{
          getCompany,
          login

      }

      
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
