<template>
  <div class="d-flex justify-content-center align-content-center">
    <form
      class="form-signin shadow-lg preFadeIn"
      :class="{ fadeIn: showLogin }"
      @submit.prevent="login"
    >
      <h1 class="text-center border-bottom pb-3">登入</h1>
      <div class="form-label-group mt-4">
        <label for="inputEmail">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="user.username"
          required
          autofocus
        />
      </div>
      <div class="form-label-group mt-3">
        <label for="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
        />
      </div>
      <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLogin: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          const token = response.data.token
          const expired = response.data.expired
          // console.log(token, expired)
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          vm.$router.push('/admin/products')
        }
      })
    }
  },
  created () {
    const vm = this
    setTimeout(() => {
      vm.showLogin = true
    }, 500)
  }
}
</script>

<style lang="sass">
.form-signin
  width: 100%
  max-width: 330px
  margin: auto
  position: absolute
  top: 20%
  padding: 30px
  border-radius: 20px
  box-shadow: 0 0 5px rgba(0 , 0 , 0 , 0.3)

input[type="email"],input[type="password"]
  background: transparent
  border: none
  border-bottom: 1px solid gray
  -webkit-box-shadow: none
  box-shadow: none
  border-radius: 0

input[type="email"]:focus,input[type="password"]:focus
  -webkit-box-shadow: none
  box-shadow: none

select.form-control:focus
  box-shadow: #000
  -webkit-box-shadow: #000

.form-control:focus
  border-color: #000

.form-control::placeholder
  opacity: 0.3

.fadeIn
  opacity: 1 !important
  transform: translateX(0) !important
  transform: translateY(0) !important

.preFadeIn
  opacity: 0
  transform: translateY(100px)
  transition: 1s ease
</style>
