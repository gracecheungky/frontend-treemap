import { useState, useEffect } from 'react';
import { Grid, Box, TextField, Button } from "@mui/material";
import NavBar from './components/NavBar';
import genRectangles from './algo/genRectangles';
import './css/App.css';

function App() {
  const [rowNum, setRowNum] = useState(0);
  const [data, setData] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [rowError, setRowError] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(()=>{
    setRectangles([]);
    setIsFormValid(!(Boolean(rowError)||Boolean(dataError)));
  },[rowNum, data, rowError, dataError])
  
  const isJsonString = (str) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }

  const isValidJson = (datas) => {
    return !datas.some((data) =>
        data.name.length >= 50 || typeof(data.name) !== 'string' || !Number.isInteger(data.weight) || data.name === '' || data.name === null
    )
  }

  const formValidatoin = () => {
    if (isJsonString(data)) {
      if (!(isValidJson((JSON.parse(data))) && JSON.parse(data).length <= 50)){
        setDataError('Please enter valid JSON');
      } else {
        setDataError(null);
      }

      if (!(Number.isInteger(Number(rowNum)) && rowNum > 0 && rowNum <= JSON.parse(data).length)){
        setRowError('Please enter a valid Row Number');
      } else {
        setRowError(null);
      }
    } else {
      setDataError('Please enter valid JSON');
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    formValidatoin();
    if (isFormValid) {
      const totalWeight = JSON.parse(data)?.reduce(
        (total, obj) => obj.weight + total,0
      );
      const rowWeight = Math.round(totalWeight/rowNum);
      const allWeights = JSON.parse(data)?.map(x => x.weight);
      const limit = JSON.parse(data).length - rowNum;
      setRectangles(genRectangles(rowNum, totalWeight, allWeights, rowWeight, JSON.parse(data), limit));
    }
  };

  console.log('rectangles: ',rectangles);
  return (
    <div className="App">
      <NavBar/>
      <Grid container spacing={4} p={3}>
        <Grid item xs={3}>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              className="textarea"
              fullWidth
              required
              id="data"
              name="data"
              label="Array of Data (JSON)"
              multiline
              variant="outlined"
              error={Boolean(dataError)}
              helperText={Boolean(dataError) && dataError}
              onChange={(e) => setData(e.target.value)}
              data-testid="json-input"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="rows"
              label="Number of rows"
              name="rows"
              error={Boolean(rowError)}
              helperText={Boolean(rowError) && rowError}
              data-testid="rows-input"
              onChange={(e) => setRowNum(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid="submit-button"
            >
              Generate
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>

            {
              isFormValid && 
              Array.from({ length: rowNum }, (_, i) => (
                <Grid container>
                  {
                    Array.from({ length: rectangles[i]?.length }, (_, j) => (
                      <Grid item xs={rectangles[i][j]?.width} className='rectangles' sx={{ backgroundColor:(rectangles[i][j]?.value<0?'#FFCCCB':'#CCFFCD')}} key={rectangles[i][j]?.name}>
                          {rectangles[i][j]?.name} <br/>
                          {parseFloat(rectangles[i][j]?.value * 100).toFixed(2)}%
                      </Grid>
                    ))
                  }
                  </Grid>
              ))

            }

        </Grid>
      </Grid>
    </div>
  );
}
export default App;
