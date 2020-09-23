<template>
  <div class="ViasTest">
    <calendar-wrapper
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      v-if="showCalendar"
      v-on:omit-calendar="omitCalendar"
      :omitPreviousDays="true"/>
      <b-button
        v-on:click="showCalendar=true">show calendar</b-button>

  </div>
</template>

<script>
import moment from "moment";
import calendarWrapper from '../components/calendarWrapper.vue'
export default {
  name: "ViasTest",
  components: { calendarWrapper },
  mixins: [],
  props: {
    
  },
  data() {
    return {
      selectedCell: {
        item: null,
        date: null,
        data: null,
      },
      selectedStartDate: moment(),
      selectedEndDate: moment().add(3,'day'),
      showCalendar: false
    };
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {},
  methods: {
    omitCalendar(startDate, endDate){
      console.log(startDate + ' ____ ' + endDate);
      this.selectedStartDate = startDate;
      this.selectedEndDate = endDate;
      this.showCalendar= false;
    }
  }  
};
</script>

<style scoped>

</style>