<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'script-loader!jquery/dist/jquery.min';
  import 'script-loader!what-input/dist/what-input.min';
  import 'script-loader!foundation-sites/dist/js/foundation.min';

export default {
  name: 'app'
}
</script>

<style>
</style>
