<template>
  <div class="reg-contanier animated fadeInLeftBig">
    <p class="reg-title">注册</p>
    <div class="form">
      <input type="text" ref="username" placeholder="用户名" />
      <input type="text" ref="nikiname" placeholder="昵称" />
      <input type="text" ref="email" placeholder="邮箱" />
      <input class="pwd" ref="pwd" type="password" placeholder="密码" />
      <input type="password" ref="pwd1" placeholder="确认密码" />
    </div>
    <div class="check">
      <p>
        <input type="checkbox" id="check" />
        <label for="check">
          我已认真阅读并同意悦读FM的《
          <span class="red">使用协议</span> 》
        </label>
      </p>
    </div>
    <button class="submit" type="submit" @click="sub">注册</button>
    <span class="close" @click="close">
      <img src="../assets/cc-close.png" alt />
    </span>
    <div class="err" ref="err">错误</div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close", "regist");
    },
    sub() {
      var test = data => {
        this.$refs.err.style.display = "block";
        this.$refs.err.innerHTML = data;
        setTimeout(() => {
          this.$refs.err.style.display = "none";
        }, 2000);
      };
      var emailPatt = /^[a-zA-Z]{0,1}[0-9A-Za-z]{6,15}[@](163|126|qq)\b.com\b$/;
      var pwdPatt = /^[\S]{6,}$/;

      if (this.$refs.username.value.length >= 3) {
        if (this.$refs.nikiname.value >= 3) {
          if (emailPatt.test(this.$refs.email.value)) {
            if (pwdPatt.test(this.$refs.pwd.value)) {
              if (this.$refs.pwd.value == this.$refs.pwd1.value) {
                var check = document.getElementById("check");
                if (check.checked) {
                  this.axios
                    .post("http://localhost:3000/api/user", {
                      email: this.$refs.email.value,
                      password: this.$refs.pwd.value,
                      username: this.$refs.username.value,
                      nikiname: this.$refs.nikiname.value
                    })
                    .then(({ data }) => {
                      if (data.res_code == 200) {
                        setTimeout(() => {
                          this.close();
                        }, 200);
                      } else {
                        test(data.res_msg);
                      }
                    });
                }else{
                    test("请勾选同意使用协议")
                }
              } else {
                test("两次输入密码不一致");
              }
            } else {
              test("密码格式错误，密码不包含空格，至少6位");
            }
          } else {
            test("邮箱格式错误，正确格式为123456@qq.com或其他邮箱");
          }
        } else {
          test("昵称最少3位");
        }
      } else {
        test("用户名最少3位");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.reg-contanier {
  position: relative;
  background-color: #fff;
  padding: 20px 50px;
  .reg-title {
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
      padding-top: 5px;
      &[type="text"],
      &.pwd {
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
    .red {
      color: #fa5741;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
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