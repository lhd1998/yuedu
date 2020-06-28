<template>
  <div class="login-contanier animated fadeInLeftBig">
    <p class="login-title">登陆</p>
    <div class="form">
      <input ref="email" type="text" placeholder="邮箱" :value="emailVal" />
      <input ref="pwd" type="password" placeholder="密码" :value="pwdVal" />
    </div>
    <div class="check">
      <p>
        <input type="checkbox" id="check" />
        <label for="check">下次自动登陆</label>
      </p>
      <span>忘记密码</span>
    </div>
    <button class="submit" type="submit" @click="sub">登陆</button>
    <p class="close" @click="close">
      <span @click="setCond(false)">
        <img src="../assets/cc-close.png" alt />
      </span>
    </p>
    <div class="err" ref="err">错误</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      emailVal: "",
      pwdVal: ""
    };
  },
  methods: {
    close() {
      this.$emit("close", "login");
    },
    sub() {
      var test = data => {
        this.$refs.err.style.display = "block";
        this.$refs.err.innerHTML = data;
        setTimeout(() => {
          this.$refs.err.style.display = "none";
        }, 1500);
      };
      this.axios
        .post("http://localhost:3000/api/user/login", {
          email: this.$refs.email.value,
          password: this.$refs.pwd.value
        })
        .then(({ data }) => {
          if (data.res_code == 200) {
            localStorage.setItem("userId", data.res.user.id);
            localStorage.setItem("status", "已登录");
            localStorage.setItem("token", data.res.token);
            this.setCond(true);
            var check = document.getElementById("check");
            if (check.checked) {
              localStorage.setItem("email", this.$refs.email.value);
              localStorage.setItem("pwd", this.$refs.pwd.value);
            } else {
              localStorage.removeItem("email");
              localStorage.removeItem("pwd");
            }
            this.$emit("sendVal", data.res.user.nikiname);
            setTimeout(() => {
              this.close();
            }, 200);
          } else {
            test(data.res_msg);
          }
        });
    },
    ...mapMutations(["setCond"])
  },
  created() {
    this.emailVal = localStorage.getItem("email");
    this.pwdVal = localStorage.getItem("pwd");
  }
};
</script>

<style lang="scss" scoped>
.login-contanier {
  position: relative;
  background-color: #fff;
  padding: 20px 50px;
  .login-title {
    font-size: 24px;
    text-align: left;
    padding: 10px 0;
  }
  .form {
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 8px 10px;
    input {
      outline: none;
      border: none;
      padding: 0 5px;
      &[type="text"] {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .check {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
    padding: 10px 0px;
    label {
      margin-left: 5px;
    }
    span,
    label {
      cursor: pointer;
    }
  }
  .submit {
    width: 100%;
    border: none;
    background-color: #fa5741;
    color: #f5f5f5;
    padding: 10px 0;
    margin: 10px 0;
  }
  .close {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -12px;
    right: -12px;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    span {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .err {
    position: absolute;
    top: 50%;
    left: 50%;
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