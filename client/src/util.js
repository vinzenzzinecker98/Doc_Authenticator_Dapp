export const toClip=(s)=>{
    //Create temporary textarea
  var el = document.createElement('textarea');
   // Assign String 
   el.value = s;
   // Hide it
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select it
   el.select();
   // Copy to Clipboard
   document.execCommand('copy');
   // Delete the child
   document.body.removeChild(el);
  }


export const checkMetamask = (self) =>  {
    var web3=self.props.drizzle.web3;
    if (typeof web3 !== 'undefined') {
      //console.log('web3 is enabled');
      if (web3.currentProvider.isMetaMask === true) {
        
        //console.log('MetaMask is active');
        return true;
      } else {
        //console.log('MetaMask is not available');
        return false;
      }
    } else {
      //console.log('web3 is not found');
      return false;
    };
  }