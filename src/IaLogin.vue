<template>

  <div id="enter_info_overlay">
    <div id="enter_info_wrapper">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6" id="info-field">
          <div class="form-group">
                <label for="issue_sw_id">Issue SW ID</label>
                <input  type="text" 
                        class="form-control" 
                        id="issue_sw_id" 
                        placeholder="RQONE00123456" 
                        @keyup.enter="submitForm"
                        v-model="isw_id">
          </div>
          
          <div class="form-group">
                <label for="username">Username</label>
                <input  type="text" 
                        class="form-control" 
                        id="username" 
                        placeholder="wah82wi" 
                        @keyup.enter="submitForm"
                        v-model="un">
          </div>
          
          <div class="form-group">
                <label for="password">RQ1 Password</label>
                <input  type="password" 
                        class="form-control" 
                        id="password" 
                        placeholder="*********" 
                        @keyup.enter="submitForm"
                        v-model="pw">
          </div>

          <div  id="login-error-message"
                v-if="show_error_msg">
            {{ error_msg }}
          </div>

          <button id="start-impact-analysis" 
                  type="button" 
                  class="btn btn-success" 
                  @click="submitForm">
            Start Impact Analysis
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  // import other components which can be used in the template
  import router from './routes';

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        isw_id: "RQONE00822132",
        un: "wah82wi",
        pw: "hermi33hermi",
        error_msg: ia.login_error,
        show_error_msg: false,
      };
    },

    created(){
      ia.bus.$on("fetch_data_from_server_error", (msg) => {
        this.error_msg = msg;
        this.show_error_msg = true;
      });
    },

    props: {  // properties which can be changed from extern
    },
    
    methods: {  // manipulate the variables
      submitForm: function(e){
        // check if all fields are filled with data
        if(this.isw_id !== "" && this.un !== "" && this.pw !== ""){
          this.show_error_msg = false;

          // store globally
          ia.username = this.un;
          ia.password = this.pw;
          ia.issue_id = this.isw_id;

          // trigger showing loader
          ia.bus.$emit("toggle_loader", "IaLogin");

          // fetch data from server and show loader
          ia.fetch_data_from_server();
        }else{
          // show login error message
          this.show_error_msg = true;
        }
      }
    },

    filters: {  // have to return a value
    }
}
</script>

<style lang="scss">
  #enter_info_overlay{
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 3001;
    top: 0px;
    left: 0px;
    background-color: rgba(60, 60, 60, 0.93);
  }
  #enter_info_wrapper{
    position: fixed;
    top: 30%;
    width: 70%;
    margin: 0% 5%;

    label{
      font-weight: bold;
      margin-bottom: 2px;
    }
  }
  #login-error-message{
    color: #fefefe;
    margin-bottom: 10px;
    background-color: #db3434;
    padding: 5px 10px;
    border-radius: 5px;
  }
  #info-field{
    background-color: #dedede;
    border: 2px solid #3b3b3b;
    box-shadow: 5px 5px 15px #595959;
    padding: 20px;
    max-width: 400px;
  }
  #start-impact-analysis{
    width: 100%;
    border: 2px solid rgb(74, 74, 74);
    box-shadow: 3px 3px 8px #383838;
  }
</style>
