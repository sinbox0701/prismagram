import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        sendMessage: async (_,args,{request, isAuthenticated}) =>{
            isAuthenticated(request);
            const {roomId, message, toId} = args;
            const {user} = request;
            let room;
            if(roomId === undefined){//RoomId가 없다면 새로 생성하고 fragment 추가
                if(user.id!==toId){
                    room = await prisma.createRoom({
                        participants:{
                            connect:[
                                {
                                    id:toId
                                },//sender
                                {
                                    id:user.id
                                }//receiver
                            ]
                        }
                    });
                }
            }else{//roomId가 있다면
                room = await prisma.room({id:roomId});
            }
            if(!room){//Room을 생성 혹은 찾기에 실패할 경우 에러
                throw Error("Room not found");
            }
            const getTo = room.participants.filter(//본인을 제외한 Room의 참가자 확인
                participant => participant.id !== user.id
            )[0];
            return prisma.createMessage({
                text:message,
                from:{
                    connect:{
                        id:user.id
                    }
                },
                to:{
                    connect:{
                        id:roomId?getTo.id:toId
                    }
                },
                room:{
                    connect:{
                        id:room.id
                    }
                }
            })
        }
    }
}