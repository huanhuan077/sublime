import ReactDom from "react-dom";
export default class Component extends React.Component {
    dom(ref = null){
        var target = ref ? (ref instanceof String ? this.refs[ref] : ref) : this;
        return ReactDom.findDOMNode(target);
    }
    map(callback,context = this){
       return React.Children.map(this,callback,context);
    }
    forEach(callback = this){
        return React.Children.forEach(this,callback,context);
    }
    count(){
        return React.Children.count(this);
    }
    only(){
        return React.Children.only(this);
    }
    trigger(name,...args){
        var fn = this.props[name];
        return fn && fn(...args);
    }
}