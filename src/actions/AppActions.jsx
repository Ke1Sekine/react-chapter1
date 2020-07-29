const Actions = {
    addItem(item) {
        return {
            type : 'ADD',
            item
        }
    },
    // 新規追加以外の更新、削除はすべてUPDATEで完結
    updateItem(item) {
        return {
            type : 'UPDATE',
            item
        }
    },
}

export default Actions;