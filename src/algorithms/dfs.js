// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
const toreturnnodes=[];
export function dfs(grid, startNode, finishNode) {
  
    
   // startNode.distance = 0;
    
    dfsHelper(grid,startNode,startNode,finishNode,toreturnnodes);
    return toreturnnodes;
    
  }
  
  function dfsHelper(grid,curNode, startNode, finishNode,toreturnnodes) {
    if(curNode===finishNode){
        return true;
    }
    if (curNode.isWall) return false;
    if(curNode.isVisited){
        return false;
    }
    toreturnnodes.push(curNode)
    curNode.isVisited=true;
    let nbrs=getUnvisitedNeighbors(curNode,grid)
    let ans=false;
    updateUnvisitedNeighbors(curNode, grid);
    for(const nbr of nbrs){
      let val=dfsHelper(grid,nbr,startNode,finishNode,toreturnnodes);
      if(val){
        ans=true;
        break;
      }
    }
    return ans;  
  }
  
 
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
    //  neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);

    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

    if (col > 0) neighbors.push(grid[row][col - 1]);

    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPath(finishNode) {
    const nodesInShortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
  }