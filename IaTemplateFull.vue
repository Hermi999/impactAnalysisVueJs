<template>

  <!-- Place your html here ... -->
  
  <!-- ********** Below you can find some examples ****** -->

  <!-- Simple data binding (automatically updated). The variable is always interpreted as plain text -->
  <span>Message: {{ msg }}</span>

  <!-- one time data binding by using the v-once directive -->
  <span v-once>This will never change: {{ msg }}</span>

  <!-- Insertion of raw HTML with the v-html directive (data bindings are ignored) -->
  <span v-html="rawHTML"></span>

  <!-- Manipulation of html attributes with v-bind directive ({{}} are not possible) -->
  <div v-bind:id="dynamicId"></div>
  <div :id="dynamicId"></div>         <!-- shorthand for v-bind -->

  <!-- conditions with v-if directive -->
    <div id="condition">
      <p v-if="seen">Now you see me</p>
    </div>

  <!-- loops if v-for directive -->
  <div id="loop">
    <ol>
      <li v-for="todo in todos"
          :key="todo.text">
        {{ todo.text }}
      </li>
    </ol>
  </div>

  <!-- event handling via the v-on: directive or the @ shorthand-->
  <div id="event">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">Reverse Message with v-on: directive</button>
    <button @click="reverseMessage">Reverse Message with @ shorthand</button>
  </div>

  <!-- Using modifiers to bind in a special way -->
  <form @submit.prevent="onSubmit"></form>  <!-- tells v-on directive to call event.preventDefault() on the triggered event -->

  <!-- Using filters to manipulate text -->
  <span>{{ message | capitalize }}</span>


</template>

<script>
  // import other components which can be used in the template
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        // place your variables here. some examples are already here...
        msg: "This demonstrates data binding",
        seen: true,
        todos: [              // array of objects
          { text: 'aaaa' },
          { text: 'bbbb' },
          { text: 'cccc' }
        ],
        message: "Hello you."
      };
    },

    props: {  // properties which can be changed from extern
      dynamicId: {
        type: String,
        default: "id-123",
      }
    },

    computed: { // computed properties. e.g.: reverse text

    },

    watch: {    // watched properties

    },
    
    methods: {  // manipulate the variables
      // place your methods here. some examples are already here...
      reverseMessage: function () {
        // the message variable is accessed via this.message
        this.message = this.message.split('').reverse().join('');
      },
      onSubmit: function () {
        // do something...
      },
    },

    filters: {  // have to return a value
      capitalize: function(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
}
</script>

<style lang="scss">
  // place your scss here...
</style>
