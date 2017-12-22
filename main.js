const SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const WINNER_COMBS = [[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[7, 5, 3]]

const getRandom = arr => arr[Math.floor(Math.random() * arr.length)]

window.app = new Vue({
  el: '#app',
  data: {
    message: '',
    glyph: 'X',
    turn: 'user',
    playing: true,
    user: [],
    computer: []
  },
  methods: {
    selectSlot(slot) {
      if (this.playing && this.turn === 'user' && !this.slotIsUsed(slot)) {
        this.user.push(slot)

        if (this.hasWon(this.user)) {
          this.reset('You won!')
        } else if (!this.availableSlots.length) {
          this.reset('Draw!')
        } else {
          this.turn = 'computer'
          this.computerPlay()
        }
      }
    },
    selectGlyph(glyph) {
      this.glyph = glyph
    },
    computerPlay() {
      setTimeout(() => {
        const slot = getRandom(this.availableSlots)
        this.computer.push(slot)

        if (this.hasWon(this.computer)) {
          this.reset('You lost!')
        } else if (!this.availableSlots.length) {
          this.reset('Draw!')
        } else {
          this.turn = 'user'
        }
      }, 500)
    },
    reset(message) {
      this.message = message
      this.playing = false

      setTimeout(() => {
        this.message = ''
        this.turn = 'user'
        this.playing = true
        this.user = []
        this.computer = []
      }, 2000)
    },
    // Paramed selectors
    fillSlot(slot) {
      if (this.user.includes(slot)) return this.glyph
      if (this.computer.includes(slot)) return this.computerGlyph
      else return ""
    },
    slotIsUsed(slot) {
      return [...this.user, ...this.computer].includes(slot)
    },
    hasWon(comb) {
      return WINNER_COMBS.some(wcomb => wcomb.every(match => comb.includes(match)))
    }
  },
  computed: {
    computerGlyph() {
      return this.glyph === 'X'
        ? 'O'
        : 'X'
    },
    availableSlots() {
      return SLOTS.filter(slot => !this.usedSlots.includes(slot))
    },
    usedSlots() {
      return [...this.user, ...this.computer]
    }
  }
})