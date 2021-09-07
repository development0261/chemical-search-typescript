<template>
  <div class="col-md-6">
    <div class="custom-modal" :class="{ 'custom-modal-open': customModal }">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <span tabindex="0"></span>
        <div tabindex="-1" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Synonyms</h5>
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
              <input
                type="text"
                class="form-control"
                v-model="ModalsearchText"
              />
              <button class="btn btn-success ml-2" @click="getWordList">
                Analyze
              </button>
            </div>
            <div class="mt-3">
              <b v-if="apiresponse.length">Keywords Suggestions : </b>
            </div>
            <div class="text-center mt-2" v-if="loading">
              <p>Loading...</p>
            </div>
            <div class="words-block" v-else>
              <div v-for="(row, index) in apiresponse" :key="index">
                <input
                  :id="row"
                  type="checkbox"
                  name="Keywords"
                  :value="row"
                  v-model="checkedKeywords"
                  ref="suggestionKeyword"
                />
                <label
                  @click="addWord(row)"
                  :for="row"
                  :class="{
                    active: checkedKeywords.some(
                      (x) => x.toLowerCase() == row.toLowerCase()
                    ),
                  }"
                  >{{ row }}</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="clearSelection"
            >
              Clear
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="SubmitCheckedKeywords"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "Modal",
  props: {
    words: Array,
  },
  data() {
    return {
      query: "",
      searchText: "",
      ModalsearchText: "",
      apiresponse: [],
      checkedKeywords: [],
      word_array: [],
      loading: false,
      ResultKeywords: "",
      customModal: false,
    };
  },
  computed: {
    ...mapState(["wordList"]),
    ...mapGetters(["wordList"]),
  },
  watch: {
    words(value) {
      this.word_array = value;
      if (this.word_array) {
        if (!this.ModalsearchText) {
          this.ModalsearchText = this.word_array[0];
        }
      }
      if (!this.customModal) {
        this.customModal = true;
      }
    },
  },
  methods: {
    clearSelection: function () {
      this.searchText = "";
      this.ResultKeywords = "";
      this.ModalsearchText = "";
      this.apiresponse = [];
      this.word_array = [];
      this.checkedKeywords = [];
      this.$emit("final-words", this.ResultKeywords);
      this.customModal = false;
    },
    showModal() {
      this.customModal = true;
    },
    hideModal() {
      this.customModal = false;
    },
    async getWordList(req = null) {
      this.loading = true;
      this.checkedKeywords = [];
      this.apiresponse = [];
      this.ResultKeywords = "";
      req = {
        word: this.ModalsearchText,
      };
      this.$store
        .dispatch("wordList", req)
        .then((res) => {          
          if ("InformationList" in res) {
            this.apiresponse = this.apiresponse.concat(
              res.InformationList.Information[0].Synonym
            );
            this.word_array.forEach((word) => {
              this.checkedKeywords.push(word);
            });
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    addWord(word) {
      if (this.word_array.some((x) => x.toLowerCase() == word.toLowerCase())) {
        var word_index = this.word_array.findIndex(
          (item) => word.toLowerCase() === item.toLowerCase()
        );
        if (~word_index) this.word_array.splice(word_index, 1);
      } else {
        this.word_array.push(word);
      }
    },
    SubmitCheckedKeywords: function () {
      this.checkedKeywords = this.checkedKeywords.filter(function (
        item,
        index,
        checkedKeywords
      ) {
        return checkedKeywords.indexOf(item) == index;
      });
      var resultkeywordss = this.checkedKeywords.map(function (keyword) {
        return "(" + keyword + ")";
      });
      // join the fruits with the comma's in between
      var result = resultkeywordss.join(" OR ");
      this.ResultKeywords = result;
      this.$emit("final-words", this.ResultKeywords);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
.words-block::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.words-block::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  background-color: #ced4da;
}
.words-block {
  display: flex;
  overflow-y: scroll;
  max-height: 175px;
  flex-wrap: wrap;
}
.words-block div {
  position: relative;
  margin-right: 10px;
  margin-top: 10px;
}
.words-block div input {
  visibility: hidden;
  position: absolute;
}
.words-block div label {
  cursor: pointer;
  user-select: none;
  padding: 5px 10px;
  background: #e3e3e3;
  border-radius: 3px;
}
.words-block div label.active {
  background: #00bcd4;
  color: #fff;
}
</style>
