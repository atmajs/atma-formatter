var lang_DEFAULT = 'en';
var Lang = {
    
    $register: function(twoLetterISOCode, data){
        var obj = this[twoLetterISOCode] || (this[twoLetterISOCode] = {});
        
        obj_extend(obj, data);
    },
    
    $get: function(val, twoLetterISOCode){
        var obj = twoLetterISOCode == null
            ? this[lang_DEFAULT]
            : (this[twoLetterISOCode] || this[lang_DEFAULT])
            ;
            
        return obj[val];
    }
};


