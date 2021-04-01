<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::view('/admin', 'welcomeBackend');
Route::view('/admin/login', 'welcomeBackend');
Route::view('/admin/create-category', 'welcomeBackend');
Route::view('/admin/edit-category/{id}', 'welcomeBackend');
Route::view('/admin/list-category', 'welcomeBackend');
Route::view('/admin/video', 'welcomeBackend');
Route::view('/admin/edit-video/{id}', 'welcomeBackend');
Route::view('/admin/list-video', 'welcomeBackend');

Route::view('/admin/list-promos', 'welcomeBackend');
Route::view('/admin/create-promocode', 'welcomeBackend');
Route::view('/admin/promocode-detail/{id}', 'welcomeBackend');

Route::view('/admin/add-faq', 'welcomeBackend');
Route::view('/admin/faqs', 'welcomeBackend');
Route::view('/admin/faq-detail/{id}', 'welcomeBackend');
Route::view('/admin/customers-list', 'welcomeBackend');
Route::view('/admin/general-settings', 'welcomeBackend');
Route::view('/watch/{slug}', 'welcome');
Route::view('/profile', 'welcome');
Route::view('/search/{query}', 'welcome');

Route::view('/{path?}', 'welcome');

Route::get('{reactRoutes}', function () {
    return view('welcome');
});
Route::view('/watch', 'welcome');


