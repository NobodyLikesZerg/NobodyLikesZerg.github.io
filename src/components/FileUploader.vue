<template>
  <div>
    <input class="file-input" ref="fileInput" type="file">
  </div>
</template>


<script>
import * as FilePond from "filepond";
import 'filepond/dist/filepond.min.css';

export default {
  data() {
    return {
      pond: null
    };
  },
  mounted() {
    this.pond = FilePond.create(this.$refs.fileInput);

    this.pond.onaddfile = this.onFileUpload;
  },

  methods: {
    onFileUpload(fileWrapper) {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader();

        reader.onload = () => this.$emit('input', reader.result);
        reader.readAsText(fileWrapper.file);
      } else {
        alert("The File APIs are not fully supported in this browser.");
      }
    }
  }
};
</script>
