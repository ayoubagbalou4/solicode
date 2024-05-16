<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserActivity;
use Illuminate\Http\Request;

class UserActivityController extends Controller
{
    public function index()
    {
        $userActivities = UserActivity::with('activity')
            ->orderBy('created_at')
            ->get();
        return response()->json([
            'userActivities' => $userActivities
        ], 200);
    }

    public function store(Request $request)
    {
        UserActivity::create($request->all());
        return response()->json([], 200);
    }

    public function show($id)
    {
        $userActivity = UserActivity::findOrFail($id);
        return response()->json([
            'userActivity' => $userActivity
        ], 200);
    }

    public function destroy($id)
    {
        UserActivity::findOrFail($id)->delete();
        return response('', 200);
    }

    public function consomationParMois()
    {
        $stats = UserActivity::selectRaw('MONTHNAME(created_at) as month, SUM(consomation) as consomation')
            ->groupBy('month')
            ->get();

        return response()->json($stats, 200);

    }
}
