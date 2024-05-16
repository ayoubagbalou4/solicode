<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\UserActivityController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[UserController::class,'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::post('/signup',[UserController::class,'signup']);
Route::post('/signin',[UserController::class,'signin']);

Route::resource('activities', ActivityController::class);
Route::resource('userActivities', UserActivityController::class);
Route::get('/getcounts',[UserController::class,'getCounts']);
Route::get('/consomationParMois', [UserActivityController::class,'consomationParMois']);
