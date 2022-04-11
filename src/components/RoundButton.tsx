import { Button } from "react-native"

type Props={
    onPress:(e:any)=>void
    title:string
    disabled?:boolean
}

const RoundButton=({onPress,title,disabled}:Props)=>{
    return (
        <Button onPress={onPress} title={title} disabled={disabled===undefined?false: disabled} >
        </Button>
    )
}
export default RoundButton