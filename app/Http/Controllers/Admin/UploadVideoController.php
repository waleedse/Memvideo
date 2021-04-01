<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\UploadVideo;
use App\VideoCategory;
use Exception;
use Validator;
class UploadVideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $video = UploadVideo::get();
        return response()->json([
            'status' => 200,
            'message' => "All Videos",
            'data' => $video,     
        ]);
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

   
    public function upload_m_video(Request $request){
        try{
            if ($request->hasFile('m_video')) {
                $file = $request->m_video;
                $filename = $file->getClientOriginalName();
                $image = date('His') . $filename;
                $destination_path = public_path() . '/videos/full-videos';
                $file->move($destination_path, $image);
                $url = $image;
                $response = ['status' => 200 , 'msg' => 'Main Video  Uploaded.','url' => $url];
                return $response;
            }
        }catch(Exception $e){
            $response = ['status' => 401 , 'msg' => 'Video not Uploaded.','error' => $e];
            return $response;
        }
    }
    public function trailer_upload(Request $request){
        try{
            if ($request->hasFile('t_video')) {
                $file = $request->t_video;
                $filename = $file->getClientOriginalName();
                $image = date('His') . $filename;
                $destination_path = public_path() . '/videos/trailers/';
                $file->move($destination_path, $image);
                $url = $image;
                $response = ['status' => 200 , 'msg' => 'Main Video  Uploaded.','url' => $url];
                return $response;
            }
        }catch(Exception $e){
            $response = ['status' => 401 , 'msg' => 'Video not Uploaded.','error' => $e];
            return $response;
        }
    } 
  
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3',
            'description' => 'required',
            'description_image' => 'required',
            'thumb_image' => 'required',
            'category_id' => 'required'
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
        // try{
            $u_video = UploadVideo::where('slug',strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->title))))->get();
            if(sizeof($u_video) > 0){
                $response = ['status' => 219 , 'msg' => 'Video with this title is already exists.' , 
                'errors' => $validator->errors()];
                return $response;
            }   
            $video = new UploadVideo();
            $video->title = $request->title;
            $video->description = $request->description;
            $video->t_video = $request->t_video;
            $video->m_video = $request->m_video;
            $video->rent_a_video = $request->video_rent;
            $video->buy_video = $request->buy_video;
            $video->slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->title)));
            if ($request->description_image) {
                $name = time() . '.' . explode('/', explode(':', substr($request->description_image, 0, strpos($request->description_image, ';')))[1])[1];
                \Image::make($request->description_image)->save(public_path('images/description_image/') . $name);
                $video->description_image = $name;
            }

            if ($request->thumb_image) {
                $name = time() . '.' . explode('/', explode(':', substr($request->thumb_image, 0, strpos($request->thumb_image, ';')))[1])[1];
                \Image::make($request->thumb_image)->save(public_path('images/thumb_image/') . $name);
                $video->thumb_image = $name;
            }
            $video->save();
            $video_cat = new VideoCategory();
            $video_cat->video_id = $video->id;
            $video_cat->category_id = $request->category_id;
            $video_cat->save();
            $response = ['status' => 200 , 'msg' => 'Success, data saved.'];
            return $response;
        }

    }
    public function get_videos(){
        $videos = UploadVideo::all();
        return $videos;
    }
    public function get_homepage_videos(){
        $videos = UploadVideo::all();
        return $videos;
    }

    public function get_video_detail(Request $request) {
        $data = UploadVideo::join('video_categories','video_categories.video_id','=','videos.id')   
                ->where('videos.id' , $request->id)   
        ->first();

        $response = ['status' => 200 ,
                'data' => $data];
        return $response;
    }

    public function video_info_update(Request $request) {
        $video = UploadVideo::where('id', $request->id)->update([
            'title' => $request->title,
            'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->title))),
            'description' => $request->description,
            'rent_a_video' => $request->rent_video,
            'buy_video' => $request->buy_video,
        ]);

        if($request->t_video){
            $video = UploadVideo::where('id', $request->id)->update([
                't_video' => $request->t_video,
            ]);
        }

        if($request->m_video){
            $video = UploadVideo::where('id', $request->id)->update([
                'm_video' => $request->m_video,
            ]);
        }
        
        $video_d = UploadVideo::where('id', $request->id)->first();
        if ($request->description_image != $video_d->description_image) {
            $name = time() . '.' . explode('/', explode(':', substr($request->description_image, 0, strpos($request->description_image, ';')))[1])[1];
            \Image::make($request->description_image)->save(public_path('images/description_image/') . $name);
            UploadVideo::where('id', $request->id)->update([
                'description_image' => $name,
            ]); 
        }

        if ($request->thumb_image != $video_d->thumb_image) {
            $name = time() . '.' . explode('/', explode(':', substr($request->thumb_image, 0, strpos($request->thumb_image, ';')))[1])[1];
            \Image::make($request->thumb_image)->save(public_path('images/thumb_image/') . $name);
            UploadVideo::where('id', $request->id)->update([
                'thumb_image' => $name,
            ]);
        }

        $cat = VideoCategory::where('video_id', $request->id)->update([
            'video_id' => $request->id,
            'category_id' => $request->category_id
        ]);
        
        $response = ['status' => 200 ,
                'msg' => 'Update Record'];
        return $response;
    }

    public function delete_record(Request $request){
        $data = UploadVideo::where('id', $request->id)->first();
        $thumb_image_path = public_path('images/thumb_image/') . $data->thumb_image;
        $description_image_path = public_path('images/description_image/') . $data->description_image;
        $t_video_path = public_path('videos/trailers/') . $data->t_video;
        $m_video_path = public_path('videos/full-videos/') . $data->m_video;
        
        if(file_exists($thumb_image_path)){
            unlink($thumb_image_path);
        }

        if(file_exists($description_image_path)){
            unlink($description_image_path);
        }

        if(file_exists($t_video_path)){
            unlink($t_video_path);
        }

        if(file_exists($m_video_path)){
            unlink($m_video_path);
        }

        $video = UploadVideo::where('id', $request->id)->delete();
        $video = VideoCategory::where('video_id', $request->id)->delete();

        return 1;
    }
}
