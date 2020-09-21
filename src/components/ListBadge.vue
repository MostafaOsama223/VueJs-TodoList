<template>
<div class="d-flex flex-row">
    <router-link
        :to="`/l/${listId}`">
        <b-card
        class="ListBadge"
        v-bind:title="listHeader">
        <b-badge
            class="itemsBadge">
        {{itemsCount}}</b-badge>
        </b-card>
    </router-link>
    
    <button
            class="btn btn-danger w-25 h-25 deleteListBtn"
            v-on:click="deleteList">
    X</button>
</div>

</template>

<script>
import {deleteList} from '../components/HTTPWrapper'

export default {
    name: "ListBadge",
    props: {
        listHeader: String,
        listId: Number,
        itemsCount: Number
    },
    data(){
        return {
        }
    },
    methods:{
        deleteList(){
            deleteList(this.listId)
            .then(this.$emit('refresh-listBadges'))
        }
    }
}
</script>

<style scoped>
    .ListBadge{
        margin: .5em;
        /* text-align: center; */
        cursor: pointer;
        min-width: 20em;
        text-decoration: none;
    }

    .ListBadge:hover{
        background-color: rgb(32, 26, 85);
        text-decoration: none;
        color: #EEE;
    }

    .itemsBadge{
        position: relative;
        left: 23.55em;
        top: 1.85em;
    }

    .deleteListBtn{
        position: relative;
        right: 2.72em;
        top: .5em;
        padding-top: 0em;
        padding-bottom: 0em;
    }

    a:hover {
        text-decoration: none;
    }

    a {
        color: #333;
    }
</style>