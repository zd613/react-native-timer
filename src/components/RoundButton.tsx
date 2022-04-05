import { Button } from "react-native"

type Props={
    onPress:(e:any)=>void
    title:string
}

const RoundButton=({onPress,title}:Props)=>{
    return (
        <Button onPress={onPress} title={title} >
        </Button>
    )
}
export default RoundButton