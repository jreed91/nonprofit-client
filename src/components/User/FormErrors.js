import React from 'react';

import { Container, Message} from 'semantic-ui-react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <Message 
          error 
          header='Please Fix the Errors below'
          content={fieldName + formErrors[fieldName]}
           />
        )        
      } else {
        return '';
      }
    })}
  </div>