<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\GeneralSettings;
use App\UploadVideo;
use Exception;
use App\Customer;
use App\CustomerAuthMeta;

class CommonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_app_index(Request $request){
        try{
            $videos = UploadVideo::all();
            $settings = GeneralSettings::where('id',1)->first();
            $banner_video = UploadVideo::where('id',$settings->banner_video_id)->first();
            $meta = CustomerAuthMeta::where('token',$request->token)
            ->where('ip',$request->ip())
            ->first();
           $customer = [];
           $auth_status = false;
            if($meta){
                $customer = Customer::where('id',$meta->customer_id)->first();
                $auth_status = true;
            }
            $response = ['status'=>200,'videos'=>$videos,'settings'=>$settings , 'auth_status' => $auth_status,
            'banner_video' => $banner_video,
            'customer' => $customer];
            return $response;
        }catch(Exception $e){
            $response = ['status'=>404,'error'=>$e];
            return $response;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
