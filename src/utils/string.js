
var str_format;

(function(){
    
    str_format = function(str /* ... args */){
        var out = '',
            i = 0,
            last = 0;
            
        while ((i = str.indexOf('{', i)) !== -1){
            
            if (i > 0 && str.charCodeAt( i - 1) === 92 /* \ */) {
                
                out += str.substring(last, i - 1) + '{';
                last = i + 1;
                continue;
            }
            
            out += str.substring(last, i);
            last = i + 1;
            i = str.indexOf('}', i);
            
            if (i === -1) 
                break;
            
            out += format(str.substring(last, i), arguments);
            last = i + 1;
        }
        
        if (last < str.length) 
            out += str.substring(last);
            
        return out;
    };
    
    
    // PRIVATE
    
    function format(str, args, cultureInfo) {
        
        var i_colon = str.indexOf(':'),
            i_comma, 
            index, alignment, pattern,
            value
            ;
        
        if (i_colon !== -1) {
            pattern = str.substring(i_colon + 1);
            str = str.substring(0, i_colon);
        }
        
        i_comma = str.indexOf(',');
        if (i_comma !== -1) {
            alignment = parseInt(str.substring(i_comma + 1));
            str = str.substring(0, i_comma);
        }
        
        index = parseInt(str);
        
        if (isNaN(index)) {
            console.error('<mask:util:format (string) > Index is not a number', str);
            return align(alignment, '');
        }
        
        value = args[index + 1];
        if (value == null) 
            return align(alignment, '');
        
        if (pattern) {
            
            if (is_Number(value)) 
                return align(alignment, number_format(value, pattern, cultureInfo));
            
            if (is_Date(value)) 
                return align(alignment, date_format(value, pattern, cultureInfo));
            
            return align(alignment, (value).toString(pattern, cultureInfo));
        }
        
        return align(alignment, (value).toString());
    };
    
    function align(alignment, str){
        if (alignment == null || isNaN(alignment)) 
            return str;
        
        var count = alignment < 0
            ? alignment * -1
            : alignment
            ;
        
        
        if (str.length > count) 
            return str;
        
        var addon = repeat(' ', (count - str.length));
        
        return alignment < 0
            ? str + addon
            : addon + str
            ;
    }
    
    function repeat(char_, count){
        var out = '';
        while( --count > -1)
            out += char_;
        return out;
    }
}());