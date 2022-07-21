import getSubset from './getSubset';

export default function genRectangles (rowNum, totalWeight, allWeights, rowWeight, data){
    let rects = [], existRectNames = [];
    // console.log(allWeights.length, 'rowNum:',rowNum);
    let limit = allWeights.length - rowNum + 1;
    for (let i=0;i<rowNum;i++){
      // if (allWeights.length <= rowNum - 1) limit = 0;
      // console.log(allWeights.length,'allWeights.length');
      // Get combinations in which sum of the weight is clearest to rowWeight
      let subset = getSubset(rowWeight,allWeights,limit);
      if (subset.length){ 
        let tempRect = [], tempSubset = [...subset];
        for (const el of data){
          // Avoid duplication of rectangles
          if (tempSubset.includes(el.weight) && !existRectNames.includes(el.name)) {
            // let rectWidth = (el.weight/totalWeight*rowNum)*100+'%';
            let rectWidth = parseInt(el.weight/totalWeight*rowNum*12);
            tempRect = [...tempRect, {name:el.name, value:el.value,width: rectWidth}];
            existRectNames = [...existRectNames, el.name];

            // Remove elements that was added to rects from temp subset --> won't duplicate weight in rects
            const index = tempSubset.indexOf(el.weight);
            if (index > -1) tempSubset.splice(index, 1); 
          }
        }
        rects = [...rects,tempRect];
      }

      // Remove elements that was added to rects from allWeight
      subset.forEach((el) => {
        const index = allWeights.indexOf(el);
        if (index > -1) allWeights.splice(index, 1); 
      })
    }
    return rects;
}