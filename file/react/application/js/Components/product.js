/**
 * Created by glp- on 2016/1/29.
 */

import ReactDOM from "react-dom";

export default class Product extends React.Component{

    componentDidUpdate(){
        this.initialStyle();
    };
    initialStyle(){
        var id=this.props.idValue;
        if(this.props.select){
        $(function(){
            $('li[name='+id+']').css('background','#f84f00');
            $('li[name='+id+'] .name').css('color','#ffffff');
            $('li[name='+id+'] .discount_price').css('color','#ffffff');
            $('li[name='+id+'] .span').css({'background':'#ffffff','color':'#f84f00'});
            $('li[name='+id+'] .price').css('color','#ffffff');
        });
        }else{
            $(function(){
                $('li[name='+id+']').css('background','#eeeeee');
                $('li[name='+id+'] .name').css('color','#333333');
                $('li[name='+id+'] .discount_price').css('color','#f84f00');
                $('li[name='+id+'] .span').css({'color':'#ffffff','background':'#f84f00'});
                $('li[name='+id+'] .price').css('color','#888888');
            });
        }
    };
    render(){
        return(
            <li name={this.props.idValue} className="flower" onClick={this.props.onClick}>
                <h4 className="name" >{this.props.name}</h4>
                <img src={"./images/"+this.props.imageSrc} className="img" />
                <h4 className="discount_price">{this.props.discount_price}</h4>
                <span className="span">{this.props.discount+'折'}</span>
                <h4 className="price">{this.props.price}</h4>
            </li>
        )
    }
}