export default function(){
  // if any key is pressed
  window.addEventListener('keydown', function(e){
    var code = e.keyCode || e.which;

    pressBackspace(code);   // go back to previous ia page
    pressArrowRight(code);  // go to next ia page
    pressArrowLeft(code);   // go to previous ia page
    pressStrgL(code);       // show gloabl log
    pressStrgI(code);       // open import json dialog
    pressStrgP(code);       // overwrite Print functionality
    pressStrgS(code);       // open save to json dialog
    pressStrgDot(code);     // open dev view

    function pressStrgDot(code){
      // Strg+.
      if (code === 190 && e.ctrlKey){
        ia.bus.$emit("show_dev_hints", 1);
      }
    }

    function pressBackspace(code){
      if (code === 8){
        // if not in any kind of input field
        if(document.activeElement.tagName !== "INPUT"){
          // if there is a last page
          if(ia.last_page.length > 0){
            var lp = ia.last_page.pop();
            c.go_to_other_page(lp.questions, lp.sys_name, lp.sys_color, true);
            e.preventDefault();
          }
        }
      }
    }

    function pressArrowRight(code){
      if (code === 39){
        // if not in any kind of input field
        if(document.activeElement.tagName !== "INPUT"){
          var sfn = $(".sys-el-link");
          if (sfn.length > 0){
            var sf_page_next = false, on_sf_page = false;
            for(var z=0; z<sfn.length; z+=1){
              // if current page
              var sf = $(sfn[z]);
              if(sf.data("name") === ia.current_page.sys_name){
                on_sf_page = true;
                if(z < sfn.length-1){
                  sf_page_next = true;
                  var next_sf = $(sfn[z+1]);
                  c.go_to_other_page(ia[next_sf.data("type")+"_questions"], next_sf.data("name"), next_sf.data("color"));
                  break;
                }
              }
            }
            if(!sf_page_next){
              if(on_sf_page){
                // go the initial ia page
                c.go_to_other_page(ia.initial_questions);
              }else{
                var first_sf = $($(".sys-el-link")[0]);
                c.go_to_other_page(ia[first_sf.data("type")+"_questions"], first_sf.data("name"), first_sf.data("color"));
              }
            }
          }
        }
      }
    }

    function pressArrowLeft(code){
      if (code === 37){
        // if not in any kind of input field
        if(document.activeElement.tagName !== "INPUT"){
          var sfn2 = $(".sys-el-link");
          if (sfn2.length > 0){
            var sf_page_next2 = false, on_sf_page2 = false;
            for(var m=0; m<sfn2.length; m++){
              // if current page
              var sf2 = $(sfn2[m]);
              if(sf2.data("name") === ia.current_page.sys_name){
                on_sf_page2 = true;
                if(m > 0){
                  sf_page_next2 = true;
                  var next_sf2 = $(sfn2[m-1]);
                  c.go_to_other_page(ia[next_sf2.data("type")+"_questions"], next_sf2.data("name"), next_sf2.data("color"));
                  break;
                }
              }
            }
            if(!sf_page_next2){
              if(on_sf_page2){
                // go the initial ia page
                c.go_to_other_page(ia.initial_questions);
              }else{
                var _sfn = $(".sys-el-link");
                var last_sf = $(_sfn[_sfn.length-1]);
                c.go_to_other_page(ia[last_sf.data("type")+"_questions"], last_sf.data("name"), last_sf.data("color"));
              }
            }
          }
        }
      }
    }

    function pressStrgL(code){
      if(code == 76 && e.ctrlKey && !e.shiftKey){
        c.showGlobalLog();
        e.preventDefault();
      }
    }

    function pressStrgI(code){
      if(code == 73 && e.ctrlKey && !e.shiftKey){
        ia.init.importJSON();
        e.preventDefault();
      }
    }

    function pressStrgP(code){
      if(code == 80 && e.ctrlKey){
        // timeout to close menu
        setTimeout(function(){
          c.createPrintView();
          window.print();
          // actions after print is finished are wrapped in a timeout function
          setTimeout(function(){
            $("#enter_info_overlay").hide();
            $("#enter_info_wrapper").show();
            $("#side-bar").show();
            $("._test_").remove();

            c.go_to_other_page();
          },111);
        }, 300);
        e.preventDefault();
      }
    }

    function pressStrgS(code){
      if (code === 83 && e.ctrlKey){
        var data = c.get_data_to_save();
        c.create_download_json_link(data);
        e.preventDefault();
      }
    }
  });
}