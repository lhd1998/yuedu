<template>
  <div class="author">
    <div class="top">
      <img class="default" src="../assets/default.png" alt />
      <div class="author-intro">
        <p class="name">
          {{list.author}}
          <img src="../assets/voice.png" />
        </p>
        <div class="more">
          <p>
            <span>作品：7</span>
            <br />
            <span>粉丝：95</span>
          </p>
          <p class="red">关注</p>
        </div>
      </div>
    </div>
    <div class="author-like">
      <div class="round" @click="addLike(list)">
        <img ref="good" :src="goodImg" alt />
      </div>
      {{list.like_count}}
      <div class="round">
        <img src="../assets/like.png" alt />
      </div>
      {{list.collection_count}}
      <div class="round">
        <img src="../assets/enjoy.png" alt />
      </div>
    </div>
    <div class="err" ref="err">错误</div>
  </div>
</template>

<style lang="scss" scoped>
.author {
  margin: 10px 0;
  background-color: #fff;
  .top {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #f5f5f5;
    .default {
      width: 30%;
    }
    .author-intro {
      width: 65%;
      margin-left: 10px;
      margin-top: 5px;
      .name {
        font-size: 16px;
        img {
          width: 14px;
        }
      }
      .more {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .red {
          margin-right: 10px;
          background-color: red;
          color: #fff;
          padding: 5px 8px;
        }
      }
    }
  }
  .author-like {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 40px;
    .round {
      width: 50px;
      height: 50px;
      border: 1px solid #999999;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60%;
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
import good from '../assets/good.png'
import good_red from '../assets/good-red.png'
export default {
  data() {
    return {
      list: [],
      like_count: 0,
      goodImg: good
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.list = [];
        this.axios
          .get("http://localhost:3000/api/article/" + to.params.id)
          .then(({ data }) => {
            this.list = data.res;
          });
      },
      immediate: true
    },
    like_count() {
      this.axios
        .get("http://localhost:3000/api/article/" + this.list.id)
        .then(({ data }) => {
          this.list = data.res;
        });
    }
  },
  methods: {
    addLike(list) {
      var test = data => {
        this.$refs.err.style.display = "block";
        this.$refs.err.innerHTML = data;
        setTimeout(() => {
          this.$refs.err.style.display = "none";
        }, 1500);
      };
      var status = localStorage.getItem("status");
      var token = localStorage.getItem("token");
      if (status) {
        if (this.like_count == 0) {
          this.axios
            .post(
              "http://localhost:3000/api/article/" + list.id + "/like",
              {},
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            .then(() => {
              this.like_count = 1;
              this.goodImg=good_red
            });
        } else {
          this.axios
            .delete("http://localhost:3000/api/article/" + list.id + "/like", {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
              this.like_count = 0;
              this.goodImg=good
            });
        }
      }else{
        test("请登录后点赞")
      }
    }
  }
};
</script>