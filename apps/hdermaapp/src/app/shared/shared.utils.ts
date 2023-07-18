import { environment } from "../../environments/environment";
export function GetImage(data:any) {
   if(data)
   {
    const checkdomain =  data.toLowerCase().includes('hderma')
    const checkhttp =  data.toLowerCase().includes('http')
    const result = checkhttp?data:checkdomain?`${environment.BaseImage+data}`:`${environment.BaseImage+'hderma/'+data}`
    return result
   }
   else {
     return environment.BaseImage+"hderma/assets/image/logo.png";
   }

}
export function nest(items: any[], id:any = '', link:any = 'idDM'):any {   
      if (items) {
        return items.filter((item) => item[link] == id)
          .map((item) => ({
            ...item,
            children: nest(items, item.id),
          }));
      };
}
export function convertToSlug(str:any):any {   
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[àáảạãâầấẩậẫăằắẳặẵ]/g, 'a')
    .replace(/[èéẻẹẽêềếểệễ]/g, 'e')
    .replace(/[ìíỉịĩ]/g, 'i')
    .replace(/[òóỏọõôồốổộỗơờớởợỡ]/g, 'o')
    .replace(/[ùúủụũưừứửựữ]/g, 'u')
    .replace(/[ỳýỷỵỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9-]/g, '');
}
export function sharedFunction(): void {
          // Your shared function logic goes here
}
