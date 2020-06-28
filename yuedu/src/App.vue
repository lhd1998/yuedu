<template>
  <div id="app">
    <div class="content">
      <div id="nav" class="wrap">
        <div class="icon">
          <div class="logo">
            <img src="./assets/fm.svg" alt />
          </div>
          <div class="title">悦读FM</div>
        </div>
        <div class="top">
          <topTitle></topTitle>
        </div>
        <div class="right">
          <input type="text" />
          <div class="user">
            <div class="notLogin" v-if="!userName">
              <span @click="changeLogin">登录</span>
              <span @click="changeRegist">注册</span>
            </div>
            <div class="userLogin" v-else style="font-size:14px;">
              Hi,你好
              <span style="color:#fa5741">{{userName}}</span>
              <div class="exit" @click="exit"><span @click="setCond(false)">退出</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap con-list">
      <div class="left">
        <router-view name="Articles"></router-view>
        <router-view name="Details"></router-view>
      </div>
      <div class="right">
        <router-view name="TopList"></router-view>
        <router-view name="DetailsRight"></router-view>
      </div>
    </div>
    <div class="footer wrap">
      <div class="left">
        <p class="top">
          <span>关于我们</span>
          |
          <span>加入我们</span>
        </p>
        <p>©2010-2016 Yuedu.fm All rights reserved粤ICP备14076392号</p>
      </div>
      <div class="right">
        <div class="font">捐</div>
        <div class="icon">
          <img src="./assets/wechat.png" alt />
        </div>
        <div class="icon">
          <img src="./assets/weibo.png" alt />
        </div>
      </div>
    </div>
    <div class="login" v-if="login">
      <Login @close="close" @sendVal="getData"></Login>
    </div>
    <div class="regist" v-if="regist">
      <Regist @close="close"></Regist>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import topTitle from "./components/TopTitle";
import Login from "./components/Login";
import Regist from "./components/Regist";
export default {
  data() {
    return {
      login: this.cond,
      regist: false,
      userName: "",
      stutas: localStorage.getItem("status")
    };
  },
  components: {
    topTitle,
    Regist,
    Login
  },
  methods: {
    close(data) {
      if (data == "login") {
        document
          .getElementsByClassName("login-contanier")[0]
          .classList.add("fadeOutRightBig");
        setTimeout(() => {
          this.login = false;
        }, 400);
      } else {
        document
          .getElementsByClassName("reg-contanier")[0]
          .classList.add("fadeOutRightBig");
        setTimeout(() => {
          this.regist = false;
        }, 400);
      }
    },
    getData(data) {
      this.userName = data;
    },
    changeLogin() {
      this.login = true;
    },
    changeRegist() {
      this.regist = true;
    },
    exit() {
      this.userName = "";
      localStorage.removeItem("status");
      localStorage.removeItem("userId");
    },
    ...mapMutations(['setCond'])
  },
  computed: {
    ...mapState(["cond"])
  },
  watch: {
    cond() {
      if (this.cond) {
        this.changeLogin();
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.wrap {
  width: 1100px;
  margin: 0 auto;
}
#app {
  background-color: #f8f8f8;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
li {
  list-style: none;
}
.content {
  background-color: #fff;
}
#nav {
  height: 30px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  .icon {
    display: flex;
    .logo {
      width: 22px;
      overflow: hidden;
      margin-right: 2px;
      img {
        width: 30px;
        margin-left: -4px;
      }
    }
    .title {
      line-height: 30px;
    }
  }
  .top {
    line-height: 30px;
  }
  .right {
    width: 320px;
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    input {
      margin-top: 2.5px;
      height: 22px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
      background: url(./assets/search.png) 97% center no-repeat;
      background-size: 8%;
    }
    .user {
      border-left: 1px dashed #ccc;
      .notLogin {
        padding: 0 10px;
        padding-left: 20px;
      }
      span {
        cursor: pointer;
        color: #222;
        text-decoration: none;
        &:hover {
          color: #fa5741;
        }
        &:last-of-type {
          margin-left: 20px;
        }
      }
      .userLogin {
        padding-left: 20px;
        position: relative;
        &:hover .exit {
          display: block;
        }
        span {
          margin: 0;
        }
        .exit {
          display: none;
          cursor: pointer;
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          background-color: #fff;
          font-size: 14px;
          padding: 5px 10px;
          white-space: nowrap;
          box-shadow: 0 0 10px -5px #999;
          span{
            display: block;
            width: 100%;
            height: 100%;
          }
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 35%;
            width: 10px;
            height: 10px;
            transform: rotate(45deg) translateY(-40%);
            background-color: #fff;
          }
        }
      }
    }
  }
}
.con-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .left {
    width: 65%;
  }
  .right {
    width: 30%;
  }
}
.footer {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #ccc;
  text-align: left;
  .left {
    .top {
      color: #666;
    }
  }
  .right {
    width: 150px;
    display: flex;
    justify-content: space-between;
    div {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #666666;
      background-color: #ccc;
      border-radius: 50%;
      img {
        width: 70%;
        margin: 15%;
      }
    }
  }
}
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(75, 73, 73, 0.4);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.regist {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(75, 73, 73, 0.4);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
