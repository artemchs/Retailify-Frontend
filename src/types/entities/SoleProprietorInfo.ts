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
          taxAddress: string | null
          phoneNumber: string | null
          taxGroup: string | null
      })
    | null
