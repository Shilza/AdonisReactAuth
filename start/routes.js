'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');


Route.group(() => {
    Route.post('register', 'AuthController.register');
    Route.post('login', 'AuthController.login');
    Route.post('refresh', 'AuthController.refresh');
}).prefix('api/v1/auth');

Route.group(() => {
    Route.post('forgot', 'PasswordController.forgot');
    Route.post('update', 'PasswordController.update');
}).prefix('api/v1/auth/password');

Route.group(() => {
    Route.post('logout', 'AuthController.logout');
    Route.post('revokeAll', 'AuthController.revokeAll');
    Route.post('me', 'AuthController.me');
}).prefix('api/v1/auth').middleware(['auth:jwt']);

Route.get('*', ({ view }) => view.render('index'));




