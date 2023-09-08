import React, { useEffect, useState } from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

export interface IJ_TextFieldProps extends BaseTextFieldProps {
  name?: string;
  defaultV?: string;
}

export const J_TextField: React.FC<IJ_TextFieldProps> = ({ name, defaultV, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultV);
  console.log('J_TextField', name, fieldName, defaultValue, value);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => {
        setValue(newValue);
      }
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      name={name}
      {...rest}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        setValue(e.target.value);
        error && clearError();
      }}
      error={!!error}
      helperText={error}
      variant='filled'
      size='small' fullWidth
    />
  );
};
