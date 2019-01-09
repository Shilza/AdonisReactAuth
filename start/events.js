const Event = use('Event');

Event.on('user::register', 'Registration.method');

Event.on('user::passReset', 'PassForgot.method');
Event.on('user::passUpdate', 'PassUpdate.method');