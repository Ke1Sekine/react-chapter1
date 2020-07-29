import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import {
    Button,
    Header,
    Modal,
    Icon,
    Input,
} from 'semantic-ui-react'

class UpdateDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // openの状態変化に応じでモーダルの表示、非表示
            open: false,
            text: this.props.item.value,
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.change = this.change.bind(this)
        this.Update = this.Update.bind(this)
    }
    open() {
        this.setState({ open: true })
    }
    close() {
        this.setState({ open: false })
    }
    change(event, item) {
        this.setState({
            text: item.value,
        })
    }
    Update() {
        this.props.onUpdate(this.props.item.id, this.state.text)
        this.close()
    }
    render() {
        return (
            <Modal
                trigger={
                    // ボタンを配置
                    <Button color="green" onClick={this.open} disabled={this.props.item.condition} >更新</Button>
                }
                size="small"
                //デフォルト：false
                open={this.state.open}
            >
                <Header icon="tasks" content="タスク更新" />
                <Modal.Content>
                    <Input fluid value={this.state.text} onChange={this.change} />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close} ><Icon name="remove" /> キャンセル</Button>
                    <Button color="green" onClick={this.Update} ><Icon name="checkmark" />更新</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

// propの型を宣言
UpdateDialog.propTypes = {
    item: PropTypes.object,
    onUpdate: PropTypes.func,
}

export default UpdateDialog