import React, {useState} from 'react'

export default function QuadraticForm (){
  const [inputValues, setInputValues] = useState(
    {
      aValue: 0,
      bValue: 0,
      cValue: 0,
      d: ''
    });
    
    function handleChange(event){
      setInputValues(prevInputValues => {
        return {
          ...prevInputValues,
          [event.target.name]: event.target.value
        }
      })
    }

    let x1 = 0
    let x2 = 0

    function handleSolve(){ 
      let descriminant = Math.pow(inputValues.bValue, 2) - (4 * inputValues.aValue * inputValues.cValue)
      let message = document.getElementById("result")

      if ((inputValues.aValue > 0 || inputValues.aValue < 0) && (inputValues.bValue > 0 || inputValues.bValue < 0) && 
          (inputValues.cValue > 0 || inputValues.cValue < 0)) {
        if (descriminant > 0){
          x1 = (-inputValues.bValue + Math.sqrt(Math.abs(descriminant))) / (2 * inputValues.aValue)
          x2 = (-inputValues.bValue - Math.sqrt(Math.abs(descriminant))) / (2 * inputValues.aValue)
          
          setInputValues(prevValues => {
          return{
            ...prevValues,
            d: 'The equation has 2 distinct real roots'
          }
          })
          message.innerHTML = `x1 = ${x1.toFixed(3)}  x2 = ${x2.toFixed(3)}`
        }
        if (descriminant == 0) {
          x1 = -inputValues.bValue / (2 * inputValues.aValue)
          x2 = x1
          setInputValues(prevValues => {
            return{
              ...prevValues,
              d: 'The equation has one Real root'
            }
          })
          message.innerHTML = `x1 = x2 = ${x1.toFixed(3)}`
        }
        if (descriminant < 0){
          x1 = `-${Math.abs(inputValues.bValue)} + i${Math.sqrt(Math.abs(descriminant)).toFixed(3)} / ${(2 * inputValues.aValue)}`
          x2 = `-${Math.abs(inputValues.bValue)} - i${Math.sqrt(Math.abs(descriminant)).toFixed(3)} / ${(2 * inputValues.aValue)}`
          setInputValues(prevValues => {
            return{
              ...prevValues,
              d: 'Complex roots'
            }
          })
          message.innerHTML = `x1 = ${x1} -- or -- x2 = ${x2}`
        }

        return message
      } else {
        message.innerHTML = "one or more input might be empty!"
      }
    }

  return (
    <div className='app--grid'>
        <div className='grid--item1 input--form'>
          <div className="input--grid">
            <div>
              <input 
                  className='input_fields'
                  type="number" 
                  placeholder='The value of a'
                  name='aValue'
                  value={inputValues.aValue} 
                  onChange={handleChange}/>
            </div>

            <div>
              <input 
                  className='input_fields'
                  type="number" 
                  placeholder='The value of b'
                  name='bValue'
                  value={inputValues.bValue} 
                  onChange={handleChange}/>
            </div>

            <div>
              <input 
                  className='input_fields'
                  type="number" 
                  placeholder='The value of c'
                  name='cValue'
                  value={inputValues.cValue} 
                  onChange={handleChange}/>
            </div>
            <div> <button className='input_fields' onClick={handleSolve}> Solve </button></div>
          </div> 
        </div>
    

        <div className='app--grid--item2 result--screen'>
          <h4>{inputValues.aValue && (inputValues.aValue == 0 ? 0 : (inputValues.aValue == 1 ? 
                <span style={{paddingRight: 4}}>x<sup>2</sup> + </span> : 
                <span style={{paddingRight: 4}}>{inputValues.aValue}x<sup>2</sup> + </span> ))
              } 
            {inputValues.bValue && (inputValues.bValue == 1 ? 'x + ' : `${inputValues.bValue}x + `)} 
            {inputValues.cValue} 
          </h4>
          <p>{inputValues.d}</p>
          <p id="result"></p>  
        </div>
        
    </div> //end grid container
  )
}
