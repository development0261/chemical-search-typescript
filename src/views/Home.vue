<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <InputWord @find-words="findWords"/>
        <ModalSearch />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InputWord from "@/components/InputWord.vue"; // @ is an alias to /src
import ModalSearch from "@/components/ModalSearch.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    InputWord,
    ModalSearch,
  },
  methods: {
    findWords(words) {
      console.log(words);
    }
  }
});
</script>
