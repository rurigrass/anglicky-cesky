export interface IVerb {
  id: bigint
  infinitive: { cz: string, en: string },
  positive?: {
    plural: {
      1: { en: { verb: string }, cz: { verb: string } }
      2: { en: { verb: string }, cz: { verb: string } }
      3: { en: { verb: string }, cz: { verb: string } }
    }
    singular: {
      1: { en: { verb: string }, cz: { verb: string } }
      2: { en: { verb: string }, cz: { verb: string } }
      3: { en: { verb: string }, cz: { verb: string } }
    }
  },
  negative?: {
    plural: {
      1: { en: { verb: string }, cz: { verb: string } }
      2: { en: { verb: string }, cz: { verb: string } }
      3: { en: { verb: string }, cz: { verb: string } }
    }
    singular: {
      1: { en: { verb: string }, cz: { verb: string } }
      2: { en: { verb: string }, cz: { verb: string } }
      3: { en: { verb: string }, cz: { verb: string } }
    }
  }
}