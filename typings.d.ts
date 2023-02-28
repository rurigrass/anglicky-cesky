export interface IVerb {
  id: bigint
  infinitive: { cz: string, en: string },
  positive: {
    plural: {
      first: { cz: string, en: string }
      second: { cz: string, en: string }
      third: { cz: string, en: string }
    }
    singular: {
      first: { cz: string, en: string }
      second: { cz: string, en: string }
      third: { cz: string, en: string }
    }
  },
  negative?: {
    plural: {
      first: { cz: string, en: string }
      second: { cz: string, en: string }
      third: { cz: string, en: string }
    }
    singular: {
      first: { cz: string, en: string }
      second: { cz: string, en: string }
      third: { cz: string, en: string }
    }
  }
}

export interface DaBest { en: { verb: string }, cz: { verb: string } }
