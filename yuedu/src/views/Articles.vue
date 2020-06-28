<template>
  <div class="articles">
    <ul>
      <li v-for="(article,index) in articles" :key="index" :title="article.id" @click="send(article.id)">
        <div class="art-left">
          <img src="../assets/jin.png" alt />
        </div>
        <div class="art-right">
          <div class="art-title">{{article.title}}</div>
          <div class="art-tag">
            <p>
              <img src="../assets/pencil.png" alt />
              <span>{{article.author}}</span>
            </p>
            <p>
              <img src="../assets/voice.png" alt />
              <span>{{article.podcast}}</span>
            </p>
            <p>
              <img src="../assets/time.png" alt />
              <span>{{article.created_time}}</span>
            </p>
            <p>
              <img src="../assets/headset.png" alt />
              <span>{{article.play_time}}</span>
            </p>
          </div>
          <div class="art-text">
            <p>{{article.content}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="120"
        @current-change="getNum"
        @prev-click="prev"
        @next-click="next"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type_id: null,
      page: 1,
      articles: null
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.$data.articles = [];
        this.$data.type_id = to.params.type_id ? to.params.type_id : 1;
        this.$data.page = to.params.page ? to.params.page : 1;
        this.axios
          .get(
            "http://localhost:3000/api/articles/" +
              this.$data.type_id +
              "/page/" +
              this.$data.page
          )
          .then(({ data }) => {
            this.$data.articles = data.res.articles;
          });
      },
      immediate: true
    }
  },
  methods: {
    getNum(val) {
      localStorage.setItem("page", val);
      this.router.push("/type/"+this.type_id+"/page/"+val)
    },
    prev() {
        this.page-=1
    },
    next() {
        this.page+=1
        
    },
    send(num){
      this.router.push("/Details/"+num)
    }
  }
};
</script>

<style lang="scss" scoped>
.articles {
  width: 100%;
  li {
    background-color: #fff;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .art-left {
      width: 30%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .art-right {
      width: 70%;
      text-align: left;
      padding: 20px 15px;
      .art-title {
        font-size: 18px;
        padding: 5px 0 10px;
      }
      .art-tag {
        font-size: 12px;
        color: #999;
        p {
          display: inline-block;
          margin-right: 20px;
          img {
            width: 12px;
            margin-right: 5px;
          }
          span,
          img {
            vertical-align: middle;
          }
        }
      }
      .art-text {
        padding: 20px 0 15px;
        width: 90%;
        p {
          font-size: 14px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
  .block {
    margin: 50px 0;
  }
}
</style>