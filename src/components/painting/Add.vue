<!--
    .prevent, which will keep a submit event from reloading the page
    https://css-tricks.com/methods-computed-and-watchers-in-vue-js/
-->
<template>
    <div class="accordion" id="addPainting">
        <button class="addButton btn btn-link mb-3 collapsed" type="button" data-toggle="collapse" data-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd">
            Add New Painting
        </button>
        <div id="collapseAdd" class="mb-3 p-3 border border-primary collapse" aria-labelledby="headingThree" data-parent="#addPainting">
            <!--Form Start-->
            <form v-on:submit.prevent="sendForm()">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label htmlFor="name">Painting Name:</label>
                        <input class="form-control" type="text" v-model.trim="name" name="name" placeholder="Name of painting" required />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="artist">Artist Name:</label>
                        <input class="form-control" type="text" v-model.trim="artist" name="artist" placeholder="Name of artist" required />
                    </div>
                </div>
                <div class="form-group">
                    <label htmlFor="url">Image URL:</label>
                    <input class="form-control" type="text" v-model.trim="url" name="url" placeholder="Painting Image URL" required />
                </div>
                <div class="form-group">
                    <label htmlFor="inputAddress2">Painting Attributes:</label>
                    <div v-for="(technique, index) in techniques" v-bind:key="index" class="input-group mb-2">
                        <input 
                            type="text" 
                            v-bind:name="'technique' + index" 
                            v-model="techniques[index]" 
                            v-bind:placeholder="'Atrribute #' + parseInt(index + 1)" 
                        />
                        <div class="input-group-append">
                            <button
                                type="button"
                                v-on:click="removeTechnique(index)"
                                class="btn btn-outline-secondary btn-sm"
                                >
                                <font-awesome-icon icon="times">Remove</font-awesome-icon> 
                            </button>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        v-on:click="addTechnique()" 
                        class="btn btn-outline-primary btn-sm"
                        >
                        <font-awesome-icon icon="plus">Add</font-awesome-icon>
                    </button>
                </div>
                <button type="submit" class="btn btn-primary">Create Painting</button>
            </form>
            <!--Form End-->
        </div>
    </div>
</template>

<script>
    /*
     * Binding v-model directly to v-for iteration
     * https://stackoverflow.com/questions/42629509/you-are-binding-v-model-directly-to-a-v-for-iteration-alias/42630052
    */
    // Start of our Painting add module
    export default {
        name: 'Add',
        data() {
            return {
                name: '',
                artist: '',
                url: '',
                newTechnique: '',
                techniques: []
            };
        },
        methods: {
            addTechnique(attribute) {
                this.techniques = this.techniques.concat(['']);
            },
            removeTechnique(index) {
                this.techniques = this.techniques.filter((technique, techniqueIndex) => index !== techniqueIndex);
            },
            sendForm() {
                if (this.name.length > 0 && this.artist.length > 0) {
                    this.$emit('create-painting', {
                        name: this.name,
                        artist: this.artist,
                        url: this.url,
                        techniques: this.techniques
                    });
                }
            }
        }
    };
</script>