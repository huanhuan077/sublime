import Component from "../Core/Component.jsx";
export default class CustomSelect extends Component  {
    render(){
        return (
            <select {...this.props} onChange={(e)=>{
                var value = $('option:checked',this.dom()).val()
                this.trigger('onChange',value);
            }} value={this.props.selected}>
                {(this.props.options||[]).map((value,index)=>{
                    return <option value={value} key={index}>{value}</option>;
                })}
            </select>
        );
    }
}