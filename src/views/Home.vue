<template>
    <div class="Home">
        <div class="row">
          <router-link
            :to="`/l/${list.listId}`"
            v-for="list in lists"
            v-bind:key="list.listId">
            <ListBadge
              class="Badge"
              v-bind:listHeader="list.listHeader"
              v-on:click.native="getList(list.listId)"/>
          </router-link>

        </div>
    </div>
</template>

<script>
import ListBadge from '../components/ListBadge'
import {getAllLists} from '../services/HTTP'

export default {
  name: 'Home',
  mounted: function() {
    getAllLists
  },
  components: {
    // TodoList,
    ListBadge
  },
  data() {
    return{
      lists: [
        {listId: -1, listHeader: 'Home'},
        {listId: 1, listHeader: 'Groceries'},
        {listId: 2, listHeader: 'Valeo'},
        {listId: 3, listHeader: 'Personal'}
      ]
    }
  },
  methods: {
    getList(listId) {   //  Get the chosen list data
      
      console.log('list ' + listId);
    }
  }
}
</script>

<style scoped>
.Badge:hover, .Badge{
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a {
  color: #333;
}
</style>