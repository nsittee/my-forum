import React, {useState} from 'react';
import Forum from './Forum'

const Forums = (props) => {
  
  const [titlesList, setTitlesList] = useState(['A1', 'A2', 'A3', 'A4', 'A5'])
  

  let contents = titlesList.forEach(title => {
    return(
      <div>
        <p>Example</p>
        <Forum title={title}/>
      </div>
      
    )
  })

  return (
    <div> {contents}</div>
  )
}

export default Forums;
