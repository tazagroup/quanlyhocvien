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
export function nest(items: any[], id:any = '', link:any = 'pid'):any {
      if (items) {
        return items.filter((item) => item[link] == id)
          .map((item) => ({
            ...item,
            children: nest(items, item.id),
          }));
      };
}
export function sharedFunction(): void {
          // Your shared function logic goes here
}
