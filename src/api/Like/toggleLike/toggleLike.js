import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation:{
        toggleLike: async (_,args,{request}) =>{
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                    {
                        user:{
                            id: user.id
                        }
                    },
                    {
                        post:{
                            id: postId
                        }
                    }
                ]
            };
            try{
                const existingLike = await prisma.$exists.like(filterOptions);
                console.log(`existingLike ${existingLike}`)
                if(existingLike){
                    //deleteManyLikes이용 --> 내가 준 like를 찾아서 삭제
                    await prisma.deleteManyLikes(filterOptions)
                    console.log(existingLike)
                }else{
                    await prisma.createLike({
                        user:{
                            connect:{
                                id: user.id
                            }
                        },
                        post:{
                            connect:{
                                id:postId
                            }
                        }
                    });
                }
                return true;
            }catch{
                return false;
            }
        }
    }
}