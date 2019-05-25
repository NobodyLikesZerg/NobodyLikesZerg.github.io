<template>
  <div class="chart-container">
    <vs-divider class="chart-container__header">Давление</vs-divider>
    <div class="chart-container__container">
      <line-chart :options="options" :chart-data="chartData"></line-chart>
    </div>
    <div class="chart-container__chips">
      <vs-switch
        @input="switchType($event)"
        :value="isN"
        style="margin-bottom: 24px;"
        class="chart-container__switch"
      >
        <span slot="on">n</span>
        <span slot="off">t</span>
      </vs-switch>
      <vs-button
        style="margin-bottom: 16px;"
        :disabled="pinnedXs.length === maxPinnedXs"
        @click="pinSliderValue"
        color="primary"
        type="filled"
      >Закрепить график</vs-button>
      <vs-chip
        style="margin-bottom: 8px;"
        v-for="(x, index) in pinnedXs"
        :key="index"
        closable
        :color="colors[index]"
        close-icon="close"
        @click="removeDataset(index)"
      >{{ isN ? "n" : "t" }} = {{ x }}</vs-chip>
    </div>
    <div class="chart-container__x-controls">
      <vs-slider
        class="chart-container__x-controls-slider"
        ticks
        step="1"
        :max="maxXValue"
        :min="minXValue"
        @input="updateXValue"
        :value="pinnedXs[currentDatasetIndex]"
      />

      <vs-input
        class="chart-container__x-controls-input"
        size="large"
        @input="updateXValue"
        @keydown.enter="pinSliderValue"
        :value="pinnedXs[currentDatasetIndex]"
      />
    </div>
  </div>
</template>

<script>
import {
  flow,
  prop,
  toPairs,
  max,
  min,
  map,
  throttle,
  filter,
  flatMap,
  isNaN
} from "lodash/fp";
import { validate } from "validate.js";
import LineChart from "./LineChart.js";

const COLORS = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba"
];

const createThrottledUpdate = (self, fn, delay) =>
  throttle(delay, (...args) => fn.call(self, ...args));

export default {
  components: {
    LineChart
  },

  data() {
    return {
      isN: true,
      updateXValue: null,
      pinnedXs: [0],
      currentDatasetIndex: 0,
      colors: COLORS,
      maxPinnedXs: 5
    };
  },

  props: {
    data: {
      type: null,
    },
  },

  computed: {
    parsedData() {
      return flow(
        toPairs,
        flatMap(([t, values]) =>
          values.map((value, n) => ({ t: Number.parseInt(t, 10), n, value }))
        )
      )(this.data);
    },

    chartData() {
      return {
        datasets: this.pinnedXs.map((x, index) => {
          const range = this.pickDataForXValue(x);
          const mapped = this.mapDataForChartData(range);

          return this.createDataset(mapped, COLORS[index]);
        })
      };
    },

    maxXValue() {
      return this.parsedData.length === 0
        ? 100
        : flow(
            map(prop(this.isN ? "n" : "t")),
            max
          )(this.parsedData);
    },

    minXValue() {
      return this.parsedData.length === 0
        ? 0
        : flow(
            map(prop(this.isN ? "n" : "t")),
            min
          )(this.parsedData);
    },

    options() {
      return {
        responsive: true,
        animation: false,
        legend: {
          display: false
        },
        tooltips: {
          mode: "point",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              type: "linear"
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };
    }
  },

  created() {
    this.updateXValue = createThrottledUpdate(
      this,
      function(value) {
        const newValue = this.getPrettyValue(value);
        const currentValue = this.pinnedXs[this.currentDatasetIndex];
        const valueToSet = newValue === null ? currentValue : newValue;

        this.$set(this.pinnedXs, this.currentDatasetIndex, valueToSet);
      },
      200
    );
  },

  methods: {
    getPrettyValue(x) {
      const num = Number.parseInt(x, 10);

      if (x === "") {
        return 0;
      }

      if (isNaN(num)) {
        return null;
      }

      if (num > this.maxXValue) {
        return this.maxXValue;
      }

      if (num < this.minXValue) {
        return this.minXValue;
      }

      return num;
    },

    pickDataForXValue(x) {
      const key = this.isN ? "n" : "t";

      return filter(point => point[key] === x, this.parsedData);
    },

    mapDataForChartData(data) {
      return data.map(({ n, value, t }) => ({
        y: value,
        x: this.isN ? t : n
      }));
    },

    createDataset(data, color) {
      return {
        fill: false,
        backgroundColor: color,
        borderColor: color,
        pointHitRadius: 3,
        label: "",
        pointRadius: 3,
        data: data
      };
    },

    pinSliderValue() {
      const tailIndex = this.pinnedXs.length - 1;
      const tail = this.pinnedXs[tailIndex];
      this.pinnedXs.push(tail);

      this.currentDatasetIndex = tailIndex + 1;
    },

    removeDataset(index) {
      if (this.currentDatasetIndex - 1 < 0) {
        this.currentDatasetIndex += 1;
      } else {
        this.currentDatasetIndex -= 1;
      }

      this.pinnedXs.splice(index, 1);
      const [removedColor] = this.colors.splice(index, 1);

      this.colors.push(removedColor);
    },

    switchType(isN) {
      this.currentDatasetIndex = 0;
      this.pinnedXs = [0];

      this.isN = isN;
    }
  }
};
</script>

<style lang="stylus">
.chart-container {
  display: flex;
  align-items: center;
  padding: 24px 24px;
  flex-wrap: wrap;

  &__container {
    width: 400px;
    position: relative;
  }

  &__header.vs-divider {
    margin-top: 0px;
  }

  &__chips {
    width: calc(100% - 400px);
    display: flex;
    height: 400px;
    padding-top: 36px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  &__switch {
    transform: scale(1.5);
    font-size: 17px;
  }

  &__slider.con-vs-slider {
    margin-top: 32px;
  }

  &__x-controls {
    display: flex;
    margin-top: 24px;
    width: 100%;

    &-slider.con-vs-slider {
      margin-right: 24px;

      .text-circle-slider.vs-slider--circle-text {
        display: none;
      }
    }
  }
}
</style>
