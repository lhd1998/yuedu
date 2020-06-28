<template>
  <div class="TopList">
    <div class="list-con">
      <p class="top-title">
        {{text}}
        <span v-if="!text">{{txt}}</span>频道Top10
      </p>
      <ul>
        <li
          class="list"
          v-for="(list,index) in lists"
          :key="index"
          :title="list.id"
          @click="send(list.id)"
        >
          <div class="title">{{list.title}}</div>
          <div class="author">
            <span>文：{{list.author}}</span>
            <span>主播：{{list.podcast}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      txt: localStorage.getItem("text") ? localStorage.getItem("text") : "悦读",
      lists: [],
      num:  1
    };
  },
  computed: {
    ...mapState(["text"])
  },
  watch: {
    $route: {
      handler() {
        this.num = localStorage.getItem("type_id")? localStorage.getItem("type_id") : 1;
        this.axios
          .get("http://localhost:3000/api/articles/" + this.num + "/top10")
          .then(({ data }) => {
            this.lists = data.res.articles;
          });
      },
      immediate: true
    }
  },
  methods: {
    send(num) {
      this.router.push("/Details/" + num);
    }
  }
};
</script>

<style lang="scss" scoped>
.TopList {
  width: 100%;
  margin-left: 5%;
  margin-top: 50px;
  text-align: left;
  .list-con {
    background-color: #fff;
    overflow: hidden;
    padding-bottom: 30px;
  }
  .top-title {
    font-size: 18px;
    margin: 20px;
    margin-left: 20px;
    padding-left: 10px;
    border-left: 3px solid #fa5741;
  }
  ul {
    padding: 0 40px;
    .list {
      cursor: pointer;
      padding: 10px 0;
      border-bottom: 1px dashed #ccc;
      .title {
        font-size: 14px;
        line-height: 24px;
      }
      .author {
        font-size: 12px;
        color: #999;
        span {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>