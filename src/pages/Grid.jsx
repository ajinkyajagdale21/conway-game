import { useEffect, useState } from "react";

export const Grid = () => {
    const rows = 30;
    const cols = 30;
    const initializeMatrix = () => {
        const matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
        [ [2, 1],[3, 1],[4, 1],
          [3, 2],[2, 3],[3, 3],
          [4, 3],[2, 5],[3, 5],[4,5]  
        ].forEach(([row, col]) => {
            matrix[row][col] = 1;
        });
        return matrix;
    };
    const [matrix, setMatrix] = useState(initializeMatrix())
    const [isStarted,setIsStarted]= useState(false)
      
    const makeActive = (rowIndex, colIndex) =>{
        const tempMatrix = [...matrix]
        for (let i=0; i<tempMatrix.length;i++){
            for(let j =0; j<tempMatrix[0].length;j++){
                if (i == rowIndex && j==colIndex) {
                    if(tempMatrix[i][j] == 1){
                        tempMatrix[i][j] = 0
                    }
                    else{
                        tempMatrix[i][j] = 1
                    }
                }
            }
        }
        setMatrix(tempMatrix)
    }

    const gameStatus = () =>{
        setIsStarted(prev => !prev)
    }

    const activeNeighboursFunc = (currMat, rowIndex, colIndex) => {
        let count = 0;
        const directions = [
            [0, 1], [0, -1], [1, 0], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];

        for (let [dx, dy] of directions) {
            const newRow = rowIndex + dx;
            const newCol = colIndex + dy;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += currMat[newRow][newCol];
            }
        }
        return count;
    };

    const resetGame = () => {
        setMatrix(initializeMatrix);
        setIsStarted(false);
    };

    const updateMatrix = () => {
        setMatrix(prevMatrix => {
            let hasActiveCell = false;
            const newMatrix = prevMatrix.map((row, rowIndex) => row.map((cell, colIndex) => {
                const activeNeighbours = activeNeighboursFunc(prevMatrix, rowIndex, colIndex);
                let newCellState = cell;
                if (cell === 0 && activeNeighbours === 3) {
                    newCellState = 1;
                } else if (cell === 1 && (activeNeighbours === 2 || activeNeighbours === 3)) {
                    newCellState = 1;
                } else if (cell === 1 && activeNeighbours < 2) {
                    newCellState = 0;
                } else if (cell === 1 && activeNeighbours >= 4) {
                    newCellState = 0;
                }
                if (newCellState === 1) {
                    hasActiveCell = true;
                }
                return newCellState;
            }));
    
            if (!hasActiveCell) {
                setIsStarted(false);
            }
    
            return newMatrix;
        });
    };
    

    useEffect(() => {
        let intervalId;
    
        if (isStarted) {
          intervalId = setInterval(() => {
            updateMatrix()
          }, 1000);
        } else {
          clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
      }, [isStarted]);

    return (
        <div className="App">
            <div className="gameLayout">
            <div className="btnLayout">
            <button className="btn" onClick={gameStatus}>{isStarted? "Stop" : "Start"}</button>
            <button className="btn" onClick={resetGame}>Reset</button>
            </div>    
            <div>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                {row.map((cellValue, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} onClick={()=>makeActive(rowIndex,colIndex)} className={`cell`} style={{ backgroundColor: cellValue === 1 ? 'yellow' : '' }} >
                    </div>    
                ))}
                </div>
            ))}
            </div>
            </div>
        </div>
  )
}
