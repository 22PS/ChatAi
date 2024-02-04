import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: '#00d0db' } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: '100%',
          borderRadius: 10,
          fontSize: 20,
          color: 'white',
        },
      }}
    />
  );
};

export default CustomizedInput;
