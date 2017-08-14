import Ember from 'ember';

const {
  computed
} = Ember;

const component = Ember.Component.extend({
  classNames: ['st-user'],

  isOpen: false,

  chartOptions: computed('user.scores', function () {
    if (!this.get('user.scores')) {
      return null
    }

    const scoreData = this.get('user.scores').map(score => [score.startTime, score.durationMilliseconds / 1000]);

    return {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Table Duration over Actual Time'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        title: {
          text: 'Table Duration'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            }
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      }
    }
  }),

  chartData: computed('user.scores', function () {
    const scoreData = this.get('user.scores').map(score => [score.startTime, score.durationMilliseconds / 1000]);

    return [
      {
        name: 'Jane',
        data: scoreData
      }
    ]
  }),

  actions: {
    toggle() {
      this.toggleProperty('isOpen')
    }
  }
});

component.reopenClass({
  positionalParams: ['user']
})

export default component;