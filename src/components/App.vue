
<template>
    <main role="main">
      <div class="jumbotron">
          <div class="container">
            <h1>{{message}}!</h1>
            <h5>Currently there are (<strong>{{paintingCount}}</strong>) paintings available!</h5>
          </div>
      </div>
      <div class="container">
          <!--Add-->
          <PaintingAdd @create-painting="createPainting" />
          <!--/Add-->
      </div>
      <div class="container-fluid">
           <!--Search-->
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="filter-painting">Find your painting</span>
                </div>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="findPainting" 
                    id="txtFilterPaintings"
                    placeholder="Search by painting name or artist" 
                    aria-describedby="filter-painting">
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary" 
                        type="button" v-on:click.prevent="clearSearch()">
                            <font-awesome-icon icon="times" />
                    </button>
                </div>
            </div>
            <!--/Search-->
          <div v-if="loading">
              <font-awesome-icon icon="spinner" transform="shrink-6 left-4" />
          </div>
          <div v-else class="card-deck">
              <!--Card-->
              <PaintingCard
                  v-for="painting in filteredPaintings"
                  v-bind:painting="painting"
                  v-bind:key="painting.id" />
              <!--/Card-->
          </div>
          <hr/>
      </div>
    </main>
</template>

<script>
    import axios from 'axios'
    import PaintingCard from './painting/Card';
    import PaintingAdd from './painting/Add';

    const apiBaseUrl = process.env.WEB_API;

    axios.defaults.baseURL = apiBaseUrl;

    // Start of our App module
    export default {
        name: 'App',
        components: {
            PaintingAdd,
            PaintingCard
        },
        data() {
          return {
              message: 'Using Parcel and Bootstrap In A Vue.js App',
              loading: true,
              paintingCount: 0,
              paintings: [],
              findPainting: ''
          };
        },
        mounted() {
            // Populate our card deck
            this.loadPaintingData();
        },
        computed: {
            filteredPaintings() {
                // Create a filter array that is a copy of our paintings array
                let filtered = this.paintings;
                if (this.findPainting) {
                    // Only filter if the user is typing something
                    const filter = this.$_toLowerCaseAndTrim(this.findPainting);
                    // Filter on name or artist
                    filtered = this.paintings.filter(el => {
                        return this.$_toLowerCaseAndTrim(el.name).indexOf(filter) > -1 || this.$_toLowerCaseAndTrim(el.artist).indexOf(filter) > -1;
                    });
                }
                // Return our filtered array
                return filtered;
            }
        },
        methods: {
            loadPaintingData() {
                // Lets take advantage of axios.all and chain our requests
                axios.all([
                    this.getPaintingCount(),
                    this.getAllPaintings()
                ])
                .then(axios.spread((paintingCount, paintings) => {
                    // Handle our promises
                    //console.log(paintings.data, 'paintings json');
                    this.paintingCount = paintingCount.data;
                    this.paintings = paintings.data;
                }))
                .catch(error => {
                    // If you have a pool of requests any request failing will result in a rejected Promise. The first failing request will be the culprit.
                    // https://github.com/axios/axios/issues/76#issuecomment-233146010
                    this.$_displayError(error);
                })
                .finally(() => {
                    this.loading = false;
                });
            },
            getPaintingCount() {
                // Return count of all paintings
                return axios.get('/paintings/all')
            },
            getAllPaintings() {
                // Return json array of all paintings
                return axios.get('/paintings')
            },
            clearSearch() {
                this.findPainting = '';
            },
            createPainting(painting) {
                //this.$_displayMessage('Emitted from child component!');
                this.loading = true;
                // Post painting object
                axios.post(
                    '/paintings', painting
                )
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.paintings.push(response.data);
                })
                .catch(e => {
                    // Issue with posting our new painting
                    this.$_displayError(e);
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>