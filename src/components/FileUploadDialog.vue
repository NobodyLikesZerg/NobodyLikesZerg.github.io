<template>
  <div class="splash">
    <vs-card class="splash__card">
      <h1 class="splash__card-header">Загрузить файлы</h1>
      <file-uploader v-model="file" />

      <vs-row vs-justify="flex-end">
        <vs-button @click="submit" class="splash__card-button" color="primary" type="filled">Отправить</vs-button>
      </vs-row>
    </vs-card>
  </div>
</template>


<script>
import FileUploader from "./FileUploader";

export default {
  components: {
    FileUploader,
  },

  data() {
    return {
      file: null,
    };
  },

  methods: {
    submit() {
      this.$emit('input', this.file);
    },
  },
};
</script>

<style lang="stylus">
.splash {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    &.con-vs-card {
      width: 400px;
      padding: 20px;

      .vs-card--content {
        margin-bottom: 0;
        padding: 0;
      }
    }

    &-header {
      margin-bottom: 20px;
    }

    &-button {
      font-size: 14px;
    }
  }
}
</style>
