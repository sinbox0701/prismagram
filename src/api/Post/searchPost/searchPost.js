import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        searchPost: async(_,args) => 
            prisma.posts({
                where:{
                    OR:[
                        {location_starts_with:args.term},
                        {caption_starts_with:args.term}
                    ]
                } 
            })//검색 단어가 포함된 것이 아닌 그거로 시작하는 단어로 찾기
    }
};