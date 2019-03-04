
<template>
    <main role="main">
      <div class="jumbotron">
          <div class="container">
            <h1>{{message}}!</h1>
            <h5>Currently there are (<strong>{{paintingCount}}</strong>) paintings available!</h5>
          </div>
      </div>
      <div class="container">
          <div class="accordion" id="addPainting">
              <button class="addButton btn btn-link mb-3 collapsed" type="button" data-toggle="collapse" data-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd">
                  Add New Painting
              </button>
              <div id="collapseAdd" class="mb-3 p-3 border border-primary collapse" aria-labelledby="headingThree" data-parent="#addPainting">
                  <!--Add-->

                  <!--/Add-->
              </div>
          </div>
      </div>
      <div class="container-fluid">
          <div v-if="loading">Loading...</div>
          <div v-else v-for="painting in paintings" v-bind:key="painting.id" class="card-deck">
              <!--Card-->
              {{ painting.name }}
              <!--/Card-->
          </div>
          <hr/>
      </div>
    </main>
</template>

<script>
    import axios from 'axios'
    
    // Obtain the web api from our environment file
    const apiBaseUrl = process.env.WEB_API;

    // Assign the baseURL of our axios calls
    axios.defaults.baseURL = apiBaseUrl;

    // Start of our App module
    export default {
        name: 'App',
        data() {
          return {
              message: 'Using Parcel and Bootstrap In A Vue.js App',
              loading: true,
              paintingCount: 0,
              paintings: []
          };
        },
        mounted() {
            // Our rest calls start here
            this.loadPaintingData();
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
                    this.displayError(error);
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
            }
        }
    };
</script>