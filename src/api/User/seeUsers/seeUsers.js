import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeUsers: async (_,args) => {
            const {id} = args;
            return prisma.user({id});
        }
    }
};