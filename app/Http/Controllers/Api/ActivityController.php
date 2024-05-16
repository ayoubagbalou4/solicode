<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::all();
        return response()->json([
            'activities' => $activities
        ], 200);
    }

    public function store(Request $request)
    {
        Activity::create($request->all());
        return response()->json([], 200);
    }

    public function show($id)
    {
        $activity = Activity::findOrFail($id);
        return response()->json([
            'activity' => $activity
        ], 200);
    }

    public function destroy($id)
    {
        Activity::findOrFail($id)->delete();
        return response('', 200);
    }

    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);
        $activity->update([
            'nom' => $request->nom,
            'debut_activity' => $request->debut_activity,

        ]);
        return response()->json([], 200);
    }
}
