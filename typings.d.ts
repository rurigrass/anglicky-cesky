export interface IVerb {
  id: bigint
  infinitive: { cz: string, en: string },
  positive: {
    plural: {
      first: { en: string, cz: string }
      second: { en: string, cz: string }
      third: { en: string, cz: string }
    }
    singular: {
      first: { en: string, cz: string }
      second: { en: string, cz: string }
      third: { en: string, cz: string }
    }
  },
  negative?: {
    plural: {
      first: { en: string, cz: string }
      second: { en: string, cz: string }
      third: { en: string, cz: string }
    }
    singular: {
      first: { en: string, cz: string }
      second: { en: string, cz: string }
      third: { en: string, cz: string }
    }
  }
}

export interface DaBest { en: { verb: string }, cz: { verb: string } }
