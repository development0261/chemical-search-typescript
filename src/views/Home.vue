<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <InputWord @find-words="findWords" />
        <OutputWord :finalWords="finalWords" />
        <ModalSearch :words="words" @final-words="finalWordsFound" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InputWord from "@/components/InputWord.vue"; // @ is an alias to /src
import ModalSearch from "@/components/ModalSearch.vue";
import OutputWord from "@/components/OutputWord.vue";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      words: [],
      finalWords: "",
    };
  },
  components: {
    InputWord,
    ModalSearch,
    OutputWord,
  },
  methods: {
    findWords(words) {
      this.words = words;
    },
    finalWordsFound(fw) {
      this.finalWords = fw;
    },
  },
});
</script>
