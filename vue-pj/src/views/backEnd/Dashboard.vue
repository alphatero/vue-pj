<template>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <Alert/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
          <router-view></router-view>
        </main>
      </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Alert from '@/components/alertMessage.vue'
export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Alert
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
