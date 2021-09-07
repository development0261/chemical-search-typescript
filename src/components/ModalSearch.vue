<template>
  <div class="col-md-6">
    <b-button id="show-btn" @click="showModal">Open Modal</b-button>
    <div class="custom-modal" :class="{ 'custom-modal-open': customModal }">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <span tabindex="0"></span>
        <div tabindex="-1" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Using Component Methods</h5>
            <button
              type="button"
              @click="hideModal"
              aria-label="Close"
              class="close"
            >
              ×
            </button>
          </header>
          <div class="modal-body">
            <label>Chemical Synanyms : </label>
            <div class="d-flex">
              <input type="text" class="form-control" v-model="ModalsearchText">
              <button class="btn btn-success ml-2" @click="AnalyzeKeywords">Analyze</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="clearSelection" data-dismiss="modal">Clear</button>
            <button type="button" class="btn btn-success" @click="SubmitCheckedKeywords">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <b-modal centered  ref="my-modal" hide-footer title="Using Component Methods" data-backdrop="static">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "Modal",
  props: {
    msg: String,
  },
  data() {
    return {
      query: "",
			searchText: '',
			ModalsearchText: '',
			apiresponse: [],
			checkedKeywords:[],
			word_array: [],
			loading: false,
			ResultKeywords:'',
      customModal: false,
    };
  },
  computed: {
    ...mapState(["chapterList"]),
    ...mapGetters(["chapterList"]),    
  },
  mounted() {
    //this.getChapterList();
  },
  methods: {
    clearSelection: function() {
			this.searchText = "";
			this.ResultKeywords = '';
			this.ModalsearchText = '';
			this.apiresponse = [];
			this.word_array = [];
			this.checkedKeywords = [];
		},
    showModal() {
      this.customModal = true;
    },
    hideModal() {
      this.customModal = false;
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    async getChapterList(req = null) {
      req = {
        word: "benzene",
      };
      this.$store.dispatch("chapterList", req).then((res) => {
        console.log("-->-- dispatch Res --<--", res);
        // if (res.code === 200) {
        //   this.chaptersListRes = res
        // }
      });
    },
    async AnalyzeKeywords() {
			this.loading = true;
			this.checkedKeywords = [];
			this.apiresponse = [];
			this.ResultKeywords = '';
			console.log(this.word_array)
			let promiseArr = this.word_array.map(word => fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/'+word+'/synonyms/json').then(res => res.json()));
			Promise.all(promiseArr).then(res => {		
				res.forEach(r => {
					if ('InformationList' in r) {							
						this.apiresponse = this.apiresponse.concat(r.InformationList.Information[0].Synonym);
						this.word_array.forEach(word => {
							this.checkedKeywords.push(word);
						});
					}
				})
				this.loading = false;
			})
		},
    SubmitCheckedKeywords: function(){
			this.checkedKeywords = this.checkedKeywords.filter( function( item, index, checkedKeywords ) {
           		return checkedKeywords.indexOf(item) == index;
    		});
			var resultkeywordss = this.checkedKeywords.map(function(keyword) {
				return '(' + keyword + ')';
			});
			// join the fruits with the comma's in between
			var result = resultkeywordss.join(' OR ');			
			this.ResultKeywords = result;
		},
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* .modal-open .modal {
    width: 300px;
    margin: 0 auto;
}
.modal-backdrop {
    display: none;
}
.modal-open {
    overflow: auto !important;
} */
.custom-modal {
  position: fixed;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  max-width: 500px;
  width: 100%;
  z-index: 9999;
  visibility: hidden;
}
.custom-modal.custom-modal-open {
  top: 50%;
  opacity: 1;
  visibility: visible;
  display: block;
}
</style>
