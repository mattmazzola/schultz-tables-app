import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: 'st-table-host',
  startTime: null,
  duration: null,
  table: null,
  isTableCompleted: false,
  expectedSymbolIndex: 0,
  userSequence: [],

  randomize(xs) {
    let unrandomized = xs.slice(0);
    const randomized = [];

    while (unrandomized.length > 0) {
      const randomIndex = Math.floor(Math.random() * unrandomized.length);
      const randomElement = unrandomized[randomIndex];

      randomized.push(randomElement);

      unrandomized.splice(randomIndex, 1);
    }

    return randomized;
  },

  expectedSymbol: computed('table', 'expectedSymbolIndex', function () {
    if (this.get('table') && Array.isArray(this.get('table.expectedSequence'))) {
      return this.get('table.expectedSequence')[this.get('expectedSymbolIndex')];
    }
  }),

  generateTableConfig() {
    return {
      symbols: 'numbers',
      size: 5,
      font: 'standard',
      fontColor: 'black',
      backgroundColor: 'white'
    }
  },

  generateTable(tableConfig) {
    const length = tableConfig.size ** 2;
    const gridSizeArray = Array(length).fill(0);
    const symbols = gridSizeArray.map((_, i) => i + 1);
    const randomSymbols = this.randomize(symbols);

    const cells = randomSymbols.map((symbol, i) => {
      const number = i + 1;
      const x = i % 5 + 1;
      const y = Math.floor(i / 5) + 1;

      return {
        x,
        y,
        text: symbol,
        classes: []
      };
    });

    return {
      expectedSequence: symbols,
      cells
    }
  },

  reset() {
    this.set('table', null);
    this.set('isTableCompleted', false);
    this.set('duration', null);
    this.set('startTime', null);
    this.set('userSequence', []);
    this.set('expectedSymbolIndex', 0);
  },

  actions: {
    start() {
      this.reset();
      console.log('start');
      this.set('startTime', (new Date()).getTime());
      const tableConfig = this.generateTableConfig();
      const table = this.generateTable(tableConfig);
      this.set('table', table);
      console.log(table);
    },

    clear() {
      this.reset();
    },

    selectCell(cell) {
      console.log(cell, cell.text);

      if (this.get('isTableCompleted')) {
        return;
      }

      const isExpectingLastSymbol = this.get('expectedSymbolIndex') == (this.get('table.expectedSequence').length - 1);
      const expectedSymbol = this.get('expectedSymbol');
      const correct = expectedSymbol == cell.text;

      if (correct) {
        this.incrementProperty('expectedSymbolIndex')
      }

      const selection = {
        correct,
        time: (new Date()).getTime(),
        cell
      };

      this.get('userSequence').pushObject(selection);

      const isTableCompleted = isExpectingLastSymbol && correct;
      if (isTableCompleted) {
        this.set('isTableCompleted', true)
        const duration = this.get('userSequence')[this.get('userSequence').length - 1].time - this.get('startTime');
        this.set('duration', duration / 1000);
      }
    }
  }
});
