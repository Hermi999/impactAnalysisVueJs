<template>
  
  <div id="allocation-and-upload">
    <div v-show="!showAllocationAndUpload" id="allocation-and-upload-overlay"></div>
    <div class="row">
      <div id="allocation-suggestion-wrapper" class="form-group col-md-6">
        <label>Suggested allocation</label>
        <input id="allocation-suggestion" class="form-control" disabled="disabled" value="-">
      </div>

      <div class="form-group col-md-6">
        <label>Overwrite allocation</label>
        <select id="allocation-select" class="form-control">
          <option>choose optionally</option>
          <option>SYS-ECU</option>
          <option>SYS-SF</option>
          <option>SYS-SW</option>
          <option>SW</option>
          <option>HW</option>
          <option>SW-Design</option>
          <option>ChangeBasedDev</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label>Allocation comment</label>
      <textarea id="allocation-comment" rows="2"></textarea>
    </div>

    <div class="form-group">
      <button id="upload-to-isw" disabled="disabled" type="button" class="btn btn-primary">Upload to I-SW</button>
      <button id="effort-estimation" type="button" class="btn btn-warning">Effort Estimation Text</button>
    </div>
  </div>

</template>

<script>
  //import Headline from './Headline.vue'

  export default {
    //components: {Headline},
    data () {
      return {
        showAllocationAndUpload: false
      }
    },
    mounted: function(){
      this.$el.querySelector("#allocation-select").selectedIndex = 0
      this.$el.querySelector("#allocation-suggestion").text = ia.allocation;
      this.$el.querySelector("#allocation-comment").text = ia.allocation_comment;
      this.$el.querySelector("#upload-to-isw").disabled = true;
    },
    created: function(){
      ia.bus.$on("activate_allocation_upload", () => this.showAllocationAndUpload = true);
    }
}
</script>

<style lang="scss">
  #allocation-and-upload-overlay{
    position: absolute;
    top:0px;
    left:0px;
    background-color: rgba(60, 60, 60, 0.77);
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  #allocation-and-upload{
    background-color: #4a4a4a;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
  }
  #allocation-suggestion{
    color: #444444;
    background-color: grey;
    box-shadow: 0 0 5px;
  }
  #allocation-select{
    color: black;
  }
  #allocation-comment{
    width: 100%;
    color: black;
    font-size: 0.8em;
  }
</style>
