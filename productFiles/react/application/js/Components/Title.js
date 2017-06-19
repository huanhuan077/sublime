import Component from "../Core/Component.jsx";

export default class Title extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            level : props.level,
            color : props.color,
        };
    }
    static defaultProps = {
        level : 1,
        color : 'black'
    };
    static Colors = ['red','green','black'];
    getRandomColor(){
        var rand = _.random(0,Title.Colors.length - 1);
        return Title.Colors[rand];
    }
    render(){
        var level = this.state.level;
        var Tag = 'h' +level;
        return (<Tag style={{color : this.state.color}} onClick={()=>{
            this.setState({
                level : this.state.level == 5 ? 1 : this.state.level +1,
                color : this.getRandomColor()
            },()=>{
                if(this.props.onColorChange){
                    this.props.onColorChange(this.state.color);
                }
                if(this.props.onLevelChange){
                    this.props.onLevelChange(this.state.level);
                }
            })
        }}>{this.props.children}</Tag>);
    }
}