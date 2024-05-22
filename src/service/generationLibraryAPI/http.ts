import axios from "axios"
import instance from "../../tools/axios/instance"
import FormData from 'form-data';

class FastAPIService{
    sendMathSolutuin=async(formData:FormData):Promise<number>=>{
        try {
            console.log("send");
            
          const response=await instance.post(
                "/math_solution",
                formData
            );
            console.log(response.data);
            if(response.data!=null){
                return 0;
            }
            return -1;
        } catch (error) {
            console.log(error);
            
            return -1;
        }
    }
}

export default new FastAPIService();