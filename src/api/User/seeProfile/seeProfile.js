import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        seeProfile: (_,args,{request}) => {
            const {id} = args;
            return prisma.user({id});
        }
    }
};