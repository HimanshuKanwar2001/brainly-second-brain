export interface ButtonProps{
  varaint:"primary"| "secondary";
  size:"sm"| "md" | "lg";
  text:string;
  startIcon: any;
  endIcon:any;
  onClick:()=>void;

}
 
export  const Button = (props:ButtonProps) => {
  return (
    <button></button>
  )
}

export default Button

<Button varaint="primary" size="md" onClick={} text={}></Button>