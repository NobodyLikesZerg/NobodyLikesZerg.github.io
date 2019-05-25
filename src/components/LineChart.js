import { Scatter, Line, mixins } from 'vue-chartjs';


export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    console.log(this.options);
    this.renderChart(this.chartData, this.options);
  }
};
