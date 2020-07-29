import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import {
    Button,
    Header,
    Modal,
    Icon,
} from 'semantic-ui-react'

class DeleteDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // openの状態変化に応じでモーダルの表示、非表示
            open: false,
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.Delete = this.Delete.bind(this)
    }
    open() {
        this.setState({ open: true })
    }
    close() {
        this.setState({ open: false })
    }
    Delete() {
        this.props.onDelete(null, this.props.item)
    }
    render() {
        return (
            <Modal
                trigger={
                    // ボタンを配置
                    <Button color="red" onClick={this.open} >削除</Button>
                }
                basic
                size="small"
                open={this.state.open}
            >
                <Header icon="tasks" content="タスク削除" />
                <Modal.Content>
                    <p>「{this.props.item.value}」タスクを削除してもよろしいですか？</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic inverted onClick={this.close}><Icon name="remove" />いいえ</Button>
                    <Button color="red" inverted onClick={this.Delete} ><Icon name="checkmark" />はい</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

// propの型を宣言
DeleteDialog.propTypes = {
    item: PropTypes.object,
    onDelete: PropTypes.func,
}

export default DeleteDialog