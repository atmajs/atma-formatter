var is_Number,
    is_Date
    ;

(function(){
    
    is_Number = function(x){
        return typeof x === 'number' && !isNaN(x);
    };
    
    is_Date = function(x){
      
        return x != null
            && typeof x === 'object'
            && typeof x.toUTCString === 'function'
            && typeof x.constructor.UTC === 'function'
            ;
        
    };
    
}());