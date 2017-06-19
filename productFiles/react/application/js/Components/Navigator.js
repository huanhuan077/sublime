/**
 * Created by laferm on 2016/2/22.
 */
'use strict';

export default class Navigator extends React.Component{
    state={ routes:[this.props.initialRouteStack]};
    static defaultProps={
        initialRouteStack:null
    };
    push(route){
        console.log('navigator:push',this.state.routes.concat([route]));
        this.setRoutes(this.state.routes.concat([route]));
    }
    setRoutes(routes){
        this.setState({routes:routes});
    }
    pop(){
        if(this.state.routes.length<1)return;
        this.setRoutes(this.state.routes.slice(0,-1));
    }
    render() {
        return this.props.renderScene(this.state.routes[this.state.routes.length-1],this);
    }
}
