
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
                    id="filterpainting"
                    placeholder="Search by painting name or artist" 
                    aria-describedby="filter-painting">
            </div>
            <!--/Search-->
          <div v-if="loading">
              <font-awesome-icon icon="spinner" transform="shrink-6 left-4" />
          </div>
          <div v-else class="card-deck">
              <!--Card-->
              <PaintingCard
                  v-for="painting in paintings"
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
          };
        },
        mounted() {
            // Populate our card deck
            this.loadPaintingData();
        },
        computed: {
            filteredPaintings() {
                let filter = new RegExp(this.findName, 'i')
                return this.names.filter(el => el.match(filter))
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
            },
            createPainting(painting) {
                console.log(painting, 'post painting obj');
                this.displayMessage('Emitted from child component!');
                // Post painting data
                /*
                axios.post(
                    '/paintings', {painting}
                )
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.paintings.push(response.data);
                })
                .catch(e => {
                    this.displayError(e);
                })
                */
            }
        }
    };
</script>