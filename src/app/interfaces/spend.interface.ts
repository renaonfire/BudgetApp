export interface ISpend {
    id?: string,
    data?: {
        date?: string,
        amount?: number
    }
}

export interface ISumOfSpend {
    spend?: number,
    budget?: number,
    remainder?: number
}