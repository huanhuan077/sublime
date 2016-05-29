/**
 * Created by Administrator on 2016/3/23.
 */
import React from 'react';
import Item from '../components/Item';
import "../../css/item.css"
const List = (({ results, resultCount }) => (
    <div className="ui link cards">
        {resultCount > 0 ? results.map((item, index) => <Item key={index} {...item} /> ) : null}
    </div>
));

export default List;



/** WEBPACK FOOTER **
 ** ./js/components/List.js
 **/