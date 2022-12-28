<template>
  <div>
    <header class="header bg-theme-grey-light mb-3 sticky-top">
      <div class="logo-wrap">
        <h3>رخداد ها</h3>

      </div>


    </header>

    <main class="main-wrap address2-page mb-xxl">

      <template v-if="!loaded && events.length === 0">
        <div class="row" :key="11">
          <template v-for="index in 5">
            <div class="col-12 mb-3 mr-2 ml-2 align-content-center align-items-center d-flex"
                 :key="index">
              <vue-skeleton-loader
                  type="rectangle"
                  :radius="8"
                  :rounded="true"
                  :width="350"
                  :height="70"
                  animation="wave"
              />
            </div>
          </template>
        </div>
      </template>

      <template v-else-if="loaded && events.length === 0">
        <p :key="22" class="template text-center mt-5">هیچ رخدادی تا کنون رخ نداده است.</p>
      </template>

      <template v-else>
        <div class="address-wrap">
          <template v-for="(event,index) in events">
            <div class="address-box" :key="index">

              <div class="content-box">


                <h3 class="title-color font-sm">
                  آیدی: {{ event.id }}
                  <br>
                  <br>

                  دیوایس آیدی: {{ event.deviceId }}
                  <br>
                  <br>
                  ساعت:
                  {{ event.date }}
                </h3>


              </div>

            </div>
          </template>

        </div>
        <infinite-loading :identifier="infiniteId" @infinite="handleLoadMore">
          <div slot="no-results"></div>
          <div slot="no-more" style="margin-top: 10px">دنبال چی هستی رفیق؟ بسه دیگه</div>

        </infinite-loading>

      </template>
    </main>
  </div>
</template>

<script>

import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

export default {
  name: 'HomeView',
  data() {
    return {
      events: [],
      loading: false,
      loaded: false,
      page: 1,
      infiniteId: +new Date(),
    };
  },
  components: {
    InfiniteLoading
  },
  methods: {
    handleLoadMore($state) {
      this.loaded = false

      axios.get('events?order=desc&page=' + this.page, {
        page: this.page,
      }).then(({data}) => {
        this.loading = false
        this.loaded = true

        if (data.data.length && this.page <= data.pagination.pageCount) {
          this.page += 1;
          this.events.push(...data.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      })

    },
  },
  mounted() {
    this.loading = true
    this.events = []
    this.handleLoadMore();

    //let vm = this


  },

}
</script>
