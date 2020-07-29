import { connect } from "react-redux";
import App from "./../components/App";
import Actions from "./../actions/AppActions";

// Container(コンテナ)
// Storeが持つStateをReactのプロパティとしてViewと結びつける役割を持つ。
function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddItem(item) {
            dispatch(Actions.addItem(item));
        },
        handleUpdateItem(item) {
            dispatch(Actions.updateItem(item));
        }
    }
}

// connectを利用して、mapStateToPropsが取ってきたStateの値をApp（コンポーネント）で利用できるように繋げて(connect)います。
export default connect(mapStateToProps, mapDispatchToProps)(App);
// containerに関しては、ほとんどの場合がこれだけのようです。
