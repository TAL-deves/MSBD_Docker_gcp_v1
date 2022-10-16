import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Typography } from '@mui/material';



const PaymentHistory = () => {
    const [value, setValue] = React.useState([null, null]);
    return (
        <div>
            <Typography variant="h4" sx={{paddingLeft:"50%", marginTop:"2%"}}>Payment history</Typography>
            <Box sx={{paddingLeft:"45%", marginTop:"2%", marginBottom:"10%"}}>
            <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'Check-in', end: 'Check-out' }}
    >
      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </Box>
        </div>
    );
};

export default PaymentHistory;