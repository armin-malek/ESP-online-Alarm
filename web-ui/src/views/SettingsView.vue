<template>
  <div>
    <header class="header bg-theme-grey-light mb-3 sticky-top">
      <div class="logo-wrap">
        <h3>تنظیمات</h3>

      </div>


    </header>


    <main class="main-wrap address2-page mb-xxl">

      <div class="custom-form mt-3">
        <div class="row-group">
          <div class="col-12">
            <div class="input-box">

              <label class="font-sm">از</label>

              <input type="text" v-model="formm"
                     class="form-control">

            </div>
            <div class="input-box">

              <label class="font-sm">تا</label>

              <input type="text" v-model="to"
                     class="form-control">

            </div>
          </div>

          <div class="col-12">
            <div class="input-box">
              <label class="font-sm">فعال/غیرفعال</label>
              <select v-model="status" class="form-control">
                <template v-if="status">
                  <option value="true" selected>فعال</option>
                  <option value="false">غیرفعال</option>
                </template>
                <template v-else>
                  <option value="true">فعال</option>
                  <option value="false" selected>غیرفعال</option>
                </template>

              </select>

            </div>
          </div>


        </div>

      </div>
    </main>


    <div class="footer-wrap footer-button" style="background: #6fa9ff;     margin-bottom: 100px;">
      <a @click="submit()" class="font-md">اعمال تغییرات</a>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: 'SettingsView',
  data() {
    return {
      settings: false,
      loading: false,
      status: null,
      formm: null,
      to: null

    };
  },
  mounted() {
    this.loading = true
    axios.get('settings').then(({data}) => {
      this.loading = false
      this.settings = data
      this.formm = this.settings[0]['value']['from']
      this.to = this.settings[0]['value']['to']

      this.status = this.settings[1]['value']

    })
  },
  methods: {
    async submit() {
      let vm = this

      this.settings[0]['value']['from'] = this.formm
      this.settings[0]['value']['to'] = this.to
      this.settings[1]['value'] = this.status

      await axios.post('settings', {
        settings: vm.settings
      }).then((response) => {

        vm.$toaster.info(response.data)

      })

    }
  }

}
</script>
