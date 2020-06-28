<template>
  <div class="details-con">
    <div class="con-top">
      <div class="con-title">{{list.title}}</div>
      <div class="con-tag">
        <p class="left">
          <span class="pen">{{list.author}}</span>
          <span class="voice">{{list.podcast}}</span>
          <span class="all-time">{{list.duration}}</span>
        </p>
        <p class="right">
          播放
          <span class="look-time">{{list.play_time}}</span>
          次
        </p>
      </div>
      <div class="audio">
        <audio controls>
          <source :src="list.mp3_url" />
        </audio>
      </div>
    </div>
    <div class="con-content">
      <p class="details" ref="details">{{list.content}}</p>
      <p class="open" @click="openText">
        {{text}}
        <img ref="arrow" src="../assets/arrow-down.png" alt />
      </p>
    </div>
    <div class="tag-label">
      <p>
        <b>标签：</b>
        {{list.labels}}
      </p>
      <p>
        <img src="../assets/weibo-red.png" alt />
        <img src="../assets/wechat-red.png" alt />
      </p>
    </div>
    <div class="paging">
      <div @click="prev(list.id)">
        <img src="../assets/arrow-left.png" />上一篇
      </div>
      <div @click="next(list.id)">
        下一篇
        <img src="../assets/arrow-right.png" />
      </div>
    </div>
    <Comment></Comment>
    <div class="err" ref="err">错误</div>
  </div>
</template>

<style lang="scss" scoped>
.details-con {
  margin-top: 40px;
  .con-top {
    padding: 20px;
    text-align: left;
    background-color: #fff;
    .con-title {
      font-size: 24px;
    }
    .con-tag {
      display: flex;
      justify-content: space-between;
      color: #ccc;
      .left {
        span {
          margin-right: 20px;
          padding-left: 15px;
          background-position: 0 center;
          background-repeat: no-repeat;
          background-size: 12px;
          font-size: 12px;
        }
        .pen {
          background-image: url(../assets/pencil.png);
        }
        .voice {
          background-image: url(../assets/voice.png);
        }
        .all-time {
          background-image: url(../assets/time.png);
        }
      }
      .right {
        width: 15%;
        font-size: 12px;
        .look-time {
          font-size: 18px;
        }
      }
    }
    .audio {
      margin-top: 40px;
      audio {
        width: 95%;
      }
    }
  }
  .con-content {
    margin-top: 30px;
    padding: 30px;
    background-color: #fff;
    font-size: 14px;
    line-height: 24px;
    text-align: left;
    padding-bottom: 40px;
    color: #666;
    .details {
      text-indent: 2em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 12;
      margin-bottom: 15px;
    }
    .open {
      font-size: 12px;
      float: right;
      cursor: pointer;
      img {
        width: 15px;
        transform: translateY(3px);
      }
    }
  }
  .tag-label {
    margin: 10px 0;
    padding: 5px 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    color: #222;
    font-size: 14px;
    img {
      width: 20px;
      margin-left: 5px;
    }
  }
  .paging {
    padding: 0 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    div {
      cursor: pointer;
      font-size: 14px;
    }
    img {
      width: 20px;
      transform: translateY(5px);
    }
  }
  .err {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    padding: 15px 10px;
    background-color: rgba(22, 22, 22, 0.7);
    color: #f8f8f8;
    border-radius: 3px;
    display: none;
    font-size: 14px;
  }
}
</style>

<script>
import Comment from "../components/Comment";
export default {
  data() {
    return {
      list: [],
      text: "展开全文",
      way: null
    };
  },
  components: {
    Comment
  },
  watch: {
    $route: {
      handler(to) {
        this.list = [];
        this.axios
          .get("http://localhost:3000/api/article/" + to.params.id)
          .then(({ data }) => {
            if (data.res_code == 200) {
              this.list = data.res;
              localStorage.setItem("article_id", to.params.id);
            } else {
                this.$refs.err.style.display = "block";
                this.$refs.err.innerHTML = "获取文章失败或没有文章，正在返回...";
                setTimeout(() => {
                  this.$refs.err.style.display = "none";
                  window.history.back()
                }, 1500);
            }
          });
      },
      immediate: true
    }
  },
  methods: {
    openText() {
      if (this.text == "展开全文") {
        this.$refs.details.style = "-webkit-line-clamp: 1000;";
        (this.text = "收起全文"),
          (this.$refs.arrow.style = "transform: rotate(180deg)");
      } else {
        this.$refs.details.style = "-webkit-line-clamp: 12;";
        (this.text = "展开全文"),
          (this.$refs.arrow.style = "transform: rotate(0deg)");
      }
    },
    prev(num) {
      this.way = true;
      this.router.push("/Details/" + (parseInt(num) - 1));
    },
    next(num) {
      this.way = false;
      this.router.push("/Details/" + (parseInt(num) + 1));
    }
  }
};
</script>