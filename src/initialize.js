import router from './routes.js'
import axios from 'axios';
import papaparse from 'papaparse';
import MockAdapter from 'axios-mock-adapter';

// if in development mode, then do mocks for all requests 
var mock_in_dev = true;

// urls
var login_url         = ia.server_url + "ImpactAnalysis_Login";
var aspice_prj_url    = ia.server_url + "ImpactAnalysis_IssueInAspiceProject?IssueSW_ID=";
var pool_prj_id_url   = ia.server_url + "ImpactAnalysis_IssuePoolProject?IssueSW_ID=";
var ia_attachment_url = ia.server_url + "ImpactAnalysis_GetImpactAnalysis?IssueSW_ID=";
var customer_specific_url_basis;
var customer_specific_urls = {};

// if in development mode, then do mocks for all requests
if(mock_in_dev && window.location.href.indexOf("localhost") > -1){
  // This sets the mock adapter on the default instance 
  var mock = new MockAdapter(axios);

  // Mock the requests
  mock.onPost(login_url).reply(200, { ValidCredential: 'True' });
  mock.onGet(aspice_prj_url).reply(200, { LinkedAspiceProject: 'True' });
  mock.onGet(pool_prj_id_url).reply(200, { PoolProject_ID: 'RQONE000000000' });
  mock.onGet(ia_attachment_url).reply(404);
}

function get_dynamic_urls(){
  customer_specific_url_basis = "customer_specific/" + ia.pool_project_id + "/";
  
  // Mock the dynamic requests
  for (var key in ia.customer_specific_files) {
    if (ia.customer_specific_files.hasOwnProperty(key)) {
      var _url = customer_specific_url_basis + ia.customer_specific_files[key] + "?_=" + ia.daily_cache_time;
      customer_specific_urls[key] = _url;
      
      // if in development mode, then do mocks for all requests
      if(mock_in_dev && window.location.href.indexOf("localhost") > -1){
        mock.onHead(_url+ia.issue_id).reply(404);
      }
    }
  }

  // if in development mode, then do mocks for all requests
  if(mock_in_dev && window.location.href.indexOf("localhost") > -1){
    // do not interfere here
    mock.onGet(ia.q_link).passThrough();
    mock.onGet(ia.ptsa_link).passThrough();
    mock.onGet(ia.infra_link).passThrough();
    mock.onGet(ia.feature_link).passThrough();
  }
}


// flattens an object array by a given key.
ia.flattenObjByKey = function(data, k, concat_elements){
  var flat_list = {};

  data.forEach(function(el){             // go through array
    if(flat_list[el[k]] !== undefined){  // if temp list has already the entry el[k]
      
      for(var key in el){                // go through object
        if(concat_elements.includes(key)){
          var tmp = flat_list[el[k]];
          if(tmp[key] === undefined){
            tmp[key] = el[key];
          }
          else if(typeof(tmp[key]) === "string"){
            if(tmp[key] !== el[key]){
              tmp[key] = [tmp[key], el[key]];
            }
          }else{  // array
            if(tmp[key].indexOf(el[key]) < 0){
              tmp[key] = tmp[key].concat(el[key]);
            }
          }
        }
      };
    }else{     // sf does not exist yet
      flat_list[el[k]] = el;
    }
  });

  var flat_list_arr = [];
  for(var _key in flat_list){
    flat_list_arr.push(flat_list[_key]);
  }

  return flat_list_arr.sort(function(el){el[k]});
};





