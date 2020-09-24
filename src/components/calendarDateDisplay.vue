<template>
    <div class="calendar-date-display"> 
        {{selectedStartDate}} - {{selectedEndDate}}
    </div>
</template>

<script>

export default {
    name: "calendar-date-display",
    props:{
        
    },
    data(){
        return{  
        }     
    },
    computed:{
        selectedStartDate(){
            return this.$store.getters.getSelectedStartDate.format('ddd, MMM DD YYYY');
        },
        selectedEndDate(){
            return this.$store.getters.getSelectedEndDate.format('ddd, MMM DD YYYY');
        },
    },
    watch:{
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