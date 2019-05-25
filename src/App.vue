<template>
  <div
    class="app-container"
    :class="data != null ? 'app-container--sidebar-opened' : 'app-container--sidebar-closed'"
  >
    <side-bar :value="data != null">
      <chart-container :data="data"/>
      <chart-container/>
      <chart-container/>
      <chart-container/>
    </side-bar>
    <div class="container">
      <file-uploader @input="fileContent = $event"/>
      <graph @input="data = $event" :data="fileContent"/>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import FileUploader from "./components/FileUploader";
import ChartContainer from "./components/ChartContainer";

export default {
  name: "app",
  data() {
    return {
      fileContent: null,
      data: null
    };
  },
  components: {
    Graph,
    FileUploader,
    SideBar,
    ChartContainer
  }
};
</script>

<style lang="stylus">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  &--sidebar-opened {
    width: calc(100% - 400px);
  }

  &--sidebar-closed {
    width: 100%;
  }

  height: 100%;
}

.container {
  height: 100%;
}

html,
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
