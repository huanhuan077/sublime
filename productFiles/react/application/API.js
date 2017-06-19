var Http =require('./js/Core/Http');
module.exports={
    Invitation:{
        Cover:(id,attachment_id,type)=>{
            return Http.path('/invitation/'+id+'/image/'+attachment_id+'?type='+type);
        }
    },
    InvitationWish:{
        Create:(invitation_uuid,params)=>{
            return Http.post('/invitation/'+invitation_uuid+'/wish/create',params);
        }
    },
    Merchant:{
        Avatar:(id)=>{
            return Http.path('/merchant/'+id+'/avatar');
        },
        Product:{
            ImagePath:(id,attachment_id)=>{
                return Http.path('merchant/product/'+id+'/image/'+attachment_id);
            }
        }
    }
};
