<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\GeneralSettings;
use Exeception;
use App\Faq;
use Validator;
class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_all_faqs(){
        $faqs = Faq::all();
        return $faqs;
    }
    public function add_faq(Request $request){
        // return 1;
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'answer' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $faq = new Faq();
            $faq->question = $request->question;
            $faq->answer = $request->answer;
            $faq->save();
            $response = ['status' => 200 , 'msg' => 'Faq added.'];
            return $response;
        }
       

    }
    public function update_genral_settings( Request $request)
    {
        $settings =  GeneralSettings::find(1);
        $settings->site_logo  = $request->site_logo;
        $settings->site_banner  = $request->site_banner;
        $settings->banner_video_id = $request->banner_video_id;
        $settings->privacy_policy = $request->privacy_policy;
        $settings->terms_text = $request->terms_text;
        $settings->buy_btn_bg = $request->buy_btn_bg;
        $settings->rent_btn_bg = $request->rent_btn_bg;
        $settings->watch_btn_bg = $request->watch_btn_bg;
        $settings->save();
    }
    public function get_general_settings(){
        $settings = GeneralSettings::where('id',1)->first();
        return $settings;
    }

    public function upload_image(Request $request){
        
        try{
            if ($request->file) {
                $name = time() . '.' . explode('/', explode(':', substr($request->file, 0, strpos($request->file, ';')))[1])[1];
                \Image::make($request->file)->save(public_path('images/common/') . $name);
                $response = ['status' => 200 , 'msg' => 'Image  Uploaded.','name' => $name];
                return $response;
                // $file = $request->file;
                // $filename = $file->getClientOriginalName();
                // $image = date('His') . $filename;
                // $destination_path = public_path() . '/images/description_image/';
                // $file->move($destination_path, $image);
                // $response = ['status' => 200 , 'msg' => 'Image  Uploaded.','name' => $image];
                // return $response;
            }
        }catch(Exception $e){
            $response = ['status' => 401 , 'msg' => 'Image not Uploaded.','error' => $e];
            return $response;
        }
    }

    public function edit_faq(Request $request)
    {
        $faq = Faq::where('id', $request->id)->first();
        $response = [
            'status' => 200,
            'msg' => 'Faq',
            'data' => $faq
        ];
        return $response;
    }

    public function update_faq(Request $request) {
        $faq = Faq::where('id', $request->id)->update([
            'question' => $request->question,
            'answer' => $request->answer,
        ]);

        $response = [
            'status' => 200,
            'msg' => 'Updated Successfully'
        ];
        return $response;
    }

    public function delete_faq(Request $request) {
        $faq = Faq::where('id', $request->id)->delete();
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
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
    // public function edit($id)
    // {
    //     $faq = Faq::where('id', $id)->first();
    //     return $faq;
    // }

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
