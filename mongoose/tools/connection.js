var mongoose= require ("mongoose");

mongoose.connect("mongodb+srv://yiping:fanhuamemeda@cluster0-1xoyl.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

mongoose.connection.once ("open", function(){
    console.log( "connected");
});

mongoose.connection.once('close', function() {
    console.log('connected closed');
});
mongoose.connection.on('error', function() {
    console.log('can not connected');
});