import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default{
    Query:{
        me: async (_,__,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            ///
            const userProfile = await prisma.user({id:user.id})
            const posts = await prisma.user({id:user.id}).posts();
            return {
                user:userProfile,
                posts
            };
            //return prisma.user({id:user.id}).$fragment(USER_FRAGMENT);
            //fragment를 사용하면 fragement에 지정한 관계 아니면 데이터 불러올 수 X
        }
    }
};