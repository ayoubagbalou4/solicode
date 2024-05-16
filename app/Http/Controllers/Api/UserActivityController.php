<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserActivity;
use Illuminate\Http\Request;

class UserActivityController extends Controller
{
    public function index()
    {
        $userActivitys = UserActivity::all();
        return response()->json([
            'userActivitys' => $userActivitys
        ],200);
    }

    public function store(Request $request)
    {
        UserActivity::create($request->all());
        return response()->json([],200);
    }

    public function show($id)
    {
        $userActivity = UserActivity::findOrFail($id);
        return response()->json([
            'userActivity' => $userActivity
        ],200);
    }

    public function destroy($id)
    {
        UserActivity::findOrFail($id)->delete();
        return response('',200);
    }

    public function update(Request $request, $id)
    {
        $userActivity = UserActivity::findOrFail($id);
        $userActivity->update([
            'user_id' => $request->user_id,
           'activity_id' => $request->activity_id,
           'etat' => $request->etat,

        ]);
        return response()->json([],200);
    }
}
