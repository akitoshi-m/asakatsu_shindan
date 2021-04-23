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
          <div v-for="(question, index) in shuffleQuestionLists" :key="question.id" class="question-text">
            <div v-if="questionCount === index">
              <p>Q{{ index + 1 }}. {{ question.name }}</p>
            </div>
          </div>
          <button @click="answerYes" class="button is-primary function-button">YES</button>
          <button @click="answerNo" class="button is-danger function-button">NO</button>
        </div>
        <div class="question-image">
          <img v-bind:src="imgSrc" alt="質問ページの画像" width="500px" height="500px" />
        </div>
      </div>
    </div>
    <!-- 結果表示ページ -->
    <div v-if="currentPage === 'result-page'">
      <div class="result-page">
        <div class="resut-area">
          <div class="result-is">あなたは...</div>
          <div class="result-text">
            「{{ this.resultStatus }}」です！
          </div>
          <div class="one-point">
            <p class="one-point-title">〜ワンポイントメッセージ〜</p>
            <p class="one-point-message">
              {{ this.shuffleOnePoints[0].text }}
            </p>
          </div>
          <button @click="twitterShare" class="button is-link function-button">結果をつぶやいてみよう！</button>
          <button @click="retryCheck" class="button is-primary function-button">もう一度診断する</button>
        </div>
        <div class="result-image">
        <img src="./assets/result.svg" alt="結果表示ページの画像" width="400px" height="400px" />
        </div>
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
      resultStatus: "",
      questionLists: [
        { name: "朝起きたらプロテインを飲む", trainee: true },
        { name: "筋トレの習慣がある", trainee: true},
        { name: "読書の習慣がある", trainee: false},
        { name: "資格などの勉強に取り組んでいる", trainee: false},
        { name: "誰よりも早く会社に行っている", trainee: false},
        { name: "起床後は白湯を飲む", trainee: false},
        { name: "6時台には起きている", trainee: false},
        { name: "平日休日にかかわらず起きる時間はほぼ同じである", trainee: false},
        { name: "朝早く起きて活動開始すると1日の調子が良い", trainee: false},
        { name: "朝活を1週間以上継続している", trainee: false},
        { name: "朝に仕事や行動の予定をたてている", trainee: false},
        { name: "朝活をする仲間がいる", trainee: false}
      ],
      imageNumbers: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"
      ],
      onePoints: [
        { text: "仲間がいると朝活がより楽しくなります"},
        { text: "起床時刻を決めると起きやすくなります" },
        { text: "twitterで#朝活を検索して仲間を見つけてみよう" },
        { text: "朝にやりたいことを持ってくると継続しやすいです" },
        { text: "朝の散歩は健康にもメンタルにも良い効果があります" },
        { text: "朝1時間を1ヶ月続けるだけでも30時間自由な時間が生まれます" }
      ],
      shuffleImageNumbers: [],
      shuffleQuestionLists: [],
      shuffleOnePoints: []
    }
  },
  computed: {
    imgSrc () {
      return require("./assets/question_" + this.shuffleImageNumbers[this.questionCount] + ".svg")
    }
  },
  mounted: function() {
    this.shuffleImageNumbers = this.shuffle(this.imageNumbers);
    this.shuffleQuestionLists = this.shuffle(this.questionLists);
    this.shuffleOnePoints = this.shuffle(this.onePoints);
  },
  methods: {
    shuffle: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1))
        let tmp = array[i]
        array[i] = array[r]
        array[r] = tmp
      }
      return array
    },
    startQuestion() {
      this.currentPage = "question-page";
    },
    showResult() {
      this.currentPage = "result-page";
    },
    retryCheck() {
      this.asakatsuPoint = 0;
      this.questionCount = 0;
      this.resultStatus = "";
      this.currentPage = "top-page";
    },
    answerYes() {
      this.asakatsuPoint += 1;
      this.questionCount += 1;
      if (this.questionCount === 10) {
        if (this.asakatsuPoint >= 9) {
          this.resultStatus = "朝活マスター";
        } else if (this.asakatsuPoint >= 7) {
          this.resultStatus = "朝活プロ";
        } else if (this.asakatsuPoint >= 5) {
          this.resultStatus = "朝活アマ";
        } else if (this.asakatsuPoint >= 3) {
          this.resultStatus = "朝活初心者";
        } else if (this.asakatsuPoint >= 0) {
          this.resultStatus = "朝活見習い";
        }
        this.currentPage = "result-page"
      }
    },
    answerNo() {
      this.questionCount += 1;
      if (this.questionCount == 10) {
        this.currentPage = "result-page"
      }
    },
    twitterShare(){
      //シェアする画面を設定
      var shareURL = 'https://twitter.com/intent/tweet?text=' + "朝活診断の結果は「" + this.resultStatus + "」でした。今日も最高の1日にしよう！" + '&hashtags=' + "asakatsu_shindan" + '&hashtags=' + "朝活";
      //シェア用の画面へ移行
      location.href = shareURL
    }
  },
  created () {
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

/* トップページ */
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

/* 質問ページ */
.question-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.question-area {
  width: 40%;
}

.function-button {
  margin: 50px 20px;
}

.question-text {
  font-size: 30px;
}

.question-image {
  width: 50%;
}

/* 結果表示ページ */
.result-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-area {
  width: 40%;
}

.result-is {
  text-align: left;
  font-size: 22px;
}

.result-text {
  font-size: 50px;
}

.one-point {
  margin-top: 50px;
}

.one-point-title {
  font-size: 20px;
}

.one-point-message {
  font-size: 22px;
}

.result-image {
  width: 40%;
  margin-left: 70px;
}

</style>
