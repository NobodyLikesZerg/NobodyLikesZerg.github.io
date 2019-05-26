import { Scatter, Line, mixins } from 'vue-chartjs';
import { isEqual } from 'lodash/fp';

export default {
  extends: Line,
  props: ['chartData', 'options', 'datasets'],
  mounted() {
    const { datasets } = this;

    this.renderChart({ datasets }, this.options);
  },

  watch: {
    datasets(value) {
      const newDatasets = value;
      const oldDatasets = this.$data._chart.config.data.datasets;
      const isNumberOfSetsChanged = oldDatasets.length !== newDatasets.length;

      const length = oldDatasets.length > newDatasets.length
        ? oldDatasets.length
        : newDatasets.length;


      new Array(length).fill(1).forEach((_, index) => {
        const newItem = newDatasets[index];
        const oldItem = oldDatasets[index];

        if (newItem == null) {
          this.$data._chart.config.data.datasets.splice(index, 1, { data: [] });
        } else if (!isEqual(newItem, oldItem)) {
          this.$data._chart.config.data.datasets[index] = newItem;
        }
      });

      if (isNumberOfSetsChanged) {
        this.$data._chart.update({ duration: 0 });
      } else {
        this.$data._chart.update({ lazy: true });
      }
    }
  }
};
