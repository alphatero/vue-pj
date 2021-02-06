<template>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
          <router-view></router-view>
        </main>
      </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
