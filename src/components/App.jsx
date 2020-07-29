import React from 'react';
import PropTypes from 'prop-types'; 
import { 
    Container,
    Button,
    Grid,
    Divider,
    Input,
    Menu,
} from "semantic-ui-react";

import TodoList from './TodoList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // タスクの初期内容
            text: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.makeItem = this.makeItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.UpdateState = this.UpdateState.bind(this)
    }

    /**
     * 操作：入力項目を変更した際のイベントハンドラー
     * 動作：テキスト内容をステートに保持する
     * @param {object} item 
     */
    handleChange(event, item) {
        this.setState({
            text: item.value,
        })
    }

    /**
     * 操作：「タスク追加」ボタンを押下後（クリック）後のイベントハンドラー
     * 動作：入力されている内容（ステートで保持しているデータ）を上位（プロップス）より渡されている関数に引き継ぐ
     * ※その前にタスク作成メソッドを呼び出してオブジェクトを作成している
     */
    handleClick() {
        if (!(this.state.text)) {
            return
        }
        this.props.handleAddItem(this.makeItem(this.state.text))
        this.setState({
            text: '',
        })
    }

    /**
     * TODOのタスクを生成する
     * @param {string} text 入力内容（ステートより）
     * @returns {object}
     */
    makeItem(text) {
        const item = {
            value: text,
            id: new Date(),
            condition: false,
        }
        return item
    }

    /**
     * 更新モーダルより変更のあったアイテムに対して、
     * ステートの更新をかける（ための準備）
     * @param {string} id 
     * @param {string} text 
     */
    handleUpdate(id, text) {
        //タスクを別の配列として複製
        const todo = (this.props.items).concat()
        todo.map((currentValue, index) => {
            if (currentValue.id === id) {
                todo[index].value = text
            }
            return currentValue.id
        })
        this.UpdateState(todo)
    }

    /**
     * TODOのタスクから対象のIDを削除する
     * src/components/DeleteDialog.jsxよりIDが上がってきます。
     * @param {string} id 
     */
    handleDelete(id) {
        //タスクを別の配列として複製
        const todo = (this.props.items).concat()
        todo.map((currentValue, index) => {
            if (currentValue.id === id) { todo.splice(index, 1) }
            return currentValue.id
        })
        this.UpdateState(todo)
    }
    
    /**
     * TODOのタスクの状態を変化させる
     * 完了 <=> 未完了
     * @param {string} id
     */
    handleCheck(id) {
        const todo = (this.props.items).concat()
        todo.map((currentValue, index) => {
            if ((currentValue.id).toString() === id) {
                todo[index].condition = !(todo[index].condition)
            }
            return currentValue.id
        })
        this.UpdateState(todo)
    }

    // ステート更新
    /**
     * 上位のコンポーネントからプロップされたメソッドを使用する。
     * (渡されたメソッドはアクションのため、ディスパッチャーが呼び出され、ステートが変わる)
     * @param {*} value 
     */
    UpdateState(value) {
        this.props.handleUpdateItem(value)
    }
    
    /**
     * 描画ß
     */
    render() {
        return (
            <div>
                <Menu attached>
                    <Menu.Item as="h3">ToDo</Menu.Item>
                </Menu>
                <Container>
                    <Grid container>
                        <Grid.Row>
                            <Grid.Column>{null}</Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Divider horizontal>追加</Divider>
                            <Container textAlign="center">
                                <Grid columns="equal">
                                    <Grid.Column> {null} </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Input fluid placeholder="タスクを入力" onChange={this.handleChange} value={this.state.text} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button primary onClick={this.handleClick}>タスク追加</Button>
                                    </Grid.Column>
                                </Grid>
                            </Container>
                        </Grid.Row>
                        <Grid.Row>
                            <Divider horizontal>一覧</Divider>
                            <Container textAlign="center">
                                <TodoList
                                    items={this.props.items}
                                    handleDelete={this.handleDelete}
                                    handleCheck={this.handleCheck}
                                    handleUpdate={this.handleUpdate}
                                />
                            </Container>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

App.propTypes = {
    items: PropTypes.array,
    handleTodoAdd: PropTypes.func,
    handleUpdAdd: PropTypes.func,
}
export default App;
