var Lang,
    lang_isoCode;

(function(){

    lang_isoCode = 'en';
    Lang = {
        
        $register: function(isoCode, data){
            var obj = this[isoCode] || (this[isoCode] = {});
            
            obj_extend(obj, data);
        },
        
        // get cultureInfo for a type NUMBER, MONTH, ..
        $get: function(type, isoCode){
            var obj = isoCode == null
                ? this[lang_isoCode]
                : (this[isoCode] || this[lang_isoCode])
                ;
                
            return obj[type];
        },
        
        $use: function(isoCode){
            isoCode = isoCode.toLowerCase();
            
            if (this[isoCode] == null) {
                console.error('<FormatterLib> Language is not defined', isoCode);
                return;
            }
            lang_isoCode = isoCode;
        }
    };
    
    // import en.js
    // import de.js
}());
