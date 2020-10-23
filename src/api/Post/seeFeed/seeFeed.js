import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeFeed: async(_,__,{request,isAuthenticated}) =>{
            isAuthenticated(request);
            const {user} = request;
            const following = await prisma.user({id:user.id}).following(); 
            //내가 팔로우하는 사람
            return prisma.posts({
                where:{
                    user:{
                        id_in:[...following.map(user => user.id),user.id]
                    }
                },
                orderBy:'createdAt_DESC'
            });
            
        }
    }
}