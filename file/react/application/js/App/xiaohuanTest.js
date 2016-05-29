/**
 * Created by Administrator on 2016/2/19.
 */
class Form extends React.Component {
    state = {
        username: '',
        gender: "man",
        checked: false
    };

    changeHandle(name, event) {
        var newState = {};
        newState[name] = name == "checked" ? event.target.checked : event.target.value;
        this.setState(newState);
    }

    submitHandle(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.submitHandle.bind(this)}>
                <label htmlFor="username">请用户输入：</label>
                <input type="text" id="username" value={this.state.username}
                       onChange={this.changeHandle.bind(this,"username")}/>
                <br/>
                <select value={this.state.gender} onChange={this.changeHandle.bind(this,"gender")}>
                    <option value="men">男</option>
                    <option value="women">女</option>
                </select>
                <br/>
                <label htmlFor="checked">同意用户协议</label>
                <input type="checkbox" id="checked" checked={this.state.checked} onChange={this.changeHandle.bind(this,"checked")
                }/>
                <button type="submit">注册</button>
            </form>
        )
    }
}
import ReactDOM from "react-dom";
ReactDOM.render(
    <Form/>, document.body
)