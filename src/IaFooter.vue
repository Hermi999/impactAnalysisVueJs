<template>
  <footer>
    <p>Created and maintained by <a href="mailto: hermann.wagner2@bosch.com">Hermann Wagner (DGS-EC/ECB4)</a>.<br> If you have any suggestions or find a bug please <a href="mailto: hermann.wagner2@bosch.com">contact me</a>.</p>
  </footer>
</template>

<script>
  //import Headline from './Headline.vue'

  export default {
    //components: {Headline},
    data () {
      return {
      }
    },
    mounted: function(){
      // set height of main
      var footer_height = document.getElementsByTagName("footer")[0].clientHeight;
      var main = document.getElementById("ia-main");
      main.style.minHeight = window.innerHeight - footer_height + "px";
    },
    methods: {
    }
}
</script>

<style lang="scss">
  footer{
    position: relative;
    bottom: 0px;
    text-align: center;
    font-size: 0.8em;
    clear: both;
    padding: 15px 0px 1px;
    background-color: #0d4790;
    color: #ffe;
    box-shadow: 0 0 5px #0d4790;
    min-width: 600px;
    width: 70%;

    a, a:hover{
      color: rgb(255, 238, 87);
    }
  }
</style>
