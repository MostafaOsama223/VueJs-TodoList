<template>
    <div class="calendar-date-display"> 
        {{startDateToDisplay}} - {{endDateToDisplay}}
    </div>
</template>

<script>
import moment from 'moment'
export default {
    
    name: "calendar-date-display",
    props:{
        displayDateFormat: String,
        startDateToDisplay: String,
        endDateToDisplay: String
    },
    data(){
        return{  
        }     
    },
    computed:{

    },
    watch:{
        startDateToDisplay(startDateToDisplay){
            if(startDateToDisplay != null)   return moment(startDateToDisplay).format(this.displayDateFormat)
            else    return 'Start Date';
        },
        endDateToDisplay(endDateToDisplay){            
            if(endDateToDisplay != null)   return moment(endDateToDisplay).format(this.displayDateFormat)
            else    return 'End Date';
        }
    }
}
</script>

<style scoped>
    .calendar-date-display{
        background-color: #FFF;
        text-align: center;
        font-size: .9em;
    }
</style>