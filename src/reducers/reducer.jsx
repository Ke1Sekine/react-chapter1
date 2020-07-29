// 初期State
const initialState = {
    items : [],
    text : "",
}

// Reducer
/**
 * Actionを受け取り、それに従って書き換えるStateの中身を作る。
 * 上位（createStore(reducer)）で呼び出した箇所で管理される。
 * コンテナーでディスパッチしておき、
 * アクションが実行された際にReducer(レジューサ)が受け取り書き換えるStateの中身を作る。
 * ここではsrc/index.jsの中でcreateStoreを呼び出し、src/containers/App.jsxでディスパッチしている。
 * ディスパッチではsrc/actions/AppActions.jsxのアクションを結び付けている。
 * Viewのコンポーネント（src/components/App.jsx）のhandleClickメソッドなどで受け取ったプロップによって
 * 該当メソッドを呼び出している。
 * 
 */
// デフォルト指定
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD' : {
            return {
                items: state.items.concat(action.item)
            };
        }
        case 'UPDATE' : {
            return {
                items : action.item
            };
        }
        default : {
            return state;
        }
    }
};

export default reducer;