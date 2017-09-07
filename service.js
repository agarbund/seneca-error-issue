const seneca = require('seneca');

const service = seneca({
    strict: {
        result: false
    }
})
    .use('seneca-amqp-transport', {
        amqp: {
            listener: {
                queues: {
                    options: {
                        durable: false
                    }
                }
            }
        }
    })
    .listen({
        type: 'amqp',
        pin: 'cmd:error',
        url: 'amqp://guest:guest@localhost:5672'
    });

service.fixedargs.fatal$ = false;

service.add({ cmd: 'error' }, function(msg, done) {
    console.log('sending error');
    done(new Error('Business logic error'));
});