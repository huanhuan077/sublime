/**
 * Created by Administrator on 2016/3/23.
 */
import React from 'react';
import moment from 'moment';
import { getKind } from '../vender/utils';
import "../../css/item.css"
const Item = (({
    trackPrice,
    collectionPrice,
    price,
    trackViewUrl,
    collectionViewUrl,
    artworkUrl100,
    trackName,
    collectionName,
    kind,
    artistName,
    longDescription,
    description,
    releaseDate
    }) => (
    <a className="ui card" href={trackViewUrl || collectionViewUrl} target="_blank">
        <div className="image">
            <img src={artworkUrl100.replace('100x100', '1200x1200')} />
        </div>
        <div className="contents">
            <div className="headers">{trackName || collectionName}</div>
            <div className="meta-right floated">
                {getKind(kind)}
            </div>
            <div className="meta">
                {artistName}
            </div>
            <div className="description">
                {longDescription || description}
            </div>
        </div>
        <div className="extra-contents">
      <span className="right floated">
        Release on {moment(releaseDate).format('MMM DD, YYYY')}
      </span>
            {typeof trackPrice || collectionPrice || price === 'number' ?
                <span>
          <i className="fa fa-usd "></i>
                    {trackPrice || collectionPrice || price}
        </span> : null
            }
        </div>
    </a>
));

export default Item;



/** WEBPACK FOOTER **
 ** ./js/components/Item.js
 **/