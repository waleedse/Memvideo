<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['admin-login'])->group(function () {
    // Route::resource('video', 'Admin\UploadVideoController');
    Route::resource('category', 'Admin\CategoryController');
});

// Video Controller
Route::post('/video-upload','Admin\UploadVideoController@store');
Route::post('/m-video-upload','Admin\UploadVideoController@upload_m_video');
Route::post('/t-video-upload','Admin\UploadVideoController@trailer_upload');
Route::get('/video','Admin\UploadVideoController@get_videos');
Route::post('/create-admin','Admin\AdminController@create_admin');
Route::post('/login-admin','Admin\AdminController@login_admin');
Route::post('/check-auth-admin','Admin\AdminController@admin_check_auth');
Route::get('/home_videos','Admin\UploadVideoController@get_homepage_videos');

Route::post('/get-video-detail','Admin\UploadVideoController@get_video_detail');
Route::post('/video-info-update','Admin\UploadVideoController@video_info_update');
Route::post('/delete-video-record','Admin\UploadVideoController@delete_record');



Route::post('/charge_payment','Customer\VideoController@charge_payment');
Route::post('/search','Customer\VideoController@search');

Route::post('/watchvideos','Customer\VideoController@watchvideos');
Route::post('/payment_history','Customer\VideoController@payment_history');



// Customer Controller 
Route::get('/customer-list','Customer\AuthController@index');
Route::post('/create-customer','Customer\AuthController@create_customer');
Route::post('/edit-customer','Customer\AuthController@edit_customer');
Route::post('/update-customer','Customer\AuthController@update_customer');
Route::post('/customer-login','Customer\AuthController@customer_login');
Route::post('/customer_forget_password','Customer\AuthController@customer_forget_password');
Route::post('/user-password','Customer\AuthController@user_password');
Route::post('/contact-us-mail', 'Customer\AuthController@contact_us_mail');
Route::post('/customer-check-auth','Customer\AuthController@customer_check_auth');

Route::post('/get_video_by_slug','Customer\VideoController@get_video_by_slug');

//Settings Controller

Route::post('upload_image', 'Admin\SettingsController@upload_image');
Route::post('upload_image', 'Admin\SettingsController@upload_image');
Route::post('get_general_settings', 'Admin\SettingsController@get_general_settings');
Route::post('update_genral_settings', 'Admin\SettingsController@update_genral_settings');
Route::post('add_faq', 'Admin\SettingsController@add_faq');
Route::post('get_all_faqs', 'Admin\SettingsController@get_all_faqs');
Route::get('faq-detail/{id}', 'Admin\SettingsController@edit_faq');
Route::post('faq-update', 'Admin\SettingsController@update_faq');
Route::post('delete-faq', 'Admin\SettingsController@delete_faq');




//Common Controller
Route::post('get_app_index', 'Common\CommonController@get_app_index');

// Promocode
Route::get('/promocode-list', 'Admin\PromoCodeController@list');
Route::post('/promocode', 'Admin\PromoCodeController@store');
Route::get('/promocode-detail/{id}', 'Admin\PromoCodeController@edit');
Route::post('/promocode-update', 'Admin\PromoCodeController@update');
Route::post('/delete-promocode', 'Admin\PromoCodeController@delete_promo');

Route::post('/promocode-apply', 'Admin\PromoCodeController@promocode');







