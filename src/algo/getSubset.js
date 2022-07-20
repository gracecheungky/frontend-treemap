export default function getSubset(value, xs) {
    let b = Math.round(2*value);
    let cols = [];
    cols[0] = [];

    xs.forEach((xi)=>{
        for(let s = b-xi-1; s >= 0; s--) {
          if(!Boolean(cols[Math.round(s+xi)]) && Boolean(cols[Math.round(s)])) {
              let cln = cols[Math.round(s)].slice();
              cln = [...cln, xi];
              cols[s+xi] = cln;
          }
        }
      })
        for(let d = 0; d < value; d++) {
            if(Boolean(cols[Math.round(value-d)])) {
                return cols[Math.round(value-d)];
            } else if (Boolean(cols[Math.round(value+d)])){
                return cols[Math.round(value+d)];
            }
        }
        return cols[0];
        
  }