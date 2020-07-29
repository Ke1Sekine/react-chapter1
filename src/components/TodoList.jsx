import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import {
    Table,
    Header,
    Checkbox,
} from 'semantic-ui-react'

// Modal
import UpdateDialog from './UpdateDialog'
import DeleteDialog from './DeleteDialog'


class TodoList extends Component {
    constructor(props) {
        super(props)
        this.Delete = this.Delete.bind(this)
        this.Update = this.Update.bind(this)
        this.Check = this.Check.bind(this)
    }

    /**
     * 削除ボタンを押下された際のイベントハンドラー
     * 呼び出し元のメソッドを利用する(props)
     * ここではsrc/components/App.jsx
     * ボタンの実態はコンポーネント（src/components/DeleteDialog.jsx）に存在する
     * @param {*} event
     * @param {object} item 
     */
    Delete(event, item) {
        const task = item.target ? item.target : item.id
        //呼び出し元のメソッドを利用
        this.props.handleDelete(task)
    }

    /**
     * チェックボックスを押下された際のイベントハンドラー
     * 呼び出し元のメソッドを利用する(props)
     * ここではsrc/components/App.jsx
     * @param {*} event
     * @param {object} item
     */
    Check(event, item) {
        let id = item.value
        //呼び出し元のメソッドを利用
        this.props.handleCheck(id)
    }

    /**
     * 更新ボタンを押下された際のイベントハンドラー
     * 呼び出し元のメソッドを利用する(props)
     * ここではsrc/components/App.jsx
     * ボタンの実態はコンポーネント（src/components/UpdateDialog.jsx）に存在する
     * @param {*} event
     * @param {object} item
     */
    Update(target, change) {
        //呼び出し元のメソッドを利用
        this.props.handleUpdate(target, change)
    }
    render() {
        return (
            <Table basic="very" >
                <Table.Body>
                    {this.props.items.map((item) => {
                        return (
                            <Table.Row key={item.id} >
                                <Table.Cell width={3} textAlign="right" >
                                    <Checkbox checked={item.condition} value={(item.id).toString()} onChange={this.Check} />
                                </Table.Cell>
                                <Table.Cell width={6} textAlign="center" >
                                    <Header as="h2" disabled={item.condition} className={item.condition ? 'lineThrough' : ''} >
                                        {item.value}
                                    </Header>
                                </Table.Cell>
                                <Table.Cell width={3} textAlign="left" >
                                    <UpdateDialog item={item} onUpdate={this.Update} />
                                    <DeleteDialog item={item} onDelete={this.Delete} />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }
}

// propの型を宣言
TodoList.propTypes = {
    items: PropTypes.array,
    handleDelete: PropTypes.func,
    handleCheck: PropTypes.func,
    handleUpdate: PropTypes.func,
}

export default TodoList