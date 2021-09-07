<template>
  <div class="col-md-6">
    <div class="form-group">
      <label>Input option : </label>
      <textarea
        class="form-control"
        v-model="searchText"
        rows="3"
        cols="40"
        @keyup="updateTextFormat"
      ></textarea>
      <button
        data-toggle="modal"
        data-target="#myModal"
        @click="setModalserachText"
        class="mt-2 btn btn-outline-dark"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      query: "",
      searchText: "",
      apiresponse: [],
      checkedKeywords: [],
      word_array: [],
      loading: false,
      ResultKeywords: "",
    };
  },
  methods: {
    setModalserachText: function () {
      let word = this.searchText.split(/[OR,AND]/);
      const arrFiltered = word.filter((el) => {
        return el != null && el != "";
      });
      this.word_array = arrFiltered.map(function (el) {
        let new_l = el.trim();
        new_l = new_l.replace("'", "");
        new_l = new_l.replaceAll('"', "");
        return new_l;
      });
      this.$emit("find-words", this.word_array);
    },
    updateTextFormat: function () {
      this.searchText = this.searchText.replace(regex, "");
      const regex = /\bor\b/gi;
      this.searchText = this.searchText.replace(regex, "OR");
      const regex1 = /\band\b/gi;
      this.searchText = this.searchText.replace(regex1, "AND");
      var matches = this.searchText.match(/"/g);
      if (matches) {
        if (matches.length >= 2) {
          var doubleQuotedString = extractAllText(this.searchText);
          doubleQuotedString.forEach((e) => {
            var orString = e.replace(regex, "or");
            var demo = orString.replace(regex1, "and");
            this.searchText = this.searchText.replaceAll(e, demo);
          });
        }
      }
      function extractAllText(str) {
        const re = /"(.*?)"/g;
        const result = [];
        let current;
        while ((current = re.exec(str))) {
          result.push(current.pop());
        }
        return result.length > 0 ? result : [str];
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
