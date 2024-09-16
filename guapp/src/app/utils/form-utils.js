export class FormUtils{
    static extractJson(element){

      const formData = new FormData(element);

      const data = {};

      formData.forEach((value,key)=>{
        data[key] = value.valueOf();
      });

      return data;
    }
}