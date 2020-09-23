<template>
    <div class="calendar-body">
        <calendar-cell
            v-for="(day, index) in days"
            :key="index"
            :displayData="day"
            v-on:select-date="selectDate"
            :selectedStartDate="selectedStartDate"
            :selectedEndDate="selectedEndDate"
            :month_year="month_year"
            v-on:omit-calendar="$emit('omit-calendar')"/>
    </div>
</template>

<script>
import calendarCell from './calendarCell.vue'
// import moment from 'moment'
 
export default {
    name: "calendarBody",
    components:{
        calendarCell
    },
    data() {
        return{
            bindStartDate: Boolean,
            bindEndDate: Boolean
        }
    },
    mounted(){
          
    },
    props:{
        days: Array,    //  Array of days numbers [1,2,3,4,..]
        month_year: String,   //  Date of current calendar "Oct"
        selectedStartDate: String,
        selectedEndDate: String
    },
    methods:{
        selectDate(selectedDate){
            //  Sun, Sep 16
            this.$emit('select-date', selectedDate);
        }
    },
    watch:{
        // month_year: function(v){
        //     console.log(v);
        // },
        // selectedStartDate: function(v){
        //     console.log(v);  
        // },
        // selectedEndDate: function(v){
        //     console.log(v);  
        // }
    }
}
</script>

<style scoped>
    .calendar-body{
        display: inline-block;
        text-align: center;
        background-color:#FFF;
        padding: 0em 0em 0em 0em;
        width: 15em;
        height: 12em;
    }
</style>