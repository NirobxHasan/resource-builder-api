import { Injectable } from '@nestjs/common';
import  {PassportStrategy} from '@nestjs/passport'
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors(  [AtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),]) ,
            secretOrKey:'at-strategy'
        })
    }


    

    private static extractJWT(req: Request): string | null{
        // console.log('cokkiessssssss',req.cookies)
        if(req.cookies && 'access_token' in req.cookies && req.cookies['access_token'].length>0){
            return req.cookies['access_token']
        }
        return null
    }

    validate(payload:any){
        console.log(payload)
        return payload
    }
}