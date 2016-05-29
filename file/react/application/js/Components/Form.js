/**
 * Created by glp- on 2016/2/1.
 */

import ReactDOM from "react-dom";

export default class Product extends React.Component{
    state = {
        value:'王革革',
        paragraph:'恭贺大老板新店开张，祝今后财源滚滚，一帆风顺',
        tip:'',
        number:2
    };
    handleChange(event){
        this.setState({value: event.target.value,paragraph:event.target.value});
    }
    numberMinus(){
        if(this.state.number==1){return}
        this.setState({
            number: this.state.number - 1
        },()=>{
            this.props.onCount && this.props.onCount(this.state.number);
        });
    }
    numberPlus(){
        this.setState({
            number: this.state.number + 1
        },()=>{
            this.props.onCount && this.props.onCount(this.state.number);
        });
    }
    render(){
        var value = this.state.value;
        var paragraph=this.state.paragraph;
        var tip=this.state.tip;
        var number=this.state.number;
        return(
            <form>
                <div className="div1">
                    <span>送礼人</span><input type="text" value={value} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="div2">
                    <span>祝福语</span>
                    <textarea onChange={this.handleChange.bind(this)} value={paragraph} />
                </div>
                <div className="div3">
                    <span>数&nbsp;量</span>
                    <span id="number">{number}</span>
                    <button id="min" type="button" onClick={this.numberMinus.bind(this)}>-</button>
                    <button id="add" type="button" onClick={this.numberPlus.bind(this)}>+</button>
                </div>
                <div className="div4">
                    <span>备&nbsp;注</span>
                    <textarea placeholder="对花店的其他要求" value={tip} />
                </div>
            </form>
        )
    }
}