
function Formatter(mix) {
    
    if (mix == null) 
        return '';
    
    switch(typeof mix){
        
        case 'string':
            return str_format.apply(null, arguments);
        
        case 'number':
            return number_format.apply(null, arguments);
        
        case 'object':
            if (is_Date(mix)) 
                return date_format.apply(null, arguments);
            
            return mix.toString.apply(mix, Array.prototype.slice.call(arguments, 1));
        
        default:
            return '';
    };
}

Formatter.formatNumber = number_format;
Formatter.formatString = str_format;
Formatter.formatDate = date_format;

if (mask != null) {
    mask.registerUtil('format', {
        arguments: 'parsed',
        process: Formatter
    });
}