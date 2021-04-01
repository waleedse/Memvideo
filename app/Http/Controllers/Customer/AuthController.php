<?php

namespace App\Http\Controllers\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Customer;
use DB;
use Validator;
use App\ResetPassword;
use App\CustomerAuthMeta;
use Hash;
// use Illuminate\Support\Facades\Mail;
// use App\Mail\CustomerResetPassword;
use Illuminate\Support\Facades\Crypt;
class AuthController extends Controller
{
    public function index(Request $request) {
        $customers = Customer::get();
        // return $customers;
        return response()->json([
            'status' => true,
            'message' => "All Customers",
            'data' => $customers
        ]);
    }
   
    public function create_customer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'password' => 'required|min:6',
            'email' => 'required|email|unique:customers,email|max:255',
        ]);
        if($validator->fails()){
            $response = ['status' => 404 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $new_customer = new Customer();
            $new_customer->fname = $request->first_name;
            $new_customer->lname  = $request->last_name;
            $new_customer->email = $request->email;
            $new_customer->user_name = $request->first_name . "-". $request->last_name . "-".rand();
            $new_customer->password = Hash::make($request->password);
            $new_customer->status = 1;
            $new_customer->save();
            $meta  = new CustomerAuthMeta();
            $meta->customer_id = $new_customer->id;
            $meta->token = Hash::make($new_customer->id.time());
            $meta->ip = $request->ip();
            $meta->save();
            $new_customer->token = $meta->token;
            $response = ['status' => 200,'msg' => "Customer Created Successfully",'data' => $new_customer];
            return $response;
        }
    }

    public function customer_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:6',
        ]);
        if($validator->fails()){
            $response = [
                'status' => 404,
                'errors' => $validator->messages(),
                'msg' => $validator->errors()->first()
            ];
            return $response;
        }else{
            $customer = Customer::where('email', $request->email)->where('status', 1)->first();
            if($customer){
                if(Hash::check($request->password, $customer->password)){
                    $meta_check = CustomerAuthMeta::where('customer_id',$customer->id)
                                    ->where('ip',$request->ip())
                                    ->first();
                    if($meta_check){
                        $token = $meta_check->token;
                    } else {
                        $meta = new CustomerAuthMeta();
                        $meta->customer_id = $customer->id;
                        $meta->ip = $request->ip();
                        $meta->token = Hash::make(time());
                        $new_time = date('H:i', strtotime('+15 minutes'));
                        $meta->valid = $new_time;
                        $meta->save();
                        $token = $meta->token;
                    }
                    $customer->token = $token;
                    $response = [
                        'status' => 200,     
                        'msg' => "Successfull login",
                        'data' => $customer, 
                    ];
                    return $response;
                }else{
                    $response = [
                        'status' => 401,     
                        'msg' => "Invalid Password",
                        'data' => null,  
                    ];
                    return $response;
                    
                }
            }else{
                $response = [
                    'status' => 401,     
                    'msg' => "Invalid Email",
                    'data' => null, 
                ];
                return $response;
              
            }
        }
    }

    public function customer_forget_password(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',  
                     
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{

            $customer = DB::table('customers')
                        ->where('email', $request->email)
                        ->where('status', 1)
                        ->get();
            if(sizeof($customer) > 0){
                DB::table('resetpasswords')->where('email', $request->email)->update(array('status' => '0'));  
                $p = new ResetPassword();
                $p->email = $request->email;
                $p->token = $customer[0]->id;
                $p->status = 1;
                $p->save();
                $link =Crypt::encrypt($p->token);
                $title = 'Password Reset';
                Mail::to($request->email)->send(new CustomerResetPassword($link,$title));
                $response = ['status' => 200 , 'msg' => 'success- password reset link mailed successfully'];
                return $response;
            }else{
                $response = ['status' => 404 , 'msg' => 'error- email not found'];
                return $response;
            }
        }
    }
    public function user_password(Request $request){
        $validator = Validator::make($request->all(), [
            'token' => 'required', 
            'new_password' => 'required|min:6',         
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $meta =  DB::table('resetpasswords')->where('token', Crypt::decrypt($request->token))->where('status',1)->get();
            if(sizeof($meta) > 0){
                    $customer =  DB::table('customers')->where('email', $meta[0]->email)->get(); 
                    $new_customer = Customer::find($customer[0]->id);                     
                    $new_customer->password = Hash::make($request->new_password);
                    $new_customer->save();
                    DB::table('resetpasswords')->where('email', $meta[0]->email)->update(array('status' => 0));  
                    $response = ['status' => 200 , 'msg' => 'success- customer password updated successfully'];
                    return $response;
            }else{
                $response = ['status' => 401 , 'msg' => 'error- Inavlid token or token is expierd'];
                return $response;
            }
        }
    }

    public function edit_customer(Request $request) {
        $data = Customer::where('id', $request->id)->first();
        return response()->json([
            'status' => true,
            'message' => "Customer",
            'data' => $data,     
        ]);
    }
    public function customer_check_auth(Request $request){
        $meta = CustomerAuthMeta::where('token',$request->token)
                ->where('ip',$request->ip())
                ->first();
        $customer = Customer::where('id',$request->customer_id)->first();
        if($meta){
            $response = ['status' => 200 , 'customer',$customer];
            return $response; 
        }else{
            $response = ['status' => 401 , 'msg' => 'Sorry, Incorrect Token'];
            return $response;
        }
    }

    public function update_customer(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',  
            'fname' => 'required',
            'lname'  => 'required',
            'address' => 'required',
            'city' => 'required',
            'country' => 'required',
            'post_code' => 'required'
                     
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }
        $user = Customer::where('id' , $request->id)->update([
            'fname' => $request->fname,
            'lname'  => $request->lname,
            'email' => $request->email,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'postal_code' => $request->post_code
        ]);

        if ($request->image) {
            $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
            \Image::make($request->image)->save(public_path('images/') . $name);
            Customer::where('id', $request->id)->update([
                'image' => $name,       
            ]);
        }
        $response =[
            'status' => 200,
            'msg' => "Update Customer Successfully",
            'data' => null,
        ];
        return $response;
       
    }

    public function contact_us_mail(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required', 
            'email' => 'required|email|max:255',
            'phone' => 'required'      
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first(), 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $data = $request;
            Mail::to('memvodvideo@gmail.com')->send(new ContactUsMail($data));
            $response = ['status' => 200 , 'msg' => 'mail send'];
            return $response;
        }
    }
    
}
