import React from 'react'
//this simply returns a box, **bas ek dabba de raha hai**
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container