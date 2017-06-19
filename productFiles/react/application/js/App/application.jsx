/**
 * User: David
 * Date: 1/18/16
 * Time: 16:26
 */
'use strict';

import "babel-polyfill";
import ReactDom from 'react-dom';
import Navigator from '../Components/Navigator';
var Pages =require('../../config/Pages');
import "../../css/reset.css"
class App extends React.Component {
    renderScene(route,navigator){
        var name=route;
        console.log(Pages);
        var Target=Pages[name];
        console.log(name);
        console.log("navigator:",Target);
        return <Target navigator={navigator} {...route.data} />;
    }
    render() {
        return (
            <Navigator 
                initialRouteStack={["index"]}
                renderScene={(route,navigator)=>this.renderScene(route,navigator)}
            />
        );
    }
}
ReactDom.render(<App/>, document.body);
