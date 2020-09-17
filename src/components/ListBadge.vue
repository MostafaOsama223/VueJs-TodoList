<template>
<div class="d-flex flex-row">
    <b-card
        class="ListBadge"
        v-bind:title="listHeader">
        <b-badge
            class="itemsBadge">
            AA</b-badge>
    </b-card>
</div>

</template>

<script>
export default {
    name: "ListBadge",
    props: {
        listHeader: String
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
        left: 95%;
        top: 1.4em;
    }
</style>