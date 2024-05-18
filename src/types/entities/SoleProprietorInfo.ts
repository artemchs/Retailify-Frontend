export type SoleProprietorInfo =
    | ({
          currentAccounts: {
              id: string
              createdAt: Date
              updatedAt: Date
              name: string
              iban: string
              soleProprietorInfoId: string | null
          }[]
      } & {
          id: string
          createdAt: Date
          updatedAt: Date
          tin: string | null
      })
    | null
