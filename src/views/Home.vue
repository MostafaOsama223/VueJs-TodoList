<template>
    <div class="Home">
        <div class="row">
          <ListBadge
            class="Badge"
            v-for="list in this.lists"
            v-bind:key="list.listId"
            v-bind:listHeader="list.listHeader"
            v-bind:listId="list.listId"
            :itemsCount="list.items.length"
            v-on:refresh-listBadges="getAllLists"
            />

        </div>
    </div>
</template>

<script>
import ListBadge from '../components/ListBadge'
import {getAllLists} from '../components/HTTPWrapper'

export default {
  name: 'Home',
  mounted: function() {
    getAllLists()
    .then(resp => {
      this.lists = resp['data'];
    })
  },
  components: {
    ListBadge
  },
  data() {
    return{
      lists: []
    }
  },
  methods: {
    getAllLists(){
      getAllLists()
      .then(resp => {
        this.lists = resp['data'];
      })
    }
  }
}
</script>

<style scoped>
.Badge:hover, .Badge{
  text-decoration: none;
}
</style>