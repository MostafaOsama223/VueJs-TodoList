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