/**
 * Created by laferm on 2016/2/22.
 */
function page(path){
    return require('../js/App/'+path);
}
module.exports={ 
    index:page('main'),
    more_friend:page('MoreFriend'), 
    wei_buy:page('weibuy'),
    pay_checked:page('payChecked'),
    test:page('test'),
    navigator:page('Navigator')
};

