<template>
  <div class="chart-container">
    <div class="chart-container__container">
      <line-chart :options="options" :chart-data="data"></line-chart>
    </div>
    <div class="chart-container__chips">
      <vs-switch class="chart-container__switch" v-model="isN">
        <span slot="on">n</span>
        <span slot="off">t</span>
      </vs-switch>
    </div>
    <vs-slider class="chart-container__slider" ticks step="1" max=100 v-model="slider"/>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";

let _seed = Date.now()

const rand = function(min, max) {
  var seed = _seed;
  min = min === undefined ? 0 : min;
  max = max === undefined ? 1 : max;
  _seed = (seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
};

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var COLORS = [
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

// DEPRECATED
const randomScalingFactor = function() {
  return Math.round(rand(-100, 100));
};

export default {
  components: {
    LineChart
  },
  data() {
    return {
      slider: 0,
      isN: false,
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Unfilled",
            fill: false,
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          },
          {
            label: "Dashed",
            fill: false,
            backgroundColor: chartColors.green,
            borderColor: chartColors.green,
            borderDash: [5, 5],
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          },
          {
            label: "Filled",
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Chart.js Line Chart"
        },
        tooltips: {
          mode: "index",
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
              scaleLabel: {
                display: true,
                labelString: "Month"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              }
            }
          ]
        }
      }
    };
  },
  created() {
    // this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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
}
</style>
