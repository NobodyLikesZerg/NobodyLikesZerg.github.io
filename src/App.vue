<template>
  <div class="app-container">
    <side-bar>
      <chart-container />
    </side-bar>
    <div class="container">
      <file-uploader @input="fileContent = $event" />
      <graph :data="fileContent" />
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar';
import Graph from "./components/Graph";
import FileUploader from './components/FileUploader';
import ChartContainer from './components/ChartContainer';

export default {
  name: "app",
  data() {
    return {
      fileContent: null,
    };
  },
  components: {
    Graph,
    FileUploader,
    SideBar,
    ChartContainer,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  height: 100%;
}

.container {
  width: calc(100% - 400px);
  height: 100%;
}

html,
body {
  /* overflow: hidden; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
