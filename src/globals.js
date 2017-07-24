var ia={init:{}, code:{}, preload:{}, modules:{}};


// helpers 
ia.code.getURLParameterByName = function(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// returns page specific questions as an object (incl. non-question key-value pairs)
ia.code.getPageQuestions = function(page_type){
  switch(page_type){
    case "initial": return ia.initial_questions;
    case "sf": return ia.sf_questions;
    case "infra": return ia.infra_questions;
    default: throw "unknown page type exception";
  }
};

// returns sorted array of questions of a specific page type (removes other key-value pairs)
ia.code.getPageQuestionsArray = function(page_type){
  var question_obj = ia.code.getPageQuestions(page_type);
  var q_arr = [];

  for(var key in question_obj){
    // if object entry is question
    if(key.charAt(0) === "q" || typeof(question_obj[key]) === "object"){
      question_obj[key].num = Number(key.substr(1));
      q_arr.push(question_obj[key]);
    }
  };

  return q_arr.sort(function(a, b){return a.num-b.num});
};

// returns a page questions arr structured and ordered by type. 
// Each type object array element contains an array of questions.
ia.code.getPageQuestionsByType = function(page_type){
  var question_obj = ia.code.getPageQuestions(page_type);
  var type_obj = {};
  var counter = 0;

  for (var key in question_obj){
    // if object entry is question
    if(key.charAt(0) === "q" || typeof(question_obj[key]) === "object"){
      var _type = question_obj[key].type;
      if(type_obj[_type]){
        // type already exists
        type_obj[_type]["questions"].push(question_obj[key]);
      }else{
        // type does not exist
        type_obj[_type] = {
          order: counter,
          type: _type,
          questions: [question_obj[key]],
        };
        counter++;
      }
    }
  }

  // turn into array and sort
  var type_arr = ia.code.objToArr(type_obj);
  type_arr.sort(function(a, b) {
    if (a.order < b.order)
      return -1;
    if (a.order > b.order)
      return 1;
    return 0;
  });

  return type_arr;
}

ia.code.objToArr = function(obj){
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

// globals
ia.TOOL_VERSION = "1.1";
ia.allocation = "-";  // only automatic allocation
ia.allocation_comment = "-";
ia.colors = ["#9c27b0", "#e91e63", "#673ab7", "#3f51b5", "#009688", "#8bc34a", "#ffc107", "#ff5722", "#607d8b", "#4caf50", "#2196f3", "#795548", "#00bcd4", "#ffeb3b", "#9e9e9e", "#f0ad4e", "#f44336"];
ia.available_colors = ia.colors;
ia.server_error = "Server returned an error. Please check your input.";
ia.login_error = "Please enter a valid Issue SW ID and Credentials";
ia.server_url = "https://wi0www02.emea.bosch.com/BuggyLockedTest/IAToolService/";
ia.issue_id = ia.code.getURLParameterByName("id");
ia.username = undefined;
var dt = new Date();
ia.daily_cache_time = String(dt.getDate())+String(dt.getMonth()+1)+String(dt.getFullYear());

// links to files (can be customer specific)
ia.feature_link = "default-files/feature-list.csv";
ia.ptsa_link = "default-files/system-elements.csv";
ia.infra_link = "default-files/infra.csv";
ia.q_link = "default-files/text.js";
ia.customer_code_link = "default-files/customer.js";  
ia.customer_specific_files = {feature_link: "feature-list.csv", ptsa_link: "system-elements.csv", infra_link: "infra.csv", q_link: "text.js", customer_code_link: "customer.js"};
ia.customer_specific_files_length = 5;
ia.customer_specific_files_counter = 0;

// store the pages and states of the questions
ia.sf = {};
ia.sf_list = {};
ia.infra = {};
ia.infra_list = {};
ia.feature = {};
ia.feature_list = {};
ia.initial = {questions: {}};
