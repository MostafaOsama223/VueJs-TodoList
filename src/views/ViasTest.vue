<template>
  <div class="ViasTest">
    <calendar-wrapper
      :isPreviousDaysOmitted="true"/>
  </div>
</template>

<script>
// import moment from "moment";
import calendarWrapper from '../components/calendarWrapper.vue'
export default {
  name: "ViasTest",
  components: { calendarWrapper },
  props: {
    
  },
  data() {
    return {
    };
  },
  computed: {

  },
  watch: {
    
  },
  created() {},
  methods: {

  }  
};
</script>

<style scoped>

</style>