<template>
    <div class="calendar-date-display"> 
        {{selectedStartDate}} - {{selectedEndDate}}
    </div>
</template>

<script>
export default {
    name: "calendar-date-display",
    props:{
        selectedStartDate: String,
        selectedEndDate: String
    }
}
</script>

<style scoped>
    .calendar-date-display{
        background-color: #EEE;
    }
</style>