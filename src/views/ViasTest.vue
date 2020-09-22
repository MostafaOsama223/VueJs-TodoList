<template>
    <div class="ViasTest">
        <div id='calendar-wrapper'>
            <div id="calendar">

            </div>
            <div id="calendar">

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ViasTest',
  components: {
  },
  props: {
  },
  mounted: function(){
    
  },
  data: function(){
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate = new Date(today);
     return {
         minDate
     }
  },
  created: function() {
          
      },
  methods: {
        
    }
}
</script>

<style scoped>
#ViasTest {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#calendar-wrapper{
    background-color: #BBB;
    width: 32em;
    height: 20em;
    padding: 1em;
}

#calendar{
    background-color: #CCC;
    width: 10em;
    height: 18em; 
    display: inline-block;
    margin: 0em 1em 0em 1em;
}
</style>