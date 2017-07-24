<template>
  <div id="ia-main">
    <ia-headline></ia-headline>
    <ia-overview></ia-overview>
    <ia-page-name></ia-page-name>

    <!-- Route pages will be inserted here... -->
    <router-view></router-view>

  </div>
</template>

<script>
  import IaHeadline from './IaHeadline.vue'
  import IaOverview from './IaOverview.vue'
  import IaPageName from './IaPageName.vue'

  export default {
    components: {IaHeadline, IaOverview, IaPageName},
    data () {
      return {
      };
    },
    methods: {
    }
}
</script>

<style lang="scss">
  #ia-main{
    padding: 30px 20px;
    min-width: 600px;
    width: 70%;
    float:left;
  }
</style>
