import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import RoundButton from './src/components/RoundButton';
import * as yup from "yup"

const schema=yup.object().shape({
  time:yup.number().required().positive().integer()
})

export default function App() {
  const [isRunning,setIsRunning]=useState(false)
  const [inputValue,setInputVaelu]=useState('0')
  const [inputError,setInputError]=useState(false)

  const [seconds,setSeconds]=useState(0)

  useEffect(()=>{
    if(isRunning){

      if(seconds===0){
        setIsRunning(false)
        console.log(intervalId)
        clearInterval(intervalId)
      }
    }
  },[isRunning,seconds])

  const [intervalId,setIntervalId]=useState<any>(null)
  const handleStartClick=()=>{
    setIsRunning(true)
    
    if(intervalId!==null){
      clearInterval(intervalId)
    }
    const callback=()=>{
      setSeconds(s=>{
        return s-1
      })
    }
    const iid=setInterval( callback,1000)
    setIntervalId(iid)
  }

  // キャンセルボタンクリック時
  const handleCancelClick=()=>{
    setIsRunning(false)
    setSeconds(parseInt(inputValue));
    clearInterval(intervalId)
  }

  // 入力が変更した時
  const handleInputChange=async(e:any)=>{
    setInputError(false)
    const v=e.target.value
    setInputVaelu(v)

    // validation
    const valid=await schema.isValid({
      time: v
    })
    if(!valid){
      setInputError(true)
      return
    }

    setSeconds(v)
  }

  return (
    <View style={styles.container}>

      {!isRunning&&(
        <TextInput value={inputValue}  onChange={handleInputChange}  keyboardType="numeric"  style={styles.inputField} />
      )}
      {(!isRunning&&inputError ) &&(
        <Text style={{color:'red'}}>整数値を入力してください。</Text>
      )}

      {isRunning && (
        <Text style={{fontSize:32}}>  {seconds} s</Text>
      )}



      {isRunning? <RoundButton title='キャンセル' onPress={handleCancelClick} /> : <RoundButton title='開始' onPress={handleStartClick} />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:4,
  }
});
