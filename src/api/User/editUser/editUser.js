import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        editUser: async (_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {username,email,firstName,lastName,bio,avatar} = args;
            const {user} = request;
            return prisma.updateUser({
                where:{id:user.id},
                data:{username,email,firstName,lastName,bio,avatar}
            });//return문에는 await할 필요X ==> 마지막 구문이라서 어차피 기다림
        }
    }
};