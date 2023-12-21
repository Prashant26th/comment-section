
export const convertMonth = (month) => {
    switch(month) {
      case 0: return 'Jan';
      case 1: return 'Feb';     
      case 2: return 'Mar'; 
      case 3: return 'Apr';               
      case 4: return 'May';               
      case 5: return 'Jun';               
      case 6: return 'Jul';     
      case 7: return 'Aug';     
      case 8: return 'Sep';     
      case 9: return 'Oct';     
      case 10: return 'Nov';     
      case 11: return 'Dec';               
      default: return null
    }
  }

  export const convertDays = (day) => {
    const calculatedDay = day%10;
    switch(calculatedDay) {
      case 1: return `${day}st`;     
      case 2: return `${day}nd`;    
      case 3: return `${day}rd`;           
      case 4: return `${day}th`;                  
      case 5: return `${day}th`;                  
      case 6: return `${day}th`;        
      case 7: return `${day}th`;        
      case 8: return `${day}th`;        
      case 9: return `${day}th`;       
      case 0: return `${day}th`;                     
      default: return null
    }
  }