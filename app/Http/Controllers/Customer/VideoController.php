<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\UploadVideo;
use App\VideoCategory;
use Exception;
use Validator;
use App\Payment;
use Stripe;
use App\CustomerVideos;
use App\RentVideoDetails;
use DateTime;
class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_video_by_slug(Request $request){
        $video = UploadVideo::where('slug',$request->slug)->first();
   
         if($video){
            
            $custom = CustomerVideos::where('video_id', $video->id)->where('customer_id', $request->customer_id)->first();
            
            if($custom) {
              
                if($custom->purchase_type == "buy") {
                    $vid = UploadVideo::where('slug',$request->slug)->first();
                    $response = [
                        'status' => 200,
                        'video' => $vid
                    ];
                    return $response;
                } else {
                   
                    $detail = RentVideoDetails::where('customer_video_id', $custom->id)->first();
                    $rentVideo = UploadVideo::where('slug',$request->slug)->first();
                    if($detail) {
                        $currentDate = date("Y-m-d");
                        $targetdate =  $detail->date;
                        $origin = new DateTime($currentDate);
                        $target = new DateTime($targetdate);
                        $interval = $origin->diff($target);
                        $days = $interval->format('%a');
                        if($days <= 7) {
                            
                            if($detail->time <= 172800) {
                                
                                $response = [
                                    'status' => 200,
                                    'video' => $rentVideo
                                ];
                                return $response;
                            } else {
                                $response = [
                                    'status' => 202,
                                    'msg' => 'Buy Video',
                                    'video' => $rentVideo,
                                ];
                                return $response;
                            }
                        } else {
                            $response = [
                                'status' => 202,
                                'msg' => 'Buy Video',
                                'video' => $rentVideo,
                            ];
                            return $response;
                        }
                    }else{
                        $response = [
                            'status' => 202,
                            'msg' => 'Buy Video',
                            'video' => $rentVideo,
                        ];
                    }
                }
            } else {
                
                $response = [
                    'status' => 202,
                    'msg' => 'Buy Video',
                    'video' => $video,
                ];
                return $response;
            }
        }else{
            $response = [
                'status' => 404,
                'msg' => 'No video',
            ];
            return $response;
        }
    }
    public function search(Request $request) {
        $Videos = UploadVideo::where('title', 'like', '%' . $request->query_string . '%')->get();
        $response = [
            'status' => 200,
            'msg' => 'videos',
            'videos' => $Videos
        ];
        return $response;
    }
    public function watchvideos(Request $request) {
        $cusvideo = CustomerVideos::where('customer_id',$request->id)->get();
        if(sizeof($cusvideo) > 0){
            foreach($cusvideo as $cv){
                if($cv->purchase_type == 'rent') {
                    $cv->rent_video_detail = RentVideoDetails::where('customer_video_id', $cv->id)->first();
                }
                $cv->video = UploadVideo::where('id', $cv->video_id)->first();
            } 
            $response = [
                'status' => 200,
                'msg' => 'Watch Videos',
                'data' => $cusvideo
            ];
            return $response;
        }else{
            $response = [
                'status' => 404,
                'msg' => 'No Videos',
            ];
            return $response;
        }
    }
    public function payment_history(Request $request) {
        $payments = Payment::where('customer_id', $request->customer_id)->get();
        $response = [
            'status' => 200,
            'msg' => 'Watch Videos',
            'data' => $payments
        ];
        return $response;
    }
    public function charge_payment(Request $request){
        try{
            Stripe\Stripe::setApiKey("sk_test_51I7E9bIcgmjOoI3vkORdEKfkFZr0U99vytNNUpSxTfN7T9rpTXUgHR062MCkY5gvR9tMXAkQL2CxdDtaS4aCFiS900vRstAP9F");
            $customer = Stripe\Customer::create([
                 "email" => $request->stripeToken['email'],
                 "source" =>  $request->stripeToken['id']
            ]);
            $charge = Stripe\Charge::create ([
                     "amount" => $request->totals * 100,
                     "currency" => "USD",
                     "customer" => $customer->id,
                     // "source" => $request->stripeToken,
                     "description" => "Payment from Aldyar Meat Company E-com. Website" ,
                     "shipping" => [
                         "name" => $request->stripeToken['card']['name'],
                         "address" => [
                             "line1" => $request->stripeToken['card']['address_line1'],
                             "line2" => $request->stripeToken['card']['address_line2'],
                             "city" => $request->stripeToken['card']['address_city'],
                             "country" => $request->stripeToken['card']['address_country'],
                             "postal_code" => $request->stripeToken['card']['address_zip'],
                         ]
                        ]
                     ]
                 );
                 if($charge){
                    $customer_video = new CustomerVideos();
                    $customer_video->video_id = $request->video_id;
                    $customer_video->customer_id = $request->customer_id;
                    $customer_video->purchase_type = $request->purchase_type;
                    $customer_video->save();

                    if($request->purchase_type == 'rent'){
                        $rent_video = new RentVideoDetails();
                        $rent_video->customer_video_id = $customer_video->id;
                        $rent_video->customer_id = $request->customer_id;
                        $rent_video->time = 0;
                        $rent_video->date = date("d-m-Y");
                        $rent_video->save();
                    }
                    
                    $payment = new Payment();
                    $payment->video_id = $request->video_id;
                    $payment->customer_id = $request->customer_id;
                    $payment->discount = $request->discount;
                    $payment->totals = $request->totals;
                    $payment->status = 'succeed';
                    $payment->save();
                    $response = ['status' => 200 , 'msg' => 'Payment SuccessFully Charged.'];
                    return $response;
                 }
                 else{
                     $response = ['status' => 404 , 'msg' => 'Payment Charge Failed. Please try again'];
                     return $response;
                 }
        }catch(Exception $e){
            $response = ['status' => 404 , 'msg' => 'Payment Charge Failed. Please try again','error' => $e];
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
