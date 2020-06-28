<template>
  <div class="comments">
    <div class="add">
      <textarea name id="comments" placeholder="说点什么吧...."></textarea>
      <button @click="add">
        <span @click="setCond(true)">评论</span>
      </button>
    </div>
    <div class="comment-content">
      <div class="top">最新评论({{sum}})</div>
      <div class="comment-lists">
        <p v-if="!lists" style="text-align:center;padding: 10px 0;color:#999;">暂无评论</p>
        <ul>
          <li v-for="(list,index) in lists" :key="index">
            <div class="left">
              <img src="../assets/userImg.jpg" alt />
            </div>
            <div class="right">
              <p class="nikiname">{{list.nikiname}}</p>
              <p class="comment" ref="comment">{{list.content}}</p>
              <button class="btn" @click="del(list.id,list.user_id)">删除评论</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="err" ref="err">错误</div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  .add {
    display: flex;
    justify-content: center;
    textarea {
      resize: none;
      width: 90%;
      height: 20px;
      border: none;
      outline: none;
      padding: 20px;
      color: #999;
    }
    button {
      height: 60px;
      width: 10%;
      border: none;
      background-color: #fa5741;
      outline: none;
      color: #fff;
      span {
        display: block;
        height: 100%;
        line-height: 60px;
      }
    }
  }
  .comment-content {
    margin: 10px 0;
    text-align: left;
    .top {
      display: inline-block;
      background-color: #fff;
      color: #fa5741;
      padding: 10px;
      font-size: 14px;
    }
    .comment-lists {
      background-color: #fff;
      padding: 20px 30px;
      li {
        padding: 15px 0;
        border-bottom: 1px dashed #ccc;
        font-size: 12px;
        display: flex;
        align-items: center;
        .left {
          flex: 1 0 auto;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid #ccc;
          overflow: hidden;
          margin: 0 10px;
          img {
            width: 100%;
          }
        }
        .right {
          width: 90%;
          position: relative;
          .nikiname {
            font-size: 16px;
            color: #222;
            padding: 5px 0;
          }
          .comment {
            word-break: break-all;
            white-space: normal !important;
            width: 82%;
            font-size: 12px;
            color: #666;
            margin: 5px 0;
          }
          .btn {
            border: none;
            font-size: 12px;
            color: #fff;
            background-color: #fa5741;
            padding: 5px;
            border-radius: 3px;
            position: absolute;
            right: 10px;
            top: 50%;
          }
        }
      }
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
window.onload = () => {
  localStorage.removeItem("status");
  localStorage.removeItem("userId");
};
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      lists: [],
      page: 1,
      sum: 0,
      statusNum: "",
      commentId: 0
    };
  },
  watch: {
    $route: {
      handler() {
        this.list = [];
        this.axios
          .get(
            "http://localhost:3000/api/comments/" +
              this.$route.params.id +
              "/page/" +
              this.page
          )
          .then(({ data }) => {
            if (data.res_code == 200) {
              this.lists = data.res;
              this.sum = data.res.length;
            } else {
              this.sum = 0;
            }
          });
      },
      immediate: true
    },
    statusNum() {
      this.list = [];
      this.axios
        .get(
          "http://localhost:3000/api/comments/" +
            this.$route.params.id +
            "/page/" +
            this.page
        )
        .then(({ data }) => {
          if (data.res_code == 200) {
            this.lists = data.res;
            this.sum = data.res.length;
          } else {
            this.lists = [];
            this.sum = 0;
          }
        });
    }
  },
  methods: {
    add() {
      var status = localStorage.getItem("status");
      var test = data => {
        this.$refs.err.style.display = "block";
        this.$refs.err.innerHTML = data;
        setTimeout(() => {
          this.$refs.err.style.display = "none";
        }, 1500);
      };
      var comments = document.getElementById("comments");
      if (status) {
        var token = localStorage.getItem("token");
        if (comments.value.trim()) {
          this.axios
            .post(
              "http://localhost:3000/api/comment",
              {
                article_id: parseInt(localStorage.getItem("article_id")),
                content: comments.value
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            .then(() => {
              this.statusNum += 1;
            });
          comments.value = "";
        } else {
          comments.value = "";
          test("不能输入空内容");
        }
      } else {
        comments.value = "";
        test("登陆后才可评论");
      }
    },
    del(num, user_id) {
      var status = localStorage.getItem("status");
      var token = localStorage.getItem("token");
      var userId = localStorage.getItem("userId");
      var test = data => {
        this.$refs.err.style.display = "block";
        this.$refs.err.innerHTML = data;
        setTimeout(() => {
          this.$refs.err.style.display = "none";
        }, 1500);
      };
      if (status) {
        if (userId == user_id) {
          this.axios
            .delete("http://localhost:3000/api/comment/" + num, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
              this.statusNum += 1;
            });
        }else{
          test("无法删除其他用户的评论");
        }
      } else {
        test("登陆后才可删除评论");
        this.setCond(true);
      }
    },
    ...mapMutations(["setCond"])
  }
};
</script>