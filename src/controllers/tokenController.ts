import { Request, Response } from 'express';


type ControllerFunction = (req: Request, res: Response) => void;

class TokenController {


     createUser:ControllerFunction=async(req, res) => {
        try {
          // console.log(req.body);
          
          // const body:CreateUserDTO =req.body as CreateUserDTO; 
          // if(body.pass.length<8||body.login.length<5){
          //   console.warn("invalid data reg");
            
          //   return res.status(400).json("invalid data");
          // }
          // const tokens = await this.userService.createUser(body);
          res.send("tokens");
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      

      
}

export default new TokenController()
