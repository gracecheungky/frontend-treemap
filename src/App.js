import { Grid, Box, TextField, Button, TextareaAutosize } from "@mui/material";
import NavBar from './components/NavBar';
import getSubset from './algo/getSubset';
import './css/App.css';

function App() {
  let mockJson = [
      {  "name": "A", "weight": 3, "value": -0.02 },
      {  "name": "B", "weight": 3, "value": 0.05 },
      {  "name": "C", "weight": 6, "value": 0.015 },
      {  "name": "D", "weight": 2, "value": -0.01 },
      {  "name": "E", "weight": 3, "value": 0.01 },
      {  "name": "F", "weight": 3, "value": 0.01 },
      {  "name": "G", "weight": 3, "value": 0.01 },
      {  "name": "H", "weight": 3, "value": 0.01 },
      {  "name": "I", "weight": 3, "value": 0.01 },
      {  "name": "J", "weight": 64, "value": 0.01 },
      {  "name": "K", "weight": 25, "value": 0.01 },
      {  "name": "L", "weight": 8, "value": 0.01 }
  ];

  const mockJsonStr = JSON.stringify(mockJson);
  const mockRowNum = 3;

  const totalWeight = mockJson.reduce(
    (total, obj) => obj.weight + total,0
  );
  const rowWeight = totalWeight/mockRowNum;
  let allWeights = mockJson.map(x => x.weight);


  let rectangles = [], existRectNames = [];
  for (let i=0;i<mockRowNum;i++){
    let result = getSubset(rowWeight,allWeights);
    if (result.length){ 
      let tempRect = [];
      for (const el of mockJson){
        if (result.includes(el.weight) && tempRect.length !== result.length && !existRectNames.includes(el.name)) {
          let rectWidth = parseInt(el.weight/totalWeight*mockRowNum*12)
          tempRect = [...tempRect, {name:el.name, value:el.value,width: rectWidth}];
          existRectNames = [...existRectNames, el.name];
        }
      }
      rectangles = [...rectangles,tempRect];
    }
    result.forEach((el) => {
      const index = allWeights.indexOf(el);
      if (index > -1) allWeights.splice(index, 1); 
    })
  }

  console.log('rectangles: ',rectangles);
  const submitHandler = (event) => {
    event.preventDefault();
  };

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
              placeholder="Placeholder"
              multiline
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="rows"
              label="Number of rows"
              name="rows"
              // onChange={(e) => setUsername(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Generate
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container>

            {
              Array.from({ length: mockRowNum }, (_, i) => (
                  Array.from({ length: rectangles[i].length }, (_, j) => (
                    
                    <Grid item className='rectangles' xs={rectangles[i][j].width} sx={{ backgroundColor:(rectangles[i][j].value<0?'#FFCCCB':'#CCFFCD') }} key={rectangles[i][j].name}>
                      <Box >
                        {rectangles[i][j].name} <br/>
                        {rectangles[i][j].value * 100}%
                      </Box>
                    </Grid>
                  ))
              ))
            }
          </Grid>
        {/* <Container >
        
          <Box sx={{ bgcolor: '#cfe8fc', height: '80vh',width:'51%' }} />
          <Box sx={{ bgcolor: '#000000', height: '80vh',width:'51%' }} />
        </Container> */}
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
