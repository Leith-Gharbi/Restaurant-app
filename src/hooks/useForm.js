import React, { useState } from 'react';

export  function UseForm(getFreshModelObject) {
  const [values, setValues] = useState(getFreshModelObject());
  const [errors, setErrors] = useState({});
  const handelInputChange = (e) => {
    const { name, value } = e.target;
console.log(e.target.name+" = ",e.target.value);
    setValues({ ...values, [name]: value });
    console.log({ ...values, [name]: value })
  };
  const resetFormContols =()=>{
      setValues(getFreshModelObject());
      setErrors({});

  }
  return {values,setValues,errors,setErrors,handelInputChange,resetFormContols};
}
