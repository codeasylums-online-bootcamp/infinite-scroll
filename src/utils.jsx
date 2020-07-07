export const isPageEndReached=function(){
  
    const documentHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    // Fetch the next batch of transactions when the user reaches the bottom of the current list.
    
    if ((window.innerHeight + window.scrollY) >= (documentHeight)){
      return true
    }
    return false
  }
  