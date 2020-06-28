<template>
  <ul class="top-title">
    <li
      :class="{active: type_num==index}"
      v-for="(title,index) in topData"
      :key="index"
      @click="tab(index,title.type);changeText([title.type,index])"
    >{{title.type}}</li>
  </ul>
</template>

<style lang="scss" scoped>
.top-title {
  width: 400px;
  display: flex;
  justify-content: space-between;
  li {
    cursor: pointer;
  }
  .active {
    color: #fa5741;
  }
}
</style>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      topData: null,
      type_num:
        parseInt(this.$route.params.type_id) - 1
          ? parseInt(this.$route.params.type_id) - 1
          : 0,
        page: 1
    };
  },
  name: "TopTitle",
  created() {
    this.axios.get("http://localhost:3000/api/types").then(({ data }) => {
      this.topData = data.res;
    });
  },
  methods: {
    ...mapMutations(["changeText"]),
    tab(num, type) {
      localStorage.setItem("text", type);
      localStorage.setItem('type_id', parseInt(num) + 1);
      this.type_num = num;
      this.page = localStorage.getItem("page")?localStorage.getItem("page"):1
      this.router.push("/type/" + (parseInt(num) + 1) + "/page/"+this.page);
    }
  }
};
</script>