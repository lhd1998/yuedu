<template>
  <div class="TopList">
    <Author></Author>
    <Else></Else>
    <div class="list-con">
      <p class="top-title">
        {{text}}
        <span v-if="!text">{{txt}}</span>FM频道其他节目
        <span class="more">查看更多</span>
      </p>
      <ul>
        <li class="list" v-for="(list,index) in lists" :key="index" :title="list.id" @click="send(list.id)">
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

<style lang="scss">
.TopList {
  width: 100%;
  margin-left: 5%;
  margin-top: 50px;
  text-align: left;
  .else {
    padding: 20px 0;
    background-color: #fff;
    margin: 20px 0;
    overflow: hidden;
    .top-title {
      margin-left: 20px;
      font-size: 14px;
      padding-left: 10px;
      border-left: 3px solid #fa5741;
      .arrow {
        width: 15px;
        margin-right: 5px;
        float: right;
        cursor: pointer;
      }
      .right {
        margin-right: 40px;
      }
    }
  }
  .list-con {
    background-color: #fff;
    overflow: hidden;
    padding-bottom: 30px;
    .top-title {
      font-size: 14px;
      margin: 20px;
      margin-left: 20px;
      padding-left: 10px;
      border-left: 3px solid #fa5741;
      .more {
        float: right;
        font-size: 12px;
        padding-right: 10px;
        color: #999;
        margin-right: 25px;
        background: url(../assets/arrow-right.png) right center no-repeat;
        background-size: 10px;
        cursor: pointer;
      }
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
}
</style>

<script>
import Else from "../components/Else";
import Author from "../components/Author";
import { mapState } from "vuex";

export default {
  data() {
    return {
      txt: localStorage.getItem("text") ? localStorage.getItem("text") : "悦读",
      lists: [],
      num: 1
    };
  },
  components: {
    Else,
    Author
  },
  computed: {
    ...mapState(["text"])
  },
  watch: {
    $route: {
      handler() {
        this.num = localStorage.getItem("type_id") ? localStorage.getItem("type_id") : 1;
        this.axios
          .get("http://localhost:3000/api/articles/" + this.num + "/rand")
          .then(({ data }) => {
            this.lists = data.res;
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