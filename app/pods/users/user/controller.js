import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),

  isCurrentUser: computed('session', 'model', function () {
    const sessionAccount = this.get('sessionAccount');
    const userBeingViewed = this.get('model');

    return sessionAccount.get('userAuthData.id') === userBeingViewed.id;
  }),

  chartOptions: computed('model.scores', function () {
    if (!this.get('model.scores')) {
      return null
    }

    const scoreData = this.get('model.scores').map(score => [score.startTime, score.durationMilliseconds / 1000]);

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
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
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

  chartData: computed('model.scores', function () {
    const scoreData = this.get('model.scores').map(score => [score.startTime, score.durationMilliseconds / 1000]);

    return [
      {
        name: 'Jane',
        data: scoreData
      }
    ]
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
