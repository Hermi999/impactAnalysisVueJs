<template>

  <b-modal  :id="name + '-modal'"
            :hide-footer="true"
            size="lg"
            :title="title"
            class="sys-el-modal">
    <div class="sys-el-headline row">
      <div class="col-md-6"></div>
      <div class="col-md-6 sys-el-selected-elements-wrapper">
        <b>Selected elements</b>
        <div class="sys-el-selected-elements">
          <ia-selected-element  v-for="(el, key) in sel_elem"  
                                :key="sel_elem.name"
                                :elName="el.name"
                                :elType="name"
                                :bgColor="el.color">
          </ia-selected-element>
          </span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-md-6">
        <label>{{ searchLabel }}</label>
        <input  type="text" 
                class="form-control" 
                :placeholder="searchPlaceholder"
                v-model="searchInput">
      </div>

      <div class="cant-find-fc col-md-6">
        <button v-if="multiselect" class="btn btn-danger" @click="removeAllElements">Remove all</button>
        <button v-if="cantFind" 
                @click="$root.$emit('show::modal', name + '-cant-find-modal')"
                class="cant-find-fc-button btn btn-warning">{{ cantFindElementText }}</button>

        <b-modal  :id="name + '-cant-find-modal'"
                  v-if="cantFind"
                  :hide-footer="true"
                  size="md"
                  :title="cantFindTitle">
          <slot name="cantFindModal"></slot>
        </b-modal>
      </div>
    </div>
    
    <table>
      <thead>
        <tr class="list-row">
          <th v-for="el in header_elements" 
              :class="'list-header list-element-' + el.toLowerCase()">
            {{ el }}
          </th>    
        </tr>
      </thead>
        
      <tbody>
        <tr class="list-row" 
            v-for="row in list_elements" 
            v-if="rowFilter(row) && rowVisible(row)"
            :data-element="row[uniqueKey] || row[uniqueKey]"
            :data-prio="row.Priority"
            :style="getRowSelected(row)"
            @click="listElementClicked">
          <td v-for="(val, key) in row"
              :key="row[0]"
              :class="'list-element list-element-' + key.toLowerCase()">
            
            <span v-html="getFieldDataAsHtml(val)">
            </span>

          </td>
        </tr>
      </tbody>  
    </table>
  </b-modal>

</template>

