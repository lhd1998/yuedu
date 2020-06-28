<template>
  <div class="else">
    <p class="top-title demonstration">
      其他相关节目
      <img class="arrow right" src="../assets/arrow-right.png" @click="goRight" alt />
      <img class="arrow" src="../assets/arrow-left.png" @click="goLeft" alt />
    </p>
    <div class="tab" style="left: 0" ref="tab">
      <div class="list" v-for="(list,index) in lists" :key="index">
        <span v-for="(item, index) in list" :key="index" @click="send(item.id)">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  display: flex;

  transition: left 0.3s;
  position: relative;
  .list {
    padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    width: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    span {
      cursor: pointer;
      width: 48%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      padding: 20px 0;
      color: #999;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  watch: {
    $route: {
      handler() {
        this.axios
          .get("http://localhost:3000/api/articles/rand")
          .then(({ data }) => {
            function group(arr, num) {
              let index = 0;
              let newArr = [];
              
              while (index < arr.length) {
                newArr.push(arr.slice(index, (index += num)));
              }
              return newArr;
            }
            this.lists = group(data.res, 4);
          });
      },
      immediate: true
    }
  },
  methods: {
    goLeft() {
      var tab = this.$refs.tab;
      if (parseInt(tab.style.left) < 0) {
        tab.style.left = parseInt(tab.style.left) + 100 + "%";
      }
    },
    goRight() {
      var tab = this.$refs.tab;
      if (parseInt(tab.style.left) > -400) {
        tab.style.left = parseInt(tab.style.left) - 100 + "%";
      }
    },
    send(num) {
      this.router.push("/Details/" + num);
    }
  }
};
</script>