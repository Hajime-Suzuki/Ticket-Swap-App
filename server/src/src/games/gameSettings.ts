// type specialSymbols = {
//   amount: number
//   symbol: 'O' | 'Y' | 'Z'
//   point: number
// }
export type specialSymbols = 'seaweed' | 'octopus' | 'fish' | 'shark' | 'frog'

export const boardSetting = {
  gridSize: 6,
  characters: {
    seaweed: {
      amount: 0,
      symbol: 'seaweed',
      point: 0
    },
    octopus: {
      amount: 6,
      symbol: 'octopus',
      point: -10
    },
    fish: {
      amount: 12,
      symbol: 'fish',
      point: 10
    },
    shark: {
      amount: 5,
      symbol: 'shark',
      point: 20
    },
    frog: {
      amount: 4,
      symbol: 'frog',
      point: 15
    }
  }
}
