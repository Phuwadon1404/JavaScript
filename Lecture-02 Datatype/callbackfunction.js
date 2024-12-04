function createQoute(quote, callback) {
    let myQuote = "Like I alway say , " + quote;
    callback(myQuote);
}

function logQuote(quote) {
    console.log(quote + 'yes...');
    
}

createQoute(" you will getting better! " ,logQuote);