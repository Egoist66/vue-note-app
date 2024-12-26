export type ToDoListApp = {
    todolistitems: ToDoListItem[]
}

export type ToDoListItem = {
    id: string | number
    text: string,
    created_at: Date | number,
    completed: boolean
    editing: boolean
}

