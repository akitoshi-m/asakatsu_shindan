<template>
  <div id="app">
    <!-- トップページ -->
    <div v-if="currentPage === 'top-page'" class="top-page">
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
      <div class="question-page">
        <div class="question-area">
          <div v-for="(question, index) in questionLists" :key="question.id" class="question-text">
              <div v-if="questionCount === index">
                <p>Q{{ index + 1 }}. {{ question.name }}</p>
              </div>
          </div>
          <button @click="answerYes" class="button is-primary question-button">YES</button>
          <button @click="answerNo" class="button is-danger question-button">NO</button>
        </div>
        <div class="question-image">
          <img src="@/assets/asakatsu_shindan_top.svg" alt="質問ページの画像" width="400px" height="400px" />
        </div>
      </div>
    </div>
    <!-- 結果表示ページ -->
    <div v-if="currentPage === 'result-page'">
      <div>結果表示ページ</div>
      <div v-if="asakatsuPoint >= 9">
        <p>朝活マスター</p>
      </div>
      <div v-else-if="asakatsuPoint >= 7">
        <p>朝活プロ</p>
      </div>
      <div v-else-if="asakatsuPoint >= 5">
        <p>朝活アマ</p>
      </div>
      <div v-else-if="asakatsuPoint >= 3">
        <p>朝活入門者</p>
      </div>
      <div v-else-if="asakatsuPoint >= 0">
        <p>朝活見習い</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentPage: "top-page",
      asakatsuPoint: 0,
      questionCount: 0,
      questionLists: [
        { name: "朝起きたらプロテインを飲む", trainee: true },
        { name: "筋トレをしている", trainee: true},
        { name: "読書をしている", trainee: false},
        { name: "資格などの勉強をしている", trainee: false},
        { name: "誰よりも早く会社に行っている", trainee: false},
        { name: "白湯を飲む", trainee: false},
        { name: "6時台には起きている", trainee: false},
        { name: "平日休日にかかわらず起きる時間はほぼ同じである", trainee: false},
        { name: "朝早く起きて活動開始するとなぜか全能感がある", trainee: false},
        { name: "朝活を1週間以上継続している", trainee: false},
        { name: "朝を制するものは1日を制すると思っている", trainee: false},
        { name: "朝にその日の仕事の予定をたてている", trainee: false}
      ]
    }
  },
  methods: {
    startQuestion() {
      this.currentPage = "question-page";
    },
    showResult() {
      this.currentPage = "result-page";
    },
    shuffle: function() {

    },
    answerYes() {
      this.asakatsuPoint += 1;
      this.questionCount += 1;
      if (this.questionCount == 10) {
        this.currentPage = "result-page"
      }
    },
    answerNo() {
      this.questionCount += 1;
      if (this.questionCount == 10) {
        this.currentPage = "result-page"
      }
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
  margin: auto
}

.top-page {
  background-color: #ffffff;
  margin: 60px;
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
  font-size: 20px;
}

.question-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.question-area {
  width: 50%;
}

.question-button {
  margin: 50px 20px;
}

.question-text {
  font-size: 30px;
}

.question-image {
  width: 50%;
}
</style>
