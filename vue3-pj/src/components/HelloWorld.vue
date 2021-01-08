<template>
  <div class="hello" v-for="item in products" :key="item.id">
    {{products.title}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      products: {
        title: 'somewords',
      },
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
