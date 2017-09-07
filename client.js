const seneca = require('seneca');

const client = seneca({
    strict: {
        result: false
    }
})
    .use('seneca-amqp-transport')
    .client({
        type: 'amqp',
        pin: 'cmd:error',
        url: 'amqp://guest:guest@localhost:5672'
    });

client.fixedargs.fatal$ = false;

client.act({ cmd: 'error'}, function(err) {
    console.log('received error', err);
});