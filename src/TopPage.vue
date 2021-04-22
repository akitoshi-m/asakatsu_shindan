<template>
  <div id="app">
    <!-- トップページ -->
    <div v-if="currentPage === 'top-page'" class="main-background">
      <div class="main-title">＼\朝活診断/／</div>
      <div class="sub-title">
        あなたの朝活力を診断します<br>
        質問は10個。あなたの朝活力はいかに？
      </div>
        <img src="@/assets/asakatsu_shindan_top.svg" alt="asakatsu_shindanトップ画像" width="400px" height="400px" />
      <div class="buttons">
        <button class="button is-primary" @click="startQuestion">診断を開始する</button>
      </div>
    </div>
    <!-- 質問ページ -->
    <div v-if="currentPage === 'question-page'">
      <div class="question-area">
        <div class="question-test">
          Q.朝起きたらプロテインを飲む
        </div>
        <div @click="somethingYesMethod" class="button">YES</div>
        <div @click="somethingNoMethod" class="button">NO</div>
      </div>
      <div class="question-image">画像イメージ
      </div>
    </div>
    <!-- 結果表示ページ -->
    <div v-if="currentPage === 'result-page'">
      <div>結果表示ページ</div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentPage: "top-page"
    }
  },
  methods: {
    startQuestion() {
      this.currentPage = "question-page";
    },
    showResult() {
      this.currentPage = "result-page";
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-background {
  background-color: #ffffff;
  margin: 0 auto;
}


.main-title {
  color: #e25656;
  font-size: 60px;
}

.sub-title {
  font-size: 30px;
}

.button {
  margin: 50px auto;
}
</style>
