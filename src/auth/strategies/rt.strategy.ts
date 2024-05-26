import  {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import {Request} from 'express'
import { Injectable } from '@nestjs/common';


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors(  [RtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),]) ,
            secretOrKey:'rt-strategy',
            passReqToCallback:true
        })
    }


    private static extractJWT(req: Request): string | null{
        // console.log('cokkiessssssss',req.cookies)
        if(req.cookies && 'refresh_token' in req.cookies && req.cookies['refresh_token'].length>0){
            return req.cookies['refresh_token']
        }
        return null
    }



    

    validate(req: Request,payload:any){

        const refreshToken = req.cookies['refresh_token']? req.cookies['refresh_token']: req.get('authorization').replace('Bearer','').trim();
        // const refreshToken = req.get('authorization').replace('Bearer','').trim();
        return {...payload, refreshToken}
    }
}