<script>
  // import other components which can be used in the template
  import IaSelectedElement from './IaSelectedElement.vue'

  export default {
    components: {IaSelectedElement},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        list_elements: ia[this.name+"_list"],
        sel_elem: ia[this.name],
        searchInput: ""
      };
    },
    
    props: {  // properties which can be changed from extern
      name: {           // sf, infra, feature
        type: String,
        required: true
      },
      uniqueKey: {
        type: String,
        required: true
      },
      title:{
        type: String,
        default: "[no title provided]"
      },
      searchLabel:{
        type: String,
        default: "Search"
      },
      searchPlaceholder:{
        type: String,
        default: "..."
      },
      deleteAllText: {
        type: String,
        default: 'Are you sure to delete this element?'
      },
      cantFindElementText:{
        type: String,
        default: "I can't find an element"
      },
      rowFilter: {
        type: Function,
        default: function(row){return true;}
      },
      multiselect: {
        type: Boolean,
        default: true
      },
      colored: {
        type: Boolean,
        default: true
      },
      cantFind: {
        type: Boolean,
        default: true
      },
      cantFindTitle: {
        type: String,
      }
    },
    
    computed: { // computed properties. e.g.: reverse text
      header_elements: function(){
        var header = [];
        for(var k in ia[this.name+"_list"][0]){
          header.push(k);
        }
        return header;
      }
    },

    methods: {  // manipulate the variables
      getFieldDataAsHtml: function(val){
        let _html = "";
        let _val = this.getStringFromField(val);
        let _match_index = this.searchMatch(_val);

        if(_match_index > -1){
          _html = _val.substring(0, _match_index) +
                  "<span class='text_marked'>" + 
                  _val.substring(_match_index, _match_index+this.searchInput.length) + 
                  "</span>" +
                  _val.substring(_match_index+this.searchInput.length);
        }else{
          _html = _val;
        }

        return _html;
      },
      getStringFromField(val){
        if(typeof(val) === "object"){
          return val.join(", ").substring(2);
        }else{
          return val;
        }
      },
      searchMatch: function(val){
        if(this.searchInput.length > 1){
          return val.toLowerCase().indexOf(this.searchInput.toLowerCase());
        }else{
          return -2;
        }
      },
      rowVisible: function(row){
        if(this.searchInput.length > 1){
          for (let key in row){
            let _val = this.getStringFromField(row[key]);
            let _s = this.searchMatch(_val)
            
            if(_s > -1){
              return true;
            }
          }
          return false;
        }else{
          return true;
        }
        
      },
      getRowSelected: function(row){
        if( ia[this.name][row[this.uniqueKey]]){
          return "background-color: #caefff";
        }
      },
      listElementClicked: function(ev){
        var el = ev.currentTarget.dataset.element;
        var prio = ev.currentTarget.dataset.prio;
        
        // add or delete sf
        if (this.sel_elem[el] === undefined){
          // check multiselect
          if( !this.multiselect && 
              Object.getOwnPropertyNames(this.sel_elem).length > 1){
            alert("You can only select one element");
            return;
          }

          ev.currentTarget.style.backgroundColor = "#caefff";
          
          var _bg_color = "";
          if(this.colored){
            _bg_color = ia.available_colors[0];
            ia.available_colors.shift();
          }

          Vue.set(ia[this.name], el, {name: el, 
                                      prio: prio, 
                                      color: _bg_color,
                                      status: "Open",
                                      workflow: "-",
                                      questions: {},
                                      log: [],
                                      })

          // show popup if prio is missing
          if(ia.no_prio_yet !== undefined && prio === ""){
            alert(ia.no_prio_yet);
          }
          //c.update_allocation_suggestion();

        }else{
          if (confirm('Are you sure you want to delete this element and all it\'s content?')) {
            ev.currentTarget.style.backgroundColor = "rgba(255,255,255,0)";
            if(this.colored){
              ia.available_colors.push(this.sel_elem[el].color);
            }
            Vue.delete(ia[this.name], el);
          } else {
              // Do nothing!
          }
        }
      },
      removeAllElements: function(){
        if (confirm(this.deleteAllText)) {
          for(var key in ia[this.name]){
            Vue.delete(ia[this.name], key);
          }
        }
      }
    },
}
</script>

<style lang="scss">
  .sys-el-modal{
    .modal{
      z-index: 1000000;
    }
    .modal-dialog{
      margin-left: 5%;
      min-width: 95%;
    }
    .modal-content{
      overflow-y: scroll;
      overflow-x: scroll;
      max-height: 680px;
    }
    .modal-header{
      min-height: 55px;
    }
    h5, h6{
      font-weight: bold;
    }
    span{
      font-weight: normal;
    }
  }

  .list-element, .list-header{
    min-width: 100px;
    max-width: 250px;
    padding: 5px 10px 5px 0px;
  }
  .list-element-sf{
    font-weight: bold;
    min-width: 165px;
  }
  .list-element-do{
    max-width: 60px;
  }
  .list-element-fc{
    min-width: 260px;
    font-size: 0.8em;
  }
  .marked{
    background-color: #ffefc0;
  }
  .text_marked{
    background-color: #ffc600;
  }
  .list-header{
    margin-bottom: 20px;
    background-color: #4a4a4a;
    color: white;
    padding-left: 2px;
  }
  .sys-el-selected-elements-wrapper{
    margin-top: 0px;
    font-size: 0.9em;
  }
  .list-row{
    border-bottom: 1px solid rgba(41, 41, 41, 0.21);
  }
  .list-row:hover{
    background-color: #e4e4e4;
    cursor: pointer;
  }
  .cant-find-fc{
    padding-top: 19px;
  }
  label{
    margin-bottom: 0px;
    font-weight: bold;
  }
</style>
