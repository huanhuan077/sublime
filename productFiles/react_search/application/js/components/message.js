/**
 * Created by Administrator on 2016/3/23.
 */
import React from 'react';
import classnames from 'classnames';
import "../../css/Message.css"
const Message = (({ iconColor, icon, headerMsg, bodyMsg }) => (
    <div className={classnames('ui', 'icon', 'message', iconColor)}>
        <i className={classnames('fa fa-question', icon)}></i>
        <div className="content">
            <div className="head">{headerMsg}</div>
            <p>{bodyMsg}</p>
        </div>
    </div>
));

export default Message;



/** WEBPACK FOOTER **
 ** ./js/components/Message.js
 **/