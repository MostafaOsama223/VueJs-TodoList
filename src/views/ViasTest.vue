<template>
  <div class="ViasTest">
    <calendar-wrapper>
      
    </calendar-wrapper>
  </div>
</template>

<script>
// import moment from "moment";
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
p {
  margin-bottom: 0;
}

.calender-table {
  border-collapse: collapse;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
}

.calender-body {
  width: 100%;
  table-layout: fixed;
}

.calender-body > tbody {
  background-color: white;
}

thead th {
  padding: 0.5rem;
  position: sticky;
  top: 63.6px;
  background-color: #e9f2f5;
}

thead th:nth-child(n + 2) {
  text-align: center;
}

#calender-label {
  width: 13rem;
}

thead th:not(#calender-label) {
  width: calc((100% - 13rem) / 7);
}

.cell-content {
  height: 3.8rem;
  padding: 0.5rem;
}

thead th:not(:last-child),
tbody td:not(:last-child) {
  border-right: #c6c6c6 1px solid;
}

tbody tr:not(:last-child) td {
  border-bottom: #c6c6c6 1px solid;
}

thead p {
  font-weight: 400;
}

.holiday {
  background-color: #f3f4f5;
}

.calender-days__number {
  width: 1.6rem;
  height: 1.6rem;
  font-size: 14px;
  border-radius: 50%;
  text-align: center;
  margin: 0 auto;
  padding: 3px 0;
}

.calender-days__number.today {
  background-color: #3596bc;
  color: white;
}

.item-label {
  font-size: 0.9rem;
  color: #3596bc;
}

.calender-days__name {
  font-size: 0.9rem;
}

.legend-content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.legend-content img {
  width: 0.8rem;
}
</style>
