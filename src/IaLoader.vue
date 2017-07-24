<template>

  <div id="loader_wrapper" v-if="seen">
    <div id="loader">
      <div id="box"></div>
      <div id="hill"></div>
    </div>
  </div>

</template>

<script>
  // import other components which can be used in the template
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        seen: false,
      };
    },

    created(){
      ia.bus.$on('toggle_loader', (trigger) => this.toggle_seen());
    },

    props: {  // properties which can be changed from extern
    },
    
    methods: {  // manipulate the variables
      toggle_seen: function(){
        this.seen = !this.seen;
      }
    },

    filters: {  // have to return a value
    }
}
</script>

<style lang="scss">
  #loader_wrapper {
    background-color: rgba(4, 41, 70, 0.9);
    z-index: 1000000;
    width: 70%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.7em;
    margin-left: -2.7em;
    width: 5.4em;
    height: 5.4em;
    background-color: transparent;
  }

  #hill {
    position: absolute;
    width: 7.1em;
    height: 7.1em;
    top: 1.7em;
    left: 1.7em;
    background-color: transparent;
    border-left: .25em solid whitesmoke;
    transform: rotate(45deg);
  }

  #hill:after {
    content: '';
    position: absolute;
    width: 7.1em;
    height: 7.1em;
    left: 0;
    background-color: transparent;
  }

  #box {
    position: absolute;
    left: 0;
    bottom: -.1em;
    width: 1em;
    height: 1em;
    background-color: transparent;
    border: .25em solid whitesmoke;
    border-radius: 15%;
    transform: translate(0, -1em) rotate(-45deg);
    animation: push 2.5s cubic-bezier(.79, 0, .47, .97) infinite;
  }

  @keyframes push {
    0% {
      transform: translate(0, -1em) rotate(-45deg);
    }
    5% {
      transform: translate(0, -1em) rotate(-50deg);
    }
    20% {
      transform: translate(1em, -2em) rotate(47deg);
    }
    25% {
      transform: translate(1em, -2em) rotate(45deg);
    }
    30% {
      transform: translate(1em, -2em) rotate(40deg);
    }
    45% {
      transform: translate(2em, -3em) rotate(137deg);
    }
    50% {
      transform: translate(2em, -3em) rotate(135deg);
    }
    55% {
      transform: translate(2em, -3em) rotate(130deg);
    }
    70% {
      transform: translate(3em, -4em) rotate(217deg);
    }
    75% {
      transform: translate(3em, -4em) rotate(220deg);
    }
    100% {
      transform: translate(0, -1em) rotate(-225deg);
    }
  }
</style>
