import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  audio: Ember.inject.service(),

  classNames: 'st-table-host',
  startTime: null,
  duration: null,
  table: null,
  isStarted: false,
  isTableCompleted: false,
  isSoundEnabled: true,
  playSoundOnCorrect: false,
  expectedSymbolIndex: 0,
  userSequence: [],

  init() {
    this._super();
    this.set('correctSound', this._createCorrectSound());
    this.set('incorrectSound', this._createIncorrectSound());
    this.set('previewTable', this.generatePreviewTable());
  },

  _createCorrectSound() {
    const audio = this.get('audio');
    const correctSound = audio.createOscillator({ name: 'kick' });
    const osc = correctSound.getConnection('audioSource');
    const gain = correctSound.getConnection('gain');

    osc.onPlayRamp('frequency').from(150).to(0.01).in(0.1);
    gain.onPlayRamp('gain').from(1).to(0.01).in(0.1);

    return correctSound;
  },

  _createIncorrectSound() {
    const audio = this.get('audio');
    const incorrectSound = audio.createOscillator({ name: 'incorrect' });
    const osc = incorrectSound.getConnection('audioSource');
    const gain = incorrectSound.getConnection('gain');

    osc.onPlayRamp('frequency').from(450).to(0.01).in(0.1);
    gain.onPlayRamp('gain').from(1).to(0.01).in(0.1);

    return incorrectSound;
  },

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

  showControls: computed('isTableCompleted', function () {

  }),

  generateTableConfig() {
    return {
      symbols: 'numbers',
      width: 5,
      height: 5,
      properties: [
        { key: 'font', value: 'standard' },
        { key: 'fontColor', value: 'black' },
        { key: 'backgroundColor', value: 'white' }
      ]
    }
  },

  generateSymbols(tableConfig) {
    const length = tableConfig.width * tableConfig.height;
    const gridSizeArray = Array(length).fill(0);
    const symbols = gridSizeArray.map((_, i) => i + 1);
    const randomSymbols = this.randomize(symbols);

    return {
      expectedSequence: symbols,
      randomizedSequence: randomSymbols
    }
  },

  generateTable(tableConfig, sequence) {
    const cells = sequence.randomizedSequence.map((symbol, i) => {
      const x = i % tableConfig.width + 1;
      const y = Math.floor(i / tableConfig.width) + 1;

      return {
        x,
        y,
        text: symbol,
        classes: []
      };
    });

    return {
      expectedSequence: sequence.expectedSequence,
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

  generatePreviewTable() {
    const tableConfig = this.generateTableConfig();
    const sequence = this.generateSymbols(tableConfig);
    const table = this.generateTable(tableConfig, sequence);
    return table;
  },

  actions: {
    start() {
      this.reset();
      this.get('onStart')()
        .then(signedStartTime => {

          this.set('signedStartTime', signedStartTime);
          this.set('startTime', (new Date()).toJSON());
          this.set('isStarted', true);
          const tableConfig = this.generateTableConfig();
          this.set('tableConfig', tableConfig)
          const sequence = this.generateSymbols(tableConfig);
          this.set('tableSequence', sequence);
          const table = this.generateTable(tableConfig, sequence);
          this.set('table', table);
        });
    },

    clear() {
      this.reset();
    },

    selectCell(cell) {
      if (this.get('isTableCompleted')) {
        return;
      }

      const isExpectingLastSymbol = this.get('expectedSymbolIndex') == (this.get('table.expectedSequence').length - 1);
      const expectedSymbol = this.get('expectedSymbol');
      const correct = expectedSymbol == cell.text;

      const isTableCompleted = isExpectingLastSymbol && correct;

      if (this.get('isSoundEnabled')) {
        if (correct && this.get('playSoundOnCorrect')) {
          this.get('correctSound').playFor(0.3);
        }
        else if(!correct) {
          this.get('incorrectSound').playFor(0.3);
        }
      }

      if (correct && !isTableCompleted) {
        this.incrementProperty('expectedSymbolIndex')
      }

      const selection = {
        correct,
        time: (new Date()).toJSON(),
        cell
      };

      this.get('userSequence').pushObject(selection);

      if (isTableCompleted) {
        this.set('isTableCompleted', true)
        this.set('isStarted', false);
        const endTime = this.get('userSequence')[this.get('userSequence').length - 1].time;
        const duration = new Date(endTime) - new Date(this.get('startTime'));
        this.set('duration', duration / 1000);

        this.get('onTableCompleted')({
          signedStartTime: this.get('signedStartTime'),
          startTime: this.get('startTime'),
          endTime,
          duration,
          userSequence: this.get('userSequence'),
          expectedSequence: this.get('tableSequence.expectedSequence'),
          randomizedSequence: this.get('tableSequence.randomizedSequence'),
          tableWidth: this.get('tableConfig.width'),
          tableHeight: this.get('tableConfig.height'),
          tableProperties: this.get('tableConfig.properties')
        })
      }
    }
  }
});
