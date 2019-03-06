
<template>
    <div class="card mb-3">
        <a href="#" v-on:click="openLargeImage(painting.url, painting.name)">
            <img v-bind:src="painting.url" class="card-img-top img-thumb" v:bind:alt="painting.name" />
        </a>
        <div class="card-body">
            <h5 class="card-title">{{painting.name}}</h5>
            <p class="card-text">{{painting.artist}}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="(technique, index) in painting.techniques" v-bind:key="index" class="list-group-item">
                {{technique}}
            </li>
        </ul>
        <div class="card-body">
            <a v-bind:href="painting.url" target="_blank" class="card-link">More Info</a>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated: {{this.formatInferredDate(painting.dateModified, painting.dateCreated)}}</small>
        </div>
    </div>
</template>

<script>

    const bootbox = require('bootbox');

    // Start of our Card module
    export default {
        name: 'Card',
        props: {
            painting: Object
        },
        methods: {
            openLargeImage(url, name) {
                bootbox.alert({
                    message: `<p class="text-center"><img class="img-large" src="${url}" /></p>`,
                    title: name,
                    size: 'large',
                    backdrop: true
                });
            }
        }
    };
</script>