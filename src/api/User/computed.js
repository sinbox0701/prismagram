import {prisma} from "../../../generated/prisma-client";

export default{
    //Custom Resolver
    User:{
        fullName: (parent)=>{//parent = resolver를 call한 놈 (여기서는 User)
            return `${parent.firstName} ${parent.lastName}`
        },
        isFollowing: async (parent,_,{request})=>{
            const {user} = request;
            const {id: parentId} = parent; //parent의 id를 밖으로 가져와서 parentId라는 변수를 사용
            try{
                return prisma.$exists.user({
                    AND:[
                        {
                            id:user.id
                        },
                        {
                            following_some:{
                                id:parentId
                            }
                        }
                    ]
                });
            }catch{
                //console.log(error)
                return false;
            }
        },
        isSelf: (parent,_,{request}) =>{
            const {user} = request;
            const {id:parentId} = parent;
            return user.id === parentId;
        }
    }// 여기서 Resolver를 생성했지만 다른 Resolver에서도 User{fullName} 으로 참조가능
}