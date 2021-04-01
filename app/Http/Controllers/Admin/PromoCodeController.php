<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Promocode;
use App\PromocodeUse;
use Illuminate\Support\Facades\Validator;

class PromoCodeController extends Controller
{
    public function promocode(Request $request) {
        $promocode = Promocode::where('name', $request->promocode_id)->first();
        if($promocode) {
            $promocodeuse = PromocodeUse::where('customer_id', $request->customer_id)->where('promocode_id', $promocode->id)->first();
            if($promocodeuse) {
                $response = ['status' => 401 , 'msg' => 'User already use this promo code'];
                return $response;
            } else {
            
                $response = [
                    'status' => 200,
                    'msg' => 'User avail this promocode',
                    'data' => $promocode
                ];
                return $response;
            }
        } else {
            $response = [
                'status' => 401,
                'msg' => 'Not Promo Code Available'
            ];
            return $response;
        }
    }

    public function list() {
        $promocode = Promocode::all();
        $response = [
            'status' => 200,
            'msg' => 'Promocode List',
            'data' => $promocode
        ];
        return $response;
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',  
            'price' => 'required', 
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $data = new Promocode();
            $data->name = $request->name;
            $data->price = $request->price;
            $data->save();

            $response = [
                'status' => 200,
                 'msg' => 'Promocode added successfully' , 
            ];
            return $response;
        }
    }

    public function edit($id) {
        $promo = Promocode::where('id', $id)->first();
        $response = [
            'status' => 200,
             'msg' => 'Promocode', 
             'data' => $promo
        ];
        return $response;
    }

    public function update(Request $request) {
        $promo = Promocode::where('id', $request->id)->update([
            'name' => $request->name,
            'price' => $request->price
        ]);

        $response = [
            'status' => 200,
             'msg' => 'Update Promocode',
        ];
        return $response;
    }

    public function delete_promo(Request $request) {
        $promo = Promocode::where('id', $request->id)->delete();
        $response = [
            'status' => 200,
             'msg' => 'Deleted',
        ];
        return $response;
    }
}
