<?php

namespace App\Http\Middleware;
use App\AdminAuthMeta;
use App\Admin;
use Closure;

class Adminlogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $meta = AdminAuthMeta::where('token', $request->header('token'))->where('ip',$request->ip())->first();
        if($meta){
            $admin = Admin::find($meta->admin_id);
            $request->admin = $admin;
            return $next($request);
        }else{
            $response = ['status' => 401 , 'msg' => 'sorry, you are not authorized.'];
            return response($response, 200);
        }   
    }
}
