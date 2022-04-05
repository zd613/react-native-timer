import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputBase, View } from 'react-native';
import RoundButton from './src/components/RoundButton';

export default function App() {
  const [isRunning,setIsRunning]=useState(false)
  const [inputValue,setInputVaelu]=useState('0')
  const [seconds,setSeconds]=useState(0)


  const handlePauseClick=()=>{
    setIsRunning(false)
  }

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
    setSeconds(0);
    clearInterval(intervalId)
  }
  const handleInputChange=(e:any)=>{
    const v=e.target.value
    setInputVaelu(v)

    // TODO: validation

    setSeconds(e.target.value)
  }

  return (
    <View style={styles.container}>

      {!isRunning&&(
        <TextInput value={inputValue}  onChange={handleInputChange}  keyboardType="numeric"  style={styles.inputField} />
      )}

      {isRunning && (
        <Text>  {seconds} s</Text>
      )}



      <View style={styles.buttonContainer}>
        <RoundButton title='キャンセル' onPress={handleCancelClick} />

        {isRunning?<RoundButton title='一時停止' onPress={handlePauseClick}/>:<RoundButton title='開始' onPress={handleStartClick} />}
      </View>

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
  buttonContainer:{
    flexDirection:'row',
  },
  inputField:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:4,
    
  }
});
