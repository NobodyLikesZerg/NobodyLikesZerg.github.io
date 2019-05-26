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
      <file-upload-dialog v-if="fileContent == null" @input="fileContent = $event"/>

      <graph @input="data = $event" :data="fileContent"/>
      <template v-if="fileContent != null">
        <vs-button
          @click="fileContent = null; data = null"
          class="app-container__reset-button"
          type="gradient"
        >Загрузить новый файл</vs-button>
      </template>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import ChartContainer from "./components/ChartContainer";
import FileUploadDialog from "./components/FileUploadDialog";

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
    SideBar,
    ChartContainer,
    FileUploadDialog,
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  &--sidebar-opened {
    width: calc(100% - 600px);
    transition: width ease .4s;
  }

  &--sidebar-closed {
    width: 100%;
  }

  height: 100%;

  &__reset-button.vs-button {
    font-size: 14px;
    position: absolute;
    bottom: 24px;
    left: 24px;

    &:hover {
      box-shadow: 0 8px 25px -8px #111;
    }
  }
}

.container {
  height: 100%;
}

html, body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