export default function(){

  // 1) Check credentials
  axios.post(login_url, {credentials: {
    username: ia.username, 
    password: ia.password
  }})
  .then(function(response){
    console.log("done checking credentials");

    // complete urls with issue sw id
    if(!mock_in_dev || !(window.location.href.indexOf("localhost") > -1)){
      aspice_prj_url    += ia.issue_id;
      pool_prj_id_url   += ia.issue_id;
      ia_attachment_url += ia.issue_id;
    }

    if(response.data && response.data.ValidCredential === "True"){
      aspice_prj_pool_prj();
      //router.push({ path: 'infra', params: { sf: 1 } });
    }else{
      ia.bus.$emit("fetch_data_from_server_error", ia.login_error);
      ia.bus.$emit("toggle_loader", "initialize.js");
    }
  })
  .catch(function(error){
    ia.bus.$emit("fetch_data_from_server_error", ia.server_error + " \nError Message: "+ error.message);
    ia.bus.$emit("toggle_loader", "initialize.js");
  });


  // 2a) Check if aspice project is connected to i-sw via IRM
  // 2b) get the ID of the pool project the I-Sw is connected to.
  // This is needed for fetching department specific data
  function aspice_prj_pool_prj(){
    function get_aspice_prj_connected(){
      return axios.get(aspice_prj_url);
    }

    function get_pool_prj_id(){
      return axios.get(pool_prj_id_url);
    }
    
    axios.all([get_aspice_prj_connected(), get_pool_prj_id()])
    .then(axios.spread(function (resp1, resp2) {
      // Both requests are now complete
      ia.linkedAspiceProject = resp1.data.LinkedAspiceProject.toLowerCase() === "true";
      ia.pool_project_id = resp2.data.PoolProject_ID;

      get_dynamic_urls();
      fetch_department_specific_files();
    }))
    .catch(function(error){
      ia.bus.$emit("fetch_data_from_server_error", ia.server_error + " \nError Message: "+ error.message);
      ia.bus.$emit("toggle_loader", "initialize.js");
    });
  }


  // 3) fetch department specific files (code, ptsa, questions, answers, ...)
  function fetch_department_specific_files(){
    for (var key in customer_specific_urls) {
      if (customer_specific_urls.hasOwnProperty(key)) {
        axios.head(customer_specific_urls[key])
        .then(function(exists){
          // customer specific file exists -> overwrite the default file url
          ia[k] = customer_specific_urls[key];
          load_content();
        })
        .catch(function(not_exists){
          // customer specific file does not exist
          load_content();
        });
      }
    }
  }

  // 4a) load standard or customer specific content like csv or question files
  function load_content(){
    ia.customer_specific_files_counter++;

    // load text/questions/ptsa/infrastrucutre all at once
    if(ia.customer_specific_files_counter >= ia.customer_specific_files_length){
      // load (customer specific) text/questions
      function getTextAndQuestions(){
        return axios.get(ia.q_link);
      }

      // load ptsa elements
      function getPTSAElements(){
        return axios.get(ia.ptsa_link);
      }

      // load infrastructure elements
      function getInfraElements(){
        return axios.get(ia.infra_link);
      }

      // load feature list elements
      function getFeatureElements(){
        return axios.get(ia.feature_link);
      }

      axios.all([getTextAndQuestions(), getPTSAElements(), getInfraElements(), getFeatureElements()])
        .then(axios.spread(function(text, ptsa, infra, feature){
          console.log("done loading text/questions/ptsa/infrastructure");
          
          // execute text and questions (javascript code)
          eval(text.data);

          // parse and format ptsa & infrastructure elements so that they are easily usable
          //parsePTSA(ptsa.data);
          parseCSV(ptsa.data, ia.sf_list, "SF", ["FC", "BC"]);
          parseCSV(infra.data, ia.infra_list, "SF", ["FC", "BC"]);
          parseCSV(feature.data, ia.feature_list);

          // now load i-sw attachment if available
          get_impact_analysis_attachment();

        }))
        .catch(function(error){
          ia.bus.$emit("fetch_data_from_server_error", ia.server_error + " \nError Message: "+ error.message);
          ia.bus.$emit("toggle_loader", "initialize.js");
        });


      // this function parses a csv and flattens the resulting object by the column (string) given in the
      // flatten_by parameter. The flatten_concat array takes columns (strings) which should be concatenated
      // during the flatten process.
      function parseCSV(raw_csv_data, list_arr, flatten_by, flatten_concat){
        papaparse.parse(raw_csv_data, {
          header: true,
          complete: function(results){
            if(results.errors.length > 0){
              console.log("Errors occured while parsing CSV document! See object below:");
              console.log(results.errors);
            }
            if(flatten_by){
              var flat = ia.flattenObjByKey(results.data, flatten_by, flatten_concat);
              Object.assign(list_arr, flat);
            }
            else{
              Object.assign(list_arr, results.data); 
            }
          }
        });
      }
    }
  };



  // 4) get impact analysis attachment from i-sw
  function get_impact_analysis_attachment(){
    axios.get(ia_attachment_url)
    .then(function(response){
      console.log("done loading impact analysis attachment");
      if (response.data.IA_Json){
        var _import = JSON.parse(response.data.IA_Json);
        ia.allocation = _import.allocation;
        ia.allocation_comment = _import.allocation_comment;
        ia.initial = _import.initial_ia;
        ia.sf = _import.sf_ia;
        ia.infra = _import.infra_ia;
        ia.initial_questions = _import.initial_questions;
        ia.sf_questions = _import.sf_questions;
        ia.infra_questions = ia.infra_questions;
        ia.available_colors = _import.available_colors,
        ia.Q_TOOL_VERSION = _import.TOOL_VERSION;
        ia.QUESTION_VERSION = _import.QUESTION_VERSION;
        $("#question-version").innterHTML("Question v" + ia.QUESTION_VERSION);
      }
    })
    .catch(function(error) {
      console.log("*** no attachment available");
    })
    .then(function(){
      // in any case, hide the loader and show the questions
      ia.bus.$emit("toggle_loader", "initialize.js");
      ia.bus.$emit("activate_allocation_upload");
      router.push({ path: 'initial' });
    });
  }
}