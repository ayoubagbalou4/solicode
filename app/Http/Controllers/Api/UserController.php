<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json([
            'status' => 200,
            'users' => $users
        ], 200);
    }

    public function signup(Request $request)
    {
        $signupData = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        if ($signupData) {
            return response()->json([
                'status' => '200',
                'messages' => 'success',
                'user' => $signupData,
            ], 200);
        }
    }


    public function signin(Request $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->password];
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 404,
                'message' => 'Email or password inccorect',
            ], 404);
        } else {
            $user = $request->user();
            $token = $user->createToken('user_token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'user' => $user,
                'token' => $token
            ], 200);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response('', 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json([], 200);
    }


}
