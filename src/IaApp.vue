<template>
  <div id="ia-app">
    <ia-dev-hints></ia-dev-hints>
    <ia-loader></ia-loader>
    <!--
    <ia-notifications></ia-notitications>
    <ia-print-view></ia-print-view>
    -->
    <ia-main></ia-main>
    <ia-sidebar></ia-sidebar>
    <ia-footer></ia-footer>
    <ia-log></ia-log>
  </div>
</template>

<script>
  import IaDevHints from './IaDevHints.vue'
  import IaLoader from './IaLoader.vue'
  import IaMain from './IaMain.vue'
  import IaSidebar from './IaSidebar.vue'
  import IaFooter from './IaFooter.vue'
  import IaLog from './IaLog.vue'
  //import IaNotifications from './IaNotifications.vue'
  //import IaPrintView from './IaPrintView.vue'

  export default {
    components: {IaDevHints, IaLoader, IaMain, IaSidebar, IaFooter, IaLog},
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss">
#ia-app {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  background-color: #fff;

  button{
    cursor: pointer;
    overflow: hidden;
  }
}
</style>
