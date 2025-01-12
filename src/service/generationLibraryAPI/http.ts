import axios, { AxiosError } from "axios"
import instance from "../../tools/axios/instance"
class FastAPIService{
    sendMathSolutuin=async(formData:FormData):Promise<number>=>{
        try {
            console.log(formData);
           
      
            const response=await fetch('http://45.12.237.135/math_solution', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              if(!response.ok){
                throw new Error(`Ошибка HTTP: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
              
            return 0;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    sendParafraseText=async(formData:FormData):Promise<string>=>{
        try {
            console.log(formData);
            const response=await fetch('http://45.12.237.135/paraphrasing_text', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              if(!response.ok){
                throw response;
              }
              const data = await response.json();
              if(data["status_code"]==400){
                return "er/"+data["message"]
              }
              if(data["data"]){
                return data["data"];
              }
              console.log(data);
            return "";
        } catch (error) {
            if(error instanceof Response){
                const er=await error.json()
                console.log(er["detail"]);
                
            }
            return "";
        }
    }
    sendReferat=async(formData:FormData):Promise<number>=>{
        try {
            console.log("send");
            const response=await fetch('http://45.12.237.135/abstract_generation', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              if(!response.ok){
                throw new Error(`Ошибка HTTP: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
          
            return 0;
        } catch (error) {
            console.log("error");
            console.log(error);
            
            return -1;
        }
    }
    sendEssay=async(formData:FormData):Promise<string>=>{
        try {
            console.log("send");
            const response=await fetch('http://45.12.237.135/composition_generation', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              if(!response.ok){
                throw new Error(`Ошибка HTTP: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
              if(data["status_code"]==400){
                return "er/"+data["message"]
              }
              if(data["data"]){
                return data["data"];
              }
            return "";
        } catch (error) {
            console.log("error");
            console.log(error);
            
            return "";
        }
    }
    sendPresentation=async(formData:any):Promise<number>=>{
        try {
            console.log(formData);
            const response=await fetch('http://31.129.106.28:8000/presentation_generation', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              if(!response.ok){
                console.log("err pre");
                
                throw response;
              }
              const data = await response.json();
              console.log(data);
          
            return 0;
        } catch (error) {
          console.log(error);
          
          if(error instanceof Response){
            const er=await error.json()
            console.log(er["detail"][0]["loc"]);
            
        }
            
            return -1;
        }
    }
    sendReduce=async(formData:FormData):Promise<string>=>{
        try {
            console.log("send");
            const response=await fetch('http://45.12.237.135/abbreviation_of_text', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              console.log(response);
              if(!response.ok){
                throw  response;
              }
              
              
              const data = await response.json();
              console.log("fdfdfd");
              if(data["status_code"]==400){
                return "er/"+data["message"]
              }
              console.log(data);
              if(data["data"]){
                return data["data"];
              }
            return "";
        } catch (error) {
            if(error instanceof Response){
                try {
                  const er=await error.json()
                  console.log(er["detail"][0]["loc"]);
                } catch (error) {
                  
                }
                
            }
            console.log("error");
            console.log(error);
            
            return "";
        }
    }
    sendSovet=async(formData:FormData):Promise<string>=>{
        try {
            console.log("send");
            const response=await fetch('http://45.12.237.135/advice_generation', {
                method: 'POST',
                headers: {
                },
                body: formData,
              })
              if(!response.ok){
                throw response;
              }
              const data = await response.json();
              console.log(data);
              if(data["status_code"]==400){
                return "er/"+data["message"]
              }
              if(data["data"]){
                return data["data"];
              }
            return "";
        } catch (error) {
            if(error instanceof Response){
                const er=await error.json()
                console.log(er["detail"][0]["loc"]);
                
            }
          
            
            return "";
        }
    }
    generation=async(formData:FormData):Promise<string>=>{
      try {
          console.log("send");
          const response=await fetch('http://45.12.237.135/image_generation', {
              method: 'POST',
              headers: {
              },
              body: formData,
            })
            if(!response.ok){
              throw response;
            }
            const data = await response.json();
              console.log(data);
              
              if(data["status_code"]==400){
                return "er/"+data["message"]
              }
              if(data["data"]){
                return data["data"];
              }
              return "";
      } catch (error) {
          if(error instanceof Response){
              const er=await error.json()
              console.log(er["detail"][0]["loc"]);
              
          }
        
          
          return "";
      }
  }
}

export default new FastAPIService();