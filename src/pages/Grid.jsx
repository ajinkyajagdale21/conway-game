import { useState } from "react";

export const Grid = () => {
    const rows = 30;
    const cols = 30;
    const [matrix, setMatrix] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)))
    
    const makeActive = (rowIndex, colIndex) =>{
        const tempMatrix = [...matrix]
        for (let i=0; i<tempMatrix.length;i++){
            for(let j =0; j<tempMatrix[0].length;j++){
                if (i == rowIndex && j==colIndex) {
                    tempMatrix[i][j] = (!tempMatrix[i][j])
                }
            }
        }
        setMatrix(tempMatrix)
    }

    return (
        <div className="App">
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                {row.map((cellValue, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} onClick={()=>makeActive(rowIndex,colIndex)} className='cell' >
                    </div>    
                ))}
                </div>
            ))}
        </div>
  )
}
