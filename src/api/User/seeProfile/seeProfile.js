import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeProfile: async (_,args) => {
            const {id} = args;
            //return prisma.user({id});
            const user = await prisma.user({id}).posts();
            return{
                user,
                posts
            }
        }
    }
};