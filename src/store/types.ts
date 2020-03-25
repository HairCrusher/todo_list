interface ITodo {
    text: string,
    checked: boolean
}

interface IList {
    id?: number,
    title: string,
    todos: ITodo[]
}

export interface IRootState {
    lists: IList[]
}