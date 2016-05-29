/**
 * Created by glp- on 2016/1/25.
 */
import "../../css/wei_payChecked.css"
import WeichatShare from "../Components/weichatShare.js"
import ReactDOM from 'react-dom';
  
export default class Paychecked extends React.Component{
     change(){
        var tip=ReactDOM.findDOMNode(this.refs.tip);
        tip.style.display="none";
        var shade=ReactDOM.findDOMNode(this.refs.shade);
        shade.style.display="none";
    }
    renderFooter(){
        return(
            <footer>
                <WeichatShare tag={()=>{
                    var tip=ReactDOM.findDOMNode(this.refs.tip);
                    tip.style.display="block";
                    var shade=ReactDOM.findDOMNode(this.refs.shade);
                    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;

                    if(document.body){
                    bodyScrollHeight = document.body.scrollHeight;
                    }
                    if(document.documentElement){
                    documentScrollHeight = document.documentElement.scrollHeight;
                    }
                    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                    shade.style.height=scrollHeight+"px"
                    shade.style.display="block";
                }}/>
                <p>快把您的祝贺分享出去，</p>
                <p>让更多朋友前来祝贺“美味源”火锅即将开业吧</p>
                <div className="tip" ref="tip">
                    <img src="./images/wx_share.png" onClick={this.change.bind(this)} />
                </div>
                <div className="shade" ref="shade"></div>
            </footer>
        )
    }
    renderForm(){
        return(
            <form>
                <div className="bill borderW">
                    <img src="./images/blessing_bigimg.jpg" />
                    <div>
                        <h1 className="inLine">我是鲜花的名称</h1>
                        <span>{invitation.discount+"折"}</span>
                    </div>
                    <div>
                        <h2 className="discount_price inLine">120.00</h2>
                        <h3 className="price inLine">180.00</h3>
                    </div>
                </div>
                <div className="borderW divH">
                    <span className="fontS">送礼人</span>
                    <span className="spanW marL fontS">王革革</span>
                </div>
                <div className="borderW divH2">
                    <span className="fontS linH">祝福语</span>
                    <span className="spanW marL fontS marT">恭贺大老板新店开张，祝今后财源滚滚，一帆风顺</span>
                </div>
                <div className="borderW divH">
                    <span className="fontS">数&nbsp;量</span>
                    <span className="double marL fontS">2</span>
                    <span>对</span>
                </div>
                <div className="borderW divH2">
                    <span className="fontS linH">备&nbsp;注</span>
                    <span className="spanW marL fontS marT">麻烦老板帮我及时送到，祝福语不要写错字了。</span>
                </div>
            </form>
        )
    }
    render(){
        return(
            <div>
                <header>
                    <h1>
                        <img src="./images/payfor_suc.png" />
                        <span>支付成功，谢谢您的惠顾</span>
                    </h1>
                    <h2>您的花篮送达后，我们会短信告知您</h2>
                </header>
                <a className="call" href="tel:18270825875" >
                    <img src="./images/payfor_tel.png" />小镇姑娘花艺馆为您服务
                </a>
                {this.renderForm()}
                {this.renderFooter()}
            </div>
        )
    }
}
module.exports=Paychecked;
