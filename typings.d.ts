export interface IVerb {
  id: bigint
  infinitive: { cz: string, en: string },
  positive: {
    plural: {
      first: { en: { verb: string }, cz: { verb: string } }
      second: { en: { verb: string }, cz: { verb: string } }
      third: { en: { verb: string }, cz: { verb: string } }
    }
    singular: {
      first: { en: { verb: string }, cz: { verb: string } }
      second: { en: { verb: string }, cz: { verb: string } }
      third: { en: { verb: string }, cz: { verb: string } }
    }
  },
  negative?: {
    plural: {
      first: { en: { verb: string }, cz: { verb: string } }
      second: { en: { verb: string }, cz: { verb: string } }
      third: { en: { verb: string }, cz: { verb: string } }
    }
    singular: {
      first: { en: { verb: string }, cz: { verb: string } }
      second: { en: { verb: string }, cz: { verb: string } }
      third: { en: { verb: string }, cz: { verb: string } }
    }
  }
}