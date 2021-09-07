<template>
  <div class="col-md-6" v-if="words_string">
    <div class="form-group">
      <label>On submit</label>
      <textarea
        class="form-control"
        v-model="words_string"
        rows="3"
        cols="40"
      ></textarea>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "OutputWord",
  props: {
    finalWords: String,
  },
  data() {
    return {
      words_string: "",
    };
  },
  watch: {
    finalWords(value) {
      this.words_string = value;
    },
  },
});
</script>
