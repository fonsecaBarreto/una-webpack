import { validate } from 'class-validator';


export const mapClassValidatorErrors = (errors: any):  Record<string, any> =>{
    const payload: any = {};
    errors.map((v: any )=>{
      let { property, constraints} =v;
      payload[property] = Object.values(constraints)[0]
    })
    return payload
  }
  
  

export const handleValidate = async (dto: any) => {
    const errors = await validate(dto)
    if (errors.length > 0) {
      return mapClassValidatorErrors(errors);
    }

}