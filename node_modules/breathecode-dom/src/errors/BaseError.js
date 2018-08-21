export default class BaseError{
    constructor(slug=null, options=null){
        if(!slug) throw new Error('The error needs to have a slug');
        else this.slug = slug;
        if(!options) throw new Error('The error needs to have an options array');
        
        return this.extend(options);
    }
    
    extend(opt){
        return Object.assign({
            scope: null,
            call: null,
            video: null,
            slug: this.slug,
            message: null,
            example: null,
            why: null,
            toConsole: function(){
                if(!this.message) throw new Error('The error message is empty');
                let error = `Error! You have an error when using ${this.scope} ${this.call}:`;
                if(this.message) error += '\n\n'+this.message;
                if(this.why) error += ' \n\n # Why are you seeing this error? \n' + this.why;
                if(this.url) error += ' \n\n # Here is an article explaining the problem: \n' + this.url;
                if(this.video) error += ' \n\n # Here is a video that we made explaining the situation: \n ' + this.video;
                return error;
            }
        }, opt);
    }
}