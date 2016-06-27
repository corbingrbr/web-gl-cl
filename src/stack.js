function Stack() {
    
    this.push = function(item) {
        stack.push(item);
    };
    
    this.pop = function() {
        stack.pop();
    };
    
    this.empty = function() {
        return stack.length == 0;
    };

    this.top = function() {
        return stack[stack.length - 1];
    };

    var stack = new Array();
}
