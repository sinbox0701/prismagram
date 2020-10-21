import passport from "passport";
//인증관련 일
// --> jwt token or cookie 정보 가져와서 user 정보에 serialize(저장)함
// token's information을 (express의)request에 붙여줌 (token 가져오기 --> 해독 --> 사용자 객체를 request에 추가)
import {Strategy,ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET
};

const verifyUser = async (payload,done)=>{
    try{
        const user = await prisma.user({id:payload.id})
        if(user!==null){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }catch(error){
        return done(error,false);
    }
};

export const authenticateJwt = (req,res,next) =>
 passport.authenticate("jwt",{sessions:false}, (error,user)=>{
    if(user){
        req.user = user;//verifyUser로 user를 가져온 후 user가 존재한다면 붙여줌
    }
    next();
})(req,res,next);
//{sessions:false}passport에 아무것도 입력 X
//middleware 함수, parameter --> req, res, next 

passport.use(new Strategy(jwtOptions,verifyUser));
passport.initialize